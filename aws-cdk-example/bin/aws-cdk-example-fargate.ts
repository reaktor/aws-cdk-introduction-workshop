#!/usr/bin/env node
import 'source-map-support/register';
import * as core from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';

// Example code from: https://docs.aws.amazon.com/cdk/latest/guide/home.html
export class MyEcsConstructStack extends core.Stack {
  constructor(scope: core.App, id: string, props?: core.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "MyVpc", {
      maxAzs: 2 // Default is all AZs in region
    });

    const cluster = new ecs.Cluster(this, "MyCluster", {
      vpc: vpc
    });

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.LoadBalancedFargateService(this, "MyFargateService", {
      cluster: cluster, // Required
      cpu: 256, // Default is 256
      desiredCount: 1, // Default is 1
      image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"), // Required
      memoryLimitMiB: 515, // Default is 512
      publicLoadBalancer: false // Default is false
    });
  }
}

const myApp = new core.App();
new MyEcsConstructStack(myApp, 'FargateExampleStack', { });
myApp.synth();
