import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export const useResults = () => {
  const router = useRouter();
  const { cardNumber, cardExpiration, cardCvc } = router.query;

  const [proxyResponse, setProxyResponse] = useState(null);

  const proxy = () => {
    axios
      .post("/api/proxy", { cardNumber, cardExpiration, cardCvc })
      .then(({ data }) => {
        setProxyResponse(data);
      });
  };

  return {
    proxy,
    cardNumber,
    cardExpiration,
    cardCvc,
    proxyResponse
  };
}