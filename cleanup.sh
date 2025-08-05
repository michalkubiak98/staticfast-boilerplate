#!/bin/bash

# StaticFast Boilerplate Cleanup Script
# This script tears down all AWS resources created by the boilerplate

set -e

echo "🧹 StaticFast Cleanup Script"
echo "=============================="
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Please make sure you're in the project root directory."
    exit 1
fi

# Load environment variables
source .env

# Validate required variables
if [ -z "$PROJECT_SLUG" ]; then
    echo "❌ PROJECT_SLUG not set in .env file"
    exit 1
fi

if [ -z "$AWS_ACCOUNT_ID" ]; then
    echo "❌ AWS_ACCOUNT_ID not set in .env file"
    exit 1
fi

if [ -z "$AWS_REGION" ]; then
    echo "❌ AWS_REGION not set in .env file"
    exit 1
fi

echo "📋 Configuration:"
echo "   Project Slug: $PROJECT_SLUG"
echo "   AWS Account: $AWS_ACCOUNT_ID"
echo "   AWS Region: $AWS_REGION"
echo ""

# Confirm deletion
echo "⚠️  WARNING: This will DELETE all AWS resources for this project!"
echo "   - S3 Bucket: $PROJECT_SLUG-website-$AWS_ACCOUNT_ID"
echo "   - CloudFront Distribution"
echo "   - Route53 Records (if using custom domain)"
echo "   - SSL Certificate"
echo ""
read -p "Are you sure you want to proceed? (type 'yes' to confirm): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Cleanup cancelled."
    exit 0
fi

echo ""
echo "🚀 Starting cleanup process..."

# Change to CDK directory
cd cdk

# Install CDK dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing CDK dependencies..."
    npm install
fi

# Destroy the CDK stack
echo "🗑️  Destroying CDK stack..."
npx cdk destroy --force

# Check if destruction was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Cleanup completed successfully!"
    echo ""
    echo "🔍 What was removed:"
    echo "   ✓ S3 bucket and all contents"
    echo "   ✓ CloudFront distribution"
    echo "   ✓ SSL certificate"
    echo "   ✓ Route53 DNS records"
    echo "   ✓ All associated AWS resources"
    echo ""
    echo "💡 Note: It may take up to 15 minutes for CloudFront distribution"
    echo "   to be fully removed from AWS console."
    echo ""
    echo "🆕 To redeploy, simply run the deployment process again!"
else
    echo ""
    echo "❌ Cleanup failed. Please check the error messages above."
    echo ""
    echo "🛠️  Manual cleanup may be required:"
    echo "   1. Delete S3 bucket: $PROJECT_SLUG-website-$AWS_ACCOUNT_ID"
    echo "   2. Delete CloudFront distribution"
    echo "   3. Delete Route53 records"
    echo "   4. Delete SSL certificate"
    exit 1
fi