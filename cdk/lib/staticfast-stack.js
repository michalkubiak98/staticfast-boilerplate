"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticFastStack = void 0;
const cdk = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const cloudfront = require("aws-cdk-lib/aws-cloudfront");
const origins = require("aws-cdk-lib/aws-cloudfront-origins");
const route53 = require("aws-cdk-lib/aws-route53");
const targets = require("aws-cdk-lib/aws-route53-targets");
const certificatemanager = require("aws-cdk-lib/aws-certificatemanager");
class StaticFastStack extends cdk.Stack {
    constructor(scope, id, props) {
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
        let certificate;
        let hostedZone;
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
exports.StaticFastStack = StaticFastStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljZmFzdC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0YXRpY2Zhc3Qtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBQ25DLHlDQUF5QztBQUN6Qyx5REFBeUQ7QUFDekQsOERBQThEO0FBQzlELG1EQUFtRDtBQUNuRCwyREFBMkQ7QUFDM0QseUVBQXlFO0FBZ0J6RSxNQUFhLGVBQWdCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDNUMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUEyQjtRQUNuRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBRXpCLCtCQUErQjtRQUMvQixNQUFNLGFBQWEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN6RCxVQUFVLEVBQUUsR0FBRyxNQUFNLENBQUMsV0FBVyxZQUFZLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDbEUsb0JBQW9CLEVBQUUsWUFBWTtZQUNsQyxvQkFBb0IsRUFBRSxZQUFZO1lBQ2xDLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFNBQVM7WUFDakQsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztZQUN4QyxpQkFBaUIsRUFBRSxJQUFJO1NBQ3hCLENBQUMsQ0FBQztRQUVILHlEQUF5RDtRQUN6RCxNQUFNLHFCQUFxQixHQUFHLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLEVBQUU7WUFDbkYsWUFBWSxFQUFFLEdBQUcsTUFBTSxDQUFDLFdBQVcsaUJBQWlCO1lBQ3BELElBQUksRUFBRSxVQUFVLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09B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U0FDaEQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUN4QyxLQUFLLEVBQUUsWUFBWSxDQUFDLGNBQWM7WUFDbEMsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxVQUFVLEVBQUUsR0FBRyxNQUFNLENBQUMsV0FBVyxrQkFBa0I7U0FDcEQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUNoRCxLQUFLLEVBQUUsWUFBWSxDQUFDLHNCQUFzQjtZQUMxQyxXQUFXLEVBQUUscUNBQXFDO1lBQ2xELFVBQVUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxXQUFXLHNCQUFzQjtTQUN4RCxDQUFDLENBQUM7UUFFSCxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDckIsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7Z0JBQ3BDLEtBQUssRUFBRSxXQUFXLE1BQU0sQ0FBQyxVQUFVLEVBQUU7Z0JBQ3JDLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixVQUFVLEVBQUUsR0FBRyxNQUFNLENBQUMsV0FBVyxjQUFjO2FBQ2hELENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztDQUNGO0FBOUpELDBDQThKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0ICogYXMgY2xvdWRmcm9udCBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udCc7XG5pbXBvcnQgKiBhcyBvcmlnaW5zIGZyb20gJ2F3cy1jZGstbGliL2F3cy1jbG91ZGZyb250LW9yaWdpbnMnO1xuaW1wb3J0ICogYXMgcm91dGU1MyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtcm91dGU1Myc7XG5pbXBvcnQgKiBhcyB0YXJnZXRzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1yb3V0ZTUzLXRhcmdldHMnO1xuaW1wb3J0ICogYXMgY2VydGlmaWNhdGVtYW5hZ2VyIGZyb20gJ2F3cy1jZGstbGliL2F3cy1jZXJ0aWZpY2F0ZW1hbmFnZXInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGljRmFzdFN0YWNrQ29uZmlnIHtcbiAgcHJvamVjdFNsdWc6IHN0cmluZztcbiAgZG9tYWluTmFtZT86IHN0cmluZztcbiAgd3d3UmVkaXJlY3Q6IGJvb2xlYW47XG4gIGJ1c2luZXNzTmFtZTogc3RyaW5nO1xuICBhd3NSZWdpb246IHN0cmluZztcbiAgYXdzQWNjb3VudElkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGljRmFzdFN0YWNrUHJvcHMgZXh0ZW5kcyBjZGsuU3RhY2tQcm9wcyB7XG4gIGNvbmZpZzogU3RhdGljRmFzdFN0YWNrQ29uZmlnO1xufVxuXG5leHBvcnQgY2xhc3MgU3RhdGljRmFzdFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFN0YXRpY0Zhc3RTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCB7IGNvbmZpZyB9ID0gcHJvcHM7XG5cbiAgICAvLyBDcmVhdGUgUzMgYnVja2V0IGZvciBob3N0aW5nXG4gICAgY29uc3Qgd2Vic2l0ZUJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ1dlYnNpdGVCdWNrZXQnLCB7XG4gICAgICBidWNrZXROYW1lOiBgJHtjb25maWcucHJvamVjdFNsdWd9LXdlYnNpdGUtJHtjb25maWcuYXdzQWNjb3VudElkfWAsXG4gICAgICB3ZWJzaXRlSW5kZXhEb2N1bWVudDogJ2luZGV4Lmh0bWwnLFxuICAgICAgd2Vic2l0ZUVycm9yRG9jdW1lbnQ6ICdpbmRleC5odG1sJyxcbiAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IGZhbHNlLFxuICAgICAgYmxvY2tQdWJsaWNBY2Nlc3M6IHMzLkJsb2NrUHVibGljQWNjZXNzLkJMT0NLX0FMTCxcbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICBhdXRvRGVsZXRlT2JqZWN0czogdHJ1ZSxcbiAgICB9KTtcblxuICAgIC8vIENyZWF0ZSBDbG91ZEZyb250IEZ1bmN0aW9uIGZvciB0cmFpbGluZyBzbGFzaCBoYW5kbGluZ1xuICAgIGNvbnN0IHRyYWlsaW5nU2xhc2hGdW5jdGlvbiA9IG5ldyBjbG91ZGZyb250LkZ1bmN0aW9uKHRoaXMsICdUcmFpbGluZ1NsYXNoRnVuY3Rpb24nLCB7XG4gICAgICBmdW5jdGlvbk5hbWU6IGAke2NvbmZpZy5wcm9qZWN0U2x1Z30tdHJhaWxpbmctc2xhc2hgLFxuICAgICAgY29kZTogY2xvdWRmcm9udC5GdW5jdGlvbkNvZGUuZnJvbUlubGluZShgXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgICB2YXIgcmVxdWVzdCA9IGV2ZW50LnJlcXVlc3Q7XG4gICAgICAgICAgdmFyIHVyaSA9IHJlcXVlc3QudXJpO1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIFVSSSBpcyBtaXNzaW5nIGEgZmlsZSBleHRlbnNpb25cbiAgICAgICAgICBpZiAoIXVyaS5pbmNsdWRlcygnLicpKSB7XG4gICAgICAgICAgICAvLyBDaGVjayBpZiBVUkkgYWxyZWFkeSBlbmRzIHdpdGggL1xuICAgICAgICAgICAgaWYgKCF1cmkuZW5kc1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgICAvLyBBZGQgdHJhaWxpbmcgc2xhc2hcbiAgICAgICAgICAgICAgcmVxdWVzdC51cmkgPSB1cmkgKyAnLyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBcHBlbmQgaW5kZXguaHRtbCB0byB0aGUgVVJJXG4gICAgICAgICAgICByZXF1ZXN0LnVyaSA9IHJlcXVlc3QudXJpICsgJ2luZGV4Lmh0bWwnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgYCksXG4gICAgfSk7XG5cbiAgICAvLyBDcmVhdGUgT3JpZ2luIEFjY2VzcyBDb250cm9sXG4gICAgY29uc3Qgb3JpZ2luQWNjZXNzQ29udHJvbCA9IG5ldyBjbG91ZGZyb250LlMzT3JpZ2luQWNjZXNzQ29udHJvbCh0aGlzLCAnT0FDJywge1xuICAgICAgZGVzY3JpcHRpb246IGBPQUMgZm9yICR7Y29uZmlnLmJ1c2luZXNzTmFtZX0gd2Vic2l0ZWAsXG4gICAgfSk7XG5cbiAgICBsZXQgY2VydGlmaWNhdGU6IGNlcnRpZmljYXRlbWFuYWdlci5JQ2VydGlmaWNhdGUgfCB1bmRlZmluZWQ7XG4gICAgbGV0IGhvc3RlZFpvbmU6IHJvdXRlNTMuSUhvc3RlZFpvbmUgfCB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGNyZWF0ZSBkb21haW4tcmVsYXRlZCByZXNvdXJjZXMgaWYgZG9tYWluIGlzIHByb3ZpZGVkXG4gICAgaWYgKGNvbmZpZy5kb21haW5OYW1lKSB7XG4gICAgICAvLyBMb29rIHVwIGV4aXN0aW5nIGhvc3RlZCB6b25lXG4gICAgICBob3N0ZWRab25lID0gcm91dGU1My5Ib3N0ZWRab25lLmZyb21Mb29rdXAodGhpcywgJ0hvc3RlZFpvbmUnLCB7XG4gICAgICAgIGRvbWFpbk5hbWU6IGNvbmZpZy5kb21haW5OYW1lLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIENyZWF0ZSBTU0wgY2VydGlmaWNhdGUgKG11c3QgYmUgaW4gdXMtZWFzdC0xIGZvciBDbG91ZEZyb250KVxuICAgICAgY2VydGlmaWNhdGUgPSBuZXcgY2VydGlmaWNhdGVtYW5hZ2VyLkNlcnRpZmljYXRlKHRoaXMsICdDZXJ0aWZpY2F0ZScsIHtcbiAgICAgICAgZG9tYWluTmFtZTogY29uZmlnLmRvbWFpbk5hbWUsXG4gICAgICAgIHN1YmplY3RBbHRlcm5hdGl2ZU5hbWVzOiBjb25maWcud3d3UmVkaXJlY3QgPyBbYHd3dy4ke2NvbmZpZy5kb21haW5OYW1lfWBdIDogdW5kZWZpbmVkLFxuICAgICAgICB2YWxpZGF0aW9uOiBjZXJ0aWZpY2F0ZW1hbmFnZXIuQ2VydGlmaWNhdGVWYWxpZGF0aW9uLmZyb21EbnMoaG9zdGVkWm9uZSksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgQ2xvdWRGcm9udCBkaXN0cmlidXRpb25cbiAgICBjb25zdCBkaXN0cmlidXRpb24gPSBuZXcgY2xvdWRmcm9udC5EaXN0cmlidXRpb24odGhpcywgJ0Rpc3RyaWJ1dGlvbicsIHtcbiAgICAgIGNvbW1lbnQ6IGAke2NvbmZpZy5idXNpbmVzc05hbWV9IFdlYnNpdGVgLFxuICAgICAgZGVmYXVsdEJlaGF2aW9yOiB7XG4gICAgICAgIG9yaWdpbjogb3JpZ2lucy5TM0J1Y2tldE9yaWdpbi53aXRoT3JpZ2luQWNjZXNzQ29udHJvbCh3ZWJzaXRlQnVja2V0LCB7XG4gICAgICAgICAgb3JpZ2luQWNjZXNzQ29udHJvbCxcbiAgICAgICAgfSksXG4gICAgICAgIHZpZXdlclByb3RvY29sUG9saWN5OiBjbG91ZGZyb250LlZpZXdlclByb3RvY29sUG9saWN5LlJFRElSRUNUX1RPX0hUVFBTLFxuICAgICAgICBhbGxvd2VkTWV0aG9kczogY2xvdWRmcm9udC5BbGxvd2VkTWV0aG9kcy5BTExPV19HRVRfSEVBRCxcbiAgICAgICAgY2FjaGVkTWV0aG9kczogY2xvdWRmcm9udC5DYWNoZWRNZXRob2RzLkNBQ0hFX0dFVF9IRUFELFxuICAgICAgICBjb21wcmVzczogdHJ1ZSxcbiAgICAgICAgZnVuY3Rpb25Bc3NvY2lhdGlvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBmdW5jdGlvbjogdHJhaWxpbmdTbGFzaEZ1bmN0aW9uLFxuICAgICAgICAgICAgZXZlbnRUeXBlOiBjbG91ZGZyb250LkZ1bmN0aW9uRXZlbnRUeXBlLlZJRVdFUl9SRVFVRVNULFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgZG9tYWluTmFtZXM6IGNvbmZpZy5kb21haW5OYW1lID8gW2NvbmZpZy5kb21haW5OYW1lLCAuLi4oY29uZmlnLnd3d1JlZGlyZWN0ID8gW2B3d3cuJHtjb25maWcuZG9tYWluTmFtZX1gXSA6IFtdKV0gOiB1bmRlZmluZWQsXG4gICAgICBjZXJ0aWZpY2F0ZSxcbiAgICAgIGRlZmF1bHRSb290T2JqZWN0OiAnaW5kZXguaHRtbCcsXG4gICAgICBlcnJvclJlc3BvbnNlczogW1xuICAgICAgICB7XG4gICAgICAgICAgaHR0cFN0YXR1czogNDA0LFxuICAgICAgICAgIHJlc3BvbnNlSHR0cFN0YXR1czogMjAwLFxuICAgICAgICAgIHJlc3BvbnNlUGFnZVBhdGg6ICcvaW5kZXguaHRtbCcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBodHRwU3RhdHVzOiA0MDMsXG4gICAgICAgICAgcmVzcG9uc2VIdHRwU3RhdHVzOiAyMDAsXG4gICAgICAgICAgcmVzcG9uc2VQYWdlUGF0aDogJy9pbmRleC5odG1sJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICAvLyBHcmFudCBDbG91ZEZyb250IGFjY2VzcyB0byBTMyBidWNrZXRcbiAgICB3ZWJzaXRlQnVja2V0LmFkZFRvUmVzb3VyY2VQb2xpY3kobmV3IGNkay5hd3NfaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBlZmZlY3Q6IGNkay5hd3NfaWFtLkVmZmVjdC5BTExPVyxcbiAgICAgIHByaW5jaXBhbHM6IFtuZXcgY2RrLmF3c19pYW0uU2VydmljZVByaW5jaXBhbCgnY2xvdWRmcm9udC5hbWF6b25hd3MuY29tJyldLFxuICAgICAgYWN0aW9uczogWydzMzpHZXRPYmplY3QnXSxcbiAgICAgIHJlc291cmNlczogW2Ake3dlYnNpdGVCdWNrZXQuYnVja2V0QXJufS8qYF0sXG4gICAgICBjb25kaXRpb25zOiB7XG4gICAgICAgIFN0cmluZ0VxdWFsczoge1xuICAgICAgICAgICdBV1M6U291cmNlQXJuJzogYGFybjphd3M6Y2xvdWRmcm9udDo6JHt0aGlzLmFjY291bnR9OmRpc3RyaWJ1dGlvbi8ke2Rpc3RyaWJ1dGlvbi5kaXN0cmlidXRpb25JZH1gXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KSk7XG5cbiAgICAvLyBDcmVhdGUgUm91dGU1MyByZWNvcmRzIGlmIGRvbWFpbiBpcyBjb25maWd1cmVkXG4gICAgaWYgKGNvbmZpZy5kb21haW5OYW1lICYmIGhvc3RlZFpvbmUpIHtcbiAgICAgIC8vIEEgcmVjb3JkIGZvciByb290IGRvbWFpblxuICAgICAgbmV3IHJvdXRlNTMuQVJlY29yZCh0aGlzLCAnQVJlY29yZCcsIHtcbiAgICAgICAgem9uZTogaG9zdGVkWm9uZSxcbiAgICAgICAgcmVjb3JkTmFtZTogY29uZmlnLmRvbWFpbk5hbWUsXG4gICAgICAgIHRhcmdldDogcm91dGU1My5SZWNvcmRUYXJnZXQuZnJvbUFsaWFzKG5ldyB0YXJnZXRzLkNsb3VkRnJvbnRUYXJnZXQoZGlzdHJpYnV0aW9uKSksXG4gICAgICB9KTtcblxuICAgICAgLy8gV1dXIHJlZGlyZWN0IGlmIGVuYWJsZWRcbiAgICAgIGlmIChjb25maWcud3d3UmVkaXJlY3QpIHtcbiAgICAgICAgbmV3IHJvdXRlNTMuQVJlY29yZCh0aGlzLCAnV1dXQVJlY29yZCcsIHtcbiAgICAgICAgICB6b25lOiBob3N0ZWRab25lLFxuICAgICAgICAgIHJlY29yZE5hbWU6IGB3d3cuJHtjb25maWcuZG9tYWluTmFtZX1gLFxuICAgICAgICAgIHRhcmdldDogcm91dGU1My5SZWNvcmRUYXJnZXQuZnJvbUFsaWFzKG5ldyB0YXJnZXRzLkNsb3VkRnJvbnRUYXJnZXQoZGlzdHJpYnV0aW9uKSksXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE91dHB1dCBpbXBvcnRhbnQgdmFsdWVzXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ0J1Y2tldE5hbWUnLCB7XG4gICAgICB2YWx1ZTogd2Vic2l0ZUJ1Y2tldC5idWNrZXROYW1lLFxuICAgICAgZGVzY3JpcHRpb246ICdTMyBCdWNrZXQgTmFtZScsXG4gICAgICBleHBvcnROYW1lOiBgJHtjb25maWcucHJvamVjdFNsdWd9LWJ1Y2tldC1uYW1lYCxcbiAgICB9KTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdEaXN0cmlidXRpb25JZCcsIHtcbiAgICAgIHZhbHVlOiBkaXN0cmlidXRpb24uZGlzdHJpYnV0aW9uSWQsXG4gICAgICBkZXNjcmlwdGlvbjogJ0Nsb3VkRnJvbnQgRGlzdHJpYnV0aW9uIElEJyxcbiAgICAgIGV4cG9ydE5hbWU6IGAke2NvbmZpZy5wcm9qZWN0U2x1Z30tZGlzdHJpYnV0aW9uLWlkYCxcbiAgICB9KTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdEaXN0cmlidXRpb25Eb21haW5OYW1lJywge1xuICAgICAgdmFsdWU6IGRpc3RyaWJ1dGlvbi5kaXN0cmlidXRpb25Eb21haW5OYW1lLFxuICAgICAgZGVzY3JpcHRpb246ICdDbG91ZEZyb250IERpc3RyaWJ1dGlvbiBEb21haW4gTmFtZScsXG4gICAgICBleHBvcnROYW1lOiBgJHtjb25maWcucHJvamVjdFNsdWd9LWRpc3RyaWJ1dGlvbi1kb21haW5gLFxuICAgIH0pO1xuXG4gICAgaWYgKGNvbmZpZy5kb21haW5OYW1lKSB7XG4gICAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnV2Vic2l0ZVVybCcsIHtcbiAgICAgICAgdmFsdWU6IGBodHRwczovLyR7Y29uZmlnLmRvbWFpbk5hbWV9YCxcbiAgICAgICAgZGVzY3JpcHRpb246ICdXZWJzaXRlIFVSTCcsXG4gICAgICAgIGV4cG9ydE5hbWU6IGAke2NvbmZpZy5wcm9qZWN0U2x1Z30td2Vic2l0ZS11cmxgLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59Il19