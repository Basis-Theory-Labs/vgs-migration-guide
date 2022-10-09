/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { useState } from 'react';
import { useBasisTheory } from "@basis-theory/basis-theory-react";
import { useRouter } from "next/router";

export const useHome = () => {
  const router = useRouter();
  const { bt } = useBasisTheory(
    process.env.NEXT_PUBLIC_BASIS_THEORY_PUBLIC_KEY,
    { elements: true }
  );

  const [cardBrand, setCardBrand] = useState();

  const onCardNumberChange = ({ cardBrand: brand }) => {
    setCardBrand(brand);
  };

  const submit = async () => {
    const expirationDate = bt.getElement("cc-expiration-date")

    const token = await bt.tokenize({
      type: "card",
      data: {
        number: bt.getElement("cc-number"),
        expiration_month: expirationDate.month(),
        expiration_year: expirationDate.year(),
        cvc: bt.getElement("cc-cvc"),
      },
    });

    const { data } = await axios
      .post(
          "https://api.basistheory.com/proxy",
          {
            card_token: token.id,
            card_number: `{{ ${token.id} | json: '$.number' }}`,
            card_exp: `{{ ${token.id} | json: '$.expiration_month' }}/{{ ${token.id} | json: '$.expiration_year' }}`,
            card_cvc: `{{ ${token.id} | json: '$.cvc' }}`,
          },
          {
            headers: {
              "BT-PROXY-KEY": process.env.NEXT_PUBLIC_BASIS_THEORY_PROXY_KEY,
              "Content-Type": 'application/json',
            },
          }
      )

    await router.push(`/results?cardToken=${token.id}&cardNumber=${data.json.card_number}&cardExpiration=${data.json.card_exp}&cardCvc=${data.json.card_cvc}`);
  };

  return {
    cardBrand,
    onCardNumberChange,
    submit,
    bt
  };
}