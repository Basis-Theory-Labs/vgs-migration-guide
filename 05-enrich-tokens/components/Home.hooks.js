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
      id: "{{ data.number | alias_preserve_format }}", // Format preserving aliasing
      data: {
        number: bt.getElement("cc-number"),
        expiration_month: expirationDate.month(),
        expiration_year: expirationDate.year(),
        cvc: bt.getElement("cc-cvc"),
      },
      fingerprint_expression: "{{ data.number }}", // Fingerprint the card number
      mask: {
        number: "{{ data.number | reveal: 6 }}", // Expose BIN on the card number
        expiration_month: "{{ data.expiration_month }}",
        expiration_year: "{{ data.expiration_year }}"
      },
      search_indexes: [
        "{{ data.number }}", // Search on full card number
        "{{ data.number | last4 }}" // Search on last 4 of the card number
      ],
      metadata: {
        "ecommerce_customer": true
      }
    });

    await router.push(`/results?cardToken=${token.id}`);
  };

  return {
    cardBrand,
    onCardNumberChange,
    submit,
    bt
  };
}