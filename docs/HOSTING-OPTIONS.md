# Hosting assessment — 30 October 2026

No migration, deployment, plan purchase, domain change or remote environment edit was performed. Existing Vercel Preview configuration is unchanged.

| Option | Fit for BreakLoop | Practical limit |
| --- | --- | --- |
| Vercel Hobby | Keep the existing working preview during preparation; do not assume commercial production is eligible. | Official fair-use rules limit Hobby to personal non-commercial use and explicitly include advertising product sales as commercial. |
| Netlify Free | A reasonable production candidate for a small commercial marketing site if free hosting is important. | Current credit plan: 300 credits/month, hard limit, no auto-recharge. Traffic, builds and image delivery consume resources. |
| Vercel paid plan | Avoids an infrastructure migration if its cost is acceptable. | Requires separate user authorization; no purchase is proposed as an automatic step. |

Netlify explicitly permits commercial Free projects. Its maintained OpenNext adapter supports Next.js versions from 13.5 onward, including the project's Next.js 16 line, with App Router, route handlers and image optimization. This is a documentation-based compatibility assessment, not evidence that this exact project has passed a Netlify deployment. Do not change to a static export just to move hosts: the current project uses image optimization and generated OG endpoints.

Recommendation: preserve the working Vercel Preview now. For a future commercial launch, evaluate Netlify Free against expected traffic/build frequency and its hard cap; it offers a concrete cost/eligibility advantage over Hobby. Migration is not necessary to finish this local task. If separately authorized later, test EN/TR routes, OG images, themes, redirects, build approval and Preview noindex on a separate preview before changing DNS. Update Privacy/KVKK provider, transfer and retention facts for the host actually chosen. Neither host resolves missing legal facts automatically.

Official sources checked:

- [Vercel commercial-use rules](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage).
- [Netlify Free commercial use](https://www.netlify.com/blog/introducing-netlify-free-plan/) — commercial permission; its historical quotas are not used for today's pricing.
- [Current Netlify credit plans](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/) — current Free hard limit.
- [Next.js on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) — adapter support and limitations.
