# EVA MAKEUP STUDIO

Website source for Cloudflare Pages. The main site is `index.html` on branch `main`.

## Automatic deployment

In Cloudflare Workers & Pages, create a **new Pages project** using **Import an existing Git repository**. Select `Derik1977/eva-makeup`, branch `main`. Framework preset: None; build command: leave blank; build output directory: `/` (repository root). Confirm configuration in Cloudflare UI before deploying. Existing project `eva-makeup.pages.dev` was created by Direct Upload and is **not** automatically linked to GitHub; don't delete it until the new site is tested.

## Backend

Supabase project ref `ahhjqyvlvenbdnmrptfp`. Frontend exposes only a public publishable key. Never commit secrets or service-role keys. Authorization and row access are controlled by Supabase Auth + RLS.

## Status / caution

This is an early prototype. Before collecting real client personal data: test signup/signin, booking collisions, cancellation deadlines, artist-only permissions, password recovery, privacy consent, and message/photo storage. Client phone-only login currently uses an internal synthetic email mapping, which does not verify ownership of the telephone number and needs additional anti-abuse safeguards. Do not consider that equivalent to verified phone authentication.
