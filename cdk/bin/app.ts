#!/usr/bin/env node
import 'dotenv/config';
import * as cdk from 'aws-cdk-lib';
import { StaticFastStack } from '../lib/staticfast-stack';

// Load environment variables from parent directory
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const app = new cdk.App();

// Read configuration from environment variables
const config = {
  projectSlug: process.env.PROJECT_SLUG || 'my-project',
  domainName: process.env.DOMAIN_NAME,
  wwwRedirect: process.env.WWW_REDIRECT === 'true',
  businessName: process.env.BUSINESS_NAME || 'My Business',
  awsRegion: process.env.AWS_REGION || 'us-east-1',
  awsAccountId: process.env.AWS_ACCOUNT_ID,
};

// Validate required environment variables
if (!config.awsAccountId) {
  throw new Error('AWS_ACCOUNT_ID environment variable is required');
}

// Ensure awsAccountId is not undefined for the config
const validatedConfig = {
  ...config,
  awsAccountId: config.awsAccountId as string,
};

new StaticFastStack(app, `${config.projectSlug}-stack`, {
  env: {
    account: config.awsAccountId,
    region: config.awsRegion,
  },
  config: validatedConfig,
});