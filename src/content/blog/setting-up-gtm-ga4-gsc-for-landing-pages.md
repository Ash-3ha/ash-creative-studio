---
title: "Setting Up GTM, GA4 & Search Console Cleanly for Portfolio & Landing Pages"
author: "Akash Thirumal"
publishDate: 2026-10-28
category: "Analytics & Tracking"
featuredImage: "/images/uploads/blog-analytics-cover.svg"
tags: ["Google Tag Manager", "GA4", "Google Search Console", "Conversion Tracking"]
excerpt: "A practical checklist I use to wire up Google Tag Manager, GA4 events, UTM links, and Google Search Console without duplicate scripts."
seoTitle: "GTM, GA4 & Search Console Setup Notes — Akash Thirumal"
seoDescription: "Practical checklist for configuring Google Tag Manager, Google Analytics 4 conversion events, UTM tracking, and Google Search Console."
draft: false
relatedSlugs: ["seo-fundamentals-for-landing-pages-and-cms", "combining-performance-marketing-with-visual-creative"]
---

Before running campaigns or promoting a landing page, I make sure basic measurement is reliable. Without clear event tracking, it is hard to tell which channel or page update actually led to an enquiry.

## 1. Keep Tag Management in One Place

Using **Google Tag Manager (GTM)** as the central container helps keep tracking organized:

- Avoid hardcoding duplicate GA4 snippets when GTM already deploys the configuration tag.
- Use consistent `dataLayer` event names for key interactions like `contact_form_submit`, `whatsapp_click`, `phone_click`, and `email_click`.
- Keep admin or internal dashboard routes excluded from conversion triggers.

## 2. Use Consistent UTM Parameters

Whenever traffic comes from Google Ads, Meta Ads, or social links, structured UTM tags (`utm_source`, `utm_medium`, `utm_campaign`) make source comparison inside **GA4** much clearer.

## 3. Check Indexing in Google Search Console

Tracking user behavior goes alongside checking how Google sees the site:

- Verify domain ownership via DNS or verification meta tags.
- Submit the XML sitemap (`sitemap-index.xml` / `sitemap-0.xml`).
- Review page indexing status and fix canonical or `robots.txt` issues early.
