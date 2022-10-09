# Step 2 - Add Basis Theory Elements

This application demonstrates replacing VGS Collect.js with [Basis Theory Elements](https://docs.basistheory.com/elements/#introduction) and utilizing the [Basis Theory Proxy](https://developers.basistheory.com/concepts/what-is-the-proxy/) to send the card data to the VGS Inbound Proxy created during [Step 1](../01-existing-application/). This allows you to start tokenizing sensitive information with Basis Theory without having to replace all existing VGS integrations.

## Create Environment variables

Create a `.env.local` file with your secrets

```
NEXT_PUBLIC_BASIS_THEORY_PUBLIC_KEY=
NEXT_PUBLIC_BASIS_THEORY_PROXY_KEY=
NEXT_PUBLIC_VGS_VAULT_ID=
VGS_USERNAME=
VGS_PASSWORD=
NODE_TLS_REJECT_UNAUTHORIZED=0
```

Copy the values you created for `NEXT_PUBLIC_VGS_VAULT_ID`, `VGS_USERNAME`, and `VGS_PASSWORD` from [Step 1](../01-existing-application/).

`NODE_TLS_REJECT_UNAUTHORIZED` is set to `0` to reject self-signed SSL certificates from VGS. This can be removed, but the Sandbox and CA certificates need to be configured in the `proxy.js` API class.

## Add Basis Theory dependencies to your application
* `@basis-theory/basis-theory-js`
* `@basis-theory/basis-theory-react`

If you do not use React, please see [our guide](https://docs.basistheory.com/elements/#initialize) on how to utilize Bassi Theory Elements with Vanilla JS.

## Create a Basis Theory Management Application
1. When logged into Basis Theory, navigate to Applications
1. Click `Create Application`
1. Choose `Management` application type
1. Name your application
1. Check permissions for `application`, `reactor`, and `proxy`
1. Click `Create Application` and copy the resulting API Key

***Be sure to save this API Key as we will use this to provision our Basis Theory Tenant for the rest of this guide.***

## Create a Basis Theory Public Application
We need a public application to be able to initialize Basis Theory Elements in our UI.

1. Run the following command in your terminal to create a Basis Theory Public App:
   ```bash
   curl "https://api.basistheory.com/applications" \
    -H "BT-API-KEY: <MANAGEMENT API KEY>" \
    -H "Content-Type: application/json" \
    -X "POST" \
    -d '{
      "name": "Public Elements App",
      "type": "public",
      "permissions": [
        "token:pci:create"
      ]
    }'
   ```
1. Copy the `key` value in the response to the `.env.local` file as the `NEXT_PUBLIC_BASIS_THEORY_PUBLIC_KEY` value

## Create a Basis Theory Proxy
We need to detokenize the `card` token we will create and send it to VGS so our existing calls to the VGS Outbound proxy continue to work. 

To do this, we will first tokenize the card with Basis Theory, then proxy the card token to the Basis Theory Proxy which will be forwarded to the VGS Inbound Proxy. VGS will tokenize the card properties from our existing configuration and finally forward the VGS tokens to our API.

1. Run the following command in your terminal to create Basis Theory Proxy:
   ```bash
   curl "https://api.basistheory.com/proxies" \
    -H "BT-API-KEY: <MANAGEMENT API KEY>" \
    -H "Content-Type: application/json" \
    -X "POST" \
    -d '{
      "name": "Inbound Proxy Interceptor",
      "destination_url": "https://<NEXT_PUBLIC_VGS_VAULT_ID>.SANDBOX.verygoodproxy.com/post",
      "require_auth": false
    }'
   ```
1. Copy the `key` value in the response to the `.env.local` file as the `NEXT_PUBLIC_BASIS_THEORY_PROXY_KEY` value

## Replace VGS Form Fields with Basis Theory Elements
Navigate to [`pages/index.js`](./pages/index.js) and replace the VGS `div` form fields with Basis Theory Element components.

Key changes:
* Wrap the form with `<BasisTheoryProvider bt={bt}>`. `bt` comes from the hooks.
* Replace `div` with Basis Theory React components.

## Update Form Posting to Tokenize with Basis Theory
Navigate to [`components/Home.hooks.js`](./components/Home.hooks.js) and replace the Collect.js initialization with the Basis Theory JS initialization.

Key changes:
* We can initialize Basis Theory JS as simply as:
  ```js
  const { bt } = useBasisTheory(
    process.env.NEXT_PUBLIC_BASISTHEORY_ELEMENTS_APPLICATION,
    { elements: true }
  );
  ```
* We no longer need `useEffect` to initialize the form
* We can control exactly what we want to tokenize and when. Simply call the following to during submission of the form to create the `card` token:
  ```js
  const token = await bt.tokenize({
    type: "card",
    data: {
      number: bt.getElement("card_number"),
      expiration_month: expirationDate.month(),
      expiration_year: expirationDate.year(),
      cvc: bt.getElement("cvc"),
    },
  });
  ```
* We need to make a call to Basis Theory Proxy to be able to detokenize our card token and tokenize it with VGS who will send it to our API. This ensures that our API does not break until we can migrate all data. This can be seen via:
  ```js
  const response = await axios
      .post(
          "https://api.basistheory.com/proxy",
          ...
  ```

## Key Integration Spots

| File                                                     | Description                                                                                |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`pages/index.js`](./pages/index.js)                     | Location of Basis Theory Elements                                                          |
| [`components/Home.hooks.js`](./components/Home.hooks.js) | Basis Theory JS is initialized, form is tokenized, and we proxy token to VGS Inbound Proxy |
| [`pages/api/proxy.js`](./pages/api/proxy.js)             | Outbound Proxy call to VGS                                                                 |

## Running

Run the development server:

```bash
npm run dev
# or
yarn dev
```