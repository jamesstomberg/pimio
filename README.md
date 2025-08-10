This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test with a local back-end

- Setup a local WordPress installation and install the WooCommerce plugin
- Have the local WordPress site run on http://vanilla.test - else change the API base url in definitions.ts to match where your local WordPress installation is running
- Create at minimum 1 administrator user via the WordPress back-end (since this application does not allow open user registration)
- When 1 administrator is created, it is possible to create new admin users via this application as a logged in administrator
