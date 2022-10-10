/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).json({message: 'Endpoint not found'});

    return;
  }

  const { cardToken } = req.body;

  try {
    const { data }  = await axios.post(
      'https://api.basistheory.com/proxy', 
      {
        card_number: `{{ ${cardToken} | json: '$.number' }}`,
        card_exp: `{{ ${cardToken} | json: '$.expiration_month' }}/{{ ${cardToken} | json: '$.expiration_year' }}`,
        card_cvc: `{{ ${cardToken} | json: '$.cvc' }}`,
      }, 
      {
        headers: {
          'BT-PROXY-URL': 'https://httpbin.org/post',
          'BT-API-KEY': process.env.BASIS_THEORY_PRIVATE_KEY,
          'Content-Type': 'application/json'
        }
      });

    res.status(200).json(data);
  } catch (err) {
      console.error(err);
  }
}
