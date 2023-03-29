# Step 4 - Replace VGS Proxy with Basis Theory Proxy

Now that our data has been migrated to Basis Theory, we can replace the VGS Outbound Proxy with [Basis Theory Proxy](https://developers.basistheory.com/concepts/what-is-the-proxy/) and eliminate the unneeded VGS Inbound Proxy call as we can now submit directly to our API as all tokens are created in the client's browser.

## Create Environment variables

Create a `.env.local` file with your secrets

```
NEXT_PUBLIC_BASIS_THEORY_PUBLIC_KEY=
BASIS_THEORY_PRIVATE_KEY=
```

Copy the values you created for `NEXT_PUBLIC_BASIS_THEORY_PUBLIC_KEY` from [Step 2](../02-add-elements/).

## Create a Basis Theory Private Application
We need a public application to be able to initialize Basis Theory Elements in our UI.

1. Run the following command in your terminal to create a Basis Theory Public App:
   ```bash
   curl "https://api.basistheory.com/applications" \
    -H "BT-API-KEY: <MANAGEMENT API KEY>" \
    -H "Content-Type: application/json" \
    -X "POST" \
    -d '{
      "name": "Private App",
      "type": "private",
      "permissions": [
        "token:use"
      ]
    }'
   ```
2. Copy the `key` value in the response to the `.env.local` file as the `BASIS_THEORY_PRIVATE_KEY` value

## Remove Proxy call to VGS Inbound Proxy
Navigate to [`components/Home.hooks.js`](./components/Home.hooks.js) and remove the Proxy call to `https://api.basistheory.com/proxy` and remove unneeded VGS tokens from the forwarded result.

## Update Proxy call to Use Basis Theory Proxy
Navigate to [`pages/api/proxy.js`](./pages/api/proxy.js) and update the call to utilize Basis Theory Proxy.

Key changes:
* We no longer need to configure a proxy agent and can make a direct call to Basis Theory Proxy and set the `BT-PROXY-URL` of where we want to forward the detokenized payload.
* Basis Theory utilizes [Expressions](https://docs.basistheory.com/expressions/) to extract and transform parts of your tokens. 

## Key Integration Spots

| File                                                     | Description                                          |
| -------------------------------------------------------- | ---------------------------------------------------- |
| [`pages/index.js`](./pages/index.js)                     | Location of Basis Theory Elements                    |
| [`components/Home.hooks.js`](./components/Home.hooks.js) | Basis Theory JS is initialized and form is tokenized |
| [`pages/api/proxy.js`](./pages/api/proxy.js)             | Outbound call to using Basis Theory Proxy            |

## Running

Run the development server:

```bash
npm run dev
# or
yarn dev
```