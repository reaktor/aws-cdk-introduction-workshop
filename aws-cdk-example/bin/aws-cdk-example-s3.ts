#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

/**
 * npm run build
 * cdk deploy --profile demo BucketStack
 * change code
 * cdk diff --profile demo BucketStack
 * cdk deploy --profile demo BucketStack
 * cdk destroy --profile demo BucketStack
 */

const myApp = new cdk.App();
const stack = new cdk.Stack(myApp, 'BucketStack');
new s3.Bucket(stack, 'ExampleBucket', {
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  // encryption: s3.BucketEncryption.S3_MANAGED,
});
myApp.synth();
