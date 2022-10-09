require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const migrator = async function (req) {
  const axios = require('axios').default;
  var HttpsProxyAgent = require('https-proxy-agent');

  var agent = new HttpsProxyAgent(`https://${process.env.VGS_USERNAME}:${process.env.VGS_PASSWORD}@${process.env.VGS_VAULT_ID}.sandbox.verygoodproxy.com:8443`);

  const { data }  = await axios.post(
    'https://api.basistheory.com/proxy', 
    {
      card_number: req.cardNumber,
      card_exp: req.cardExpiration,
      card_cvc: req.cardCvc,
    }, 
    {
      httpsAgent: agent,
      headers: {
        "BT-PROXY-KEY": process.env.BASIS_THEORY_PROXY_KEY,
        "Content-Type": 'application/json'
      }
    });

  return data;
};

const request = {
  cardNumber: 'tok_sandbox_7oJbTZ5yPL3xgbRaRiW5xs',
  cardExpiration: 'tok_sandbox_gccCUUwUzGUij71WD4HwnS',
  cardCvc: 'tok_sandbox_qE87K8qkB8KmgFp7EuzEBA'
};

migrator(request).then(result => console.log(result));