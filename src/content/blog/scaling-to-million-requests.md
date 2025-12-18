---
title: "Scaling to 1 Million Requests Per Second: Lessons from the Trenches"
description: "A deep dive into how we scaled Virex's infrastructure to handle over 1 million requests per second while maintaining sub-50ms response times."
publishedDate: 2025-08-01
author: "David Kim"
image: "/images/blog/scaling-million.webp"
tags: ["tutorial", "deployment"]
draft: false
---

Last month, Virex crossed a significant milestone: we now serve over 1 million requests per second across our global edge network. Getting here wasn't easy, and we learned a lot along the way.

This post shares the key architectural decisions and optimizations that made this scale possible.

## Where We Started

Two years ago, our architecture was straightforward: a handful of servers behind a load balancer, with a PostgreSQL database and Redis cache. It worked well for our first thousand customers.

But as we grew, cracks started to appear:

- Database queries became the bottleneck
- Cache invalidation got increasingly complex
- Single-region deployment meant high latency for international users

We needed to rethink our approach.

## The Edge-First Architecture

Our solution was to move computation to the edge. Instead of routing all requests to a central data center, we now process requests at the location closest to each user.

### Global Distribution

We deployed to 200+ edge locations worldwide. Each location runs:

- Application code in lightweight containers
- A local cache layer
- Connection pooling to regional databases

This reduced average latency from 200ms to under 50ms for most users.

### Smart Caching

Not all data needs to be fresh. We implemented a tiered caching strategy:

**Edge cache (TTL: 1-60 seconds)**
- Static assets
- Public API responses
- Rendered pages

**Regional cache (TTL: 5-15 minutes)**
- User session data
- Frequently accessed database queries

**Origin (always fresh)**
- Write operations
- Sensitive data
- Real-time features

This reduced origin traffic by 85%.

### Database Sharding

A single database can't handle 1M requests per second. We implemented horizontal sharding based on customer ID:

- Each shard handles roughly 10,000 customers
- Shards are distributed across multiple regions
- Read replicas handle query load

The tricky part was cross-shard queries. We solved this with a query routing layer that can fan out requests when needed.

## Performance Optimizations

Beyond architecture, we made countless small optimizations:

**Connection pooling** reduced database connection overhead by 90%.

**Protocol buffers** replaced JSON for internal communication, cutting serialization time in half.

**Precomputed aggregations** eliminated expensive real-time calculations.

**Lazy loading** deferred non-critical data fetching.

## Monitoring at Scale

You can't optimize what you can't measure. We built comprehensive observability:

- Real-time dashboards showing requests per second, latency percentiles, and error rates
- Automated alerting when metrics deviate from baselines
- Distributed tracing to identify bottlenecks

This visibility was crucial for identifying and fixing issues quickly.

## What's Next

We're not done scaling. Our roadmap includes:

- Expanding to 50 additional edge locations
- Implementing predictive scaling based on traffic patterns
- Further reducing cold start times

## Key Takeaways

If you're scaling your own infrastructure, here's what we learned:

1. **Move computation closer to users.** Edge computing isn't just for CDNs anymore.

2. **Cache aggressively, invalidate carefully.** Most data doesn't need to be real-time.

3. **Invest in observability early.** You'll need it when things break at scale.

4. **Design for failure.** At scale, something is always failing somewhere.

Have questions about scaling? Join our [Discord community](https://discord.gg/virex) where our engineering team hangs out.
