import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';

export interface StaticFastStackConfig {
  projectSlug: string;
  domainName?: string;
  wwwRedirect: boolean;
  businessName: string;
  awsRegion: string;
  awsAccountId: string;
}

export interface StaticFastStackProps extends cdk.StackProps {
  config: StaticFastStackConfig;
}

export class StaticFastStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StaticFastStackProps) {
    super(scope, id, props);

    const { config } = props;

    // Create S3 bucket for hosting
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: `${config.projectSlug}-website-${config.awsAccountId}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Create CloudFront Function for trailing slash handling
    const trailingSlashFunction = new cloudfront.Function(this, 'TrailingSlashFunction', {
      functionName: `${config.projectSlug}-trailing-slash`,
      code: cloudfront.FunctionCode.fromInline(`
        function handler(event) {
          var request = event.request;
          var uri = request.uri;
          
          // Check whether the URI is missing a file extension
          if (!uri.includes('.')) {
            // Check if URI already ends with /
            if (!uri.endsWith('/')) {
              // Add trailing slash
              request.uri = uri + '/';
            }
            // Append index.html to the URI
            request.uri = request.uri + 'index.html';
          }
          
          return request;
        }
      `),
    });

    // Create Origin Access Control
    const originAccessControl = new cloudfront.S3OriginAccessControl(this, 'OAC', {
      description: `OAC for ${config.businessName} website`,
    });

    let certificate: certificatemanager.ICertificate | undefined;
    let hostedZone: route53.IHostedZone | undefined;

    // Only create domain-related resources if domain is provided
    if (config.domainName) {
      // Look up existing hosted zone
      hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
        domainName: config.domainName,
      });

      // Create SSL certificate (must be in us-east-1 for CloudFront)
      certificate = new certificatemanager.Certificate(this, 'Certificate', {
        domainName: config.domainName,
        subjectAlternativeNames: config.wwwRedirect ? [`www.${config.domainName}`] : undefined,
        validation: certificatemanager.CertificateValidation.fromDns(hostedZone),
      });
    }

    // Create CloudFront distribution
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      comment: `${config.businessName} Website`,
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(websiteBucket, {
          originAccessControl,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
        compress: true,
        functionAssociations: [
          {
            function: trailingSlashFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
      domainNames: config.domainName ? [config.domainName, ...(config.wwwRedirect ? [`www.${config.domainName}`] : [])] : undefined,
      certificate,
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    // Grant CloudFront access to S3 bucket
    websiteBucket.addToResourcePolicy(new cdk.aws_iam.PolicyStatement({
      effect: cdk.aws_iam.Effect.ALLOW,
      principals: [new cdk.aws_iam.ServicePrincipal('cloudfront.amazonaws.com')],
      actions: ['s3:GetObject'],
      resources: [`${websiteBucket.bucketArn}/*`],
      conditions: {
        StringEquals: {
          'AWS:SourceArn': `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`
        }
      }
    }));

    // Create Route53 records if domain is configured
    if (config.domainName && hostedZone) {
      // A record for root domain
      new route53.ARecord(this, 'ARecord', {
        zone: hostedZone,
        recordName: config.domainName,
        target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      });

      // WWW redirect if enabled
      if (config.wwwRedirect) {
        new route53.ARecord(this, 'WWWARecord', {
          zone: hostedZone,
          recordName: `www.${config.domainName}`,
          target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
        });
      }
    }

    // Output important values
    new cdk.CfnOutput(this, 'BucketName', {
      value: websiteBucket.bucketName,
      description: 'S3 Bucket Name',
      exportName: `${config.projectSlug}-bucket-name`,
    });

    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
      description: 'CloudFront Distribution ID',
      exportName: `${config.projectSlug}-distribution-id`,
    });

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: distribution.distributionDomainName,
      description: 'CloudFront Distribution Domain Name',
      exportName: `${config.projectSlug}-distribution-domain`,
    });

    if (config.domainName) {
      new cdk.CfnOutput(this, 'WebsiteUrl', {
        value: `https://${config.domainName}`,
        description: 'Website URL',
        exportName: `${config.projectSlug}-website-url`,
      });
    }
  }
}