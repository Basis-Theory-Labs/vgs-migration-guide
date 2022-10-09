import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export const useResults = () => {
  const router = useRouter();
  const { cardToken } = router.query;

  const [proxyResponse, setProxyResponse] = useState(null);

  const proxy = () => {
    axios
      .post("/api/proxy", { cardToken })
      .then(({ data }) => {
        setProxyResponse(data);
      });
  };

  return {
    proxy,
    cardToken,
    proxyResponse
  };
}