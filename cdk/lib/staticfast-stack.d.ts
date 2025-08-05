import * as cdk from 'aws-cdk-lib';
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
export declare class StaticFastStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: StaticFastStackProps);
}
