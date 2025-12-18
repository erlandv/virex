---
title: "Zero Downtime Deployments: How We Achieved 99.99% Uptime"
description: "Learn how Virex implements zero-downtime deployments and the engineering decisions that helped us achieve 99.99% uptime for our customers."
publishedDate: 2025-05-01
author: "Sarah Mitchell"
image: "/images/blog/zero-downtime.webp"
tags: ["tutorial", "deployment", "development"]
draft: false
---

Downtime is expensive. For e-commerce sites, every minute of downtime can mean thousands in lost revenue. For SaaS products, it erodes customer trust. That's why we've invested heavily in making Virex deployments truly zero-downtime.

Here's how we did it.

## The Challenge

Traditional deployments follow a simple pattern: stop the old version, start the new one. The problem? There's always a gap—however brief—where your application isn't serving requests.

For small sites, a few seconds of downtime might be acceptable. But as you scale, those seconds add up. And for global applications serving users across time zones, there's never a "good time" for downtime.

## Our Approach: Blue-Green Deployments at Scale

We use a variant of blue-green deployments, but with some important modifications for edge computing:

### 1. Parallel Environment Provisioning

When you push a new deployment, we don't touch your running application. Instead, we spin up a completely parallel environment:

- New containers are provisioned across our edge network
- Your application is built and deployed to these new containers
- Health checks verify everything is working correctly

Only when the new environment is fully healthy do we proceed.

### 2. Gradual Traffic Shifting

Rather than switching all traffic at once, we gradually shift requests to the new deployment:

- 1% of traffic goes to the new version
- We monitor error rates and latency
- If metrics look good, we increase to 10%, then 50%, then 100%
- If anything looks wrong, we automatically roll back

This canary approach catches issues before they affect all users.

### 3. Connection Draining

Active connections to the old deployment aren't terminated abruptly. We use connection draining to:

- Stop sending new requests to old containers
- Allow existing requests to complete (up to 30 seconds)
- Only then terminate the old containers

This ensures no request is ever dropped mid-flight.

## The Results

Since implementing this system, we've achieved:

- **99.99% uptime** across all customer deployments
- **Zero dropped requests** during deployments
- **Average deployment time** of 47 seconds

## Lessons Learned

Building this system taught us several important lessons:

**Observability is essential.** You can't do gradual rollouts without excellent metrics. We invested heavily in real-time monitoring before building the deployment system.

**Automation prevents human error.** Manual rollbacks are slow and error-prone. Our system makes rollback decisions automatically based on predefined thresholds.

**Edge computing changes everything.** Deploying to 200+ locations simultaneously requires different thinking than deploying to a single data center.

## Try It Yourself

Every Virex deployment uses this system automatically. There's nothing to configure—just push your code and we handle the rest.

Want to see it in action? [Start your free trial](/pricing) and deploy your first application in minutes.
