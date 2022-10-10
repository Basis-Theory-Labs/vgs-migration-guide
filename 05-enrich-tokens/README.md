# Step 5 - Enrich Your Basis Theory Tokens

Basis Theory's tokens have [multiple capabilities](https://developers.basistheory.com/concepts/what-are-tokens/) which can be utilized to enrich your tokens with attributes like metadata, custom masking, search indexes, fingerprinting, and a custom alias. This step will show a demonstration of all of them. 

## Create Environment variables

Create a `.env.local` file with your secrets

```
NEXT_PUBLIC_BASIS_THEORY_PUBLIC_KEY=
BASIS_THEORY_PRIVATE_KEY=
```

Copy the values you set in [Step 4](../04-replace-proxy/) of this guide.

## Enrich Your Tokens
A demonistration of all capabilities around enriching your tokens can be seen in [`components/Home.hooks.js`](./components/Home.hooks.js)

## Key Integration Spots

| File                                                     | Description                                |
| -------------------------------------------------------- | ------------------------------------------ |
| [`components/Home.hooks.js`](./components/Home.hooks.js) | Demonstrates token enrichment capabilities |

## Running

Run the development server:

```bash
npm run dev
# or
yarn dev
```