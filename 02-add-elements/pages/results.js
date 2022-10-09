import Head from 'next/head'
import {
  Container,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useResults } from '@/components/Results.hooks';

export default function Home() {
  const {
    proxy,
    cardToken,
    cardNumber,
    cardExpiration,
    cardCvc,
    proxyResponse
  } = useResults();

  return (
    <Container maxWidth="md">
      <Head>
        <title>Results</title>
      </Head>

      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center" sx={{ mb: 3 }}>
          Basis Theory Tokens
        </Typography>

        <Paper variant="outlined" className='token-paper'>
          <span className='token-badge'>Card Token</span> {cardToken}
        </Paper>
      </Paper>

      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center" sx={{ mb: 3 }}>
          VGS Tokens
        </Typography>

        <Paper variant="outlined" className='token-paper'>
          <span className='token-badge'>Card Number</span> {cardNumber}
        </Paper>
        <Paper variant="outlined" className='token-paper'>
          <span className='token-badge'>Expiration Date</span> {cardExpiration}
        </Paper>
        <Paper variant="outlined" className='token-paper'>
          <span className='token-badge'>CVC</span> {cardCvc}
        </Paper>
      </Paper>

      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Button size="large" variant="contained" onClick={proxy}>Proxy to Card Processor</Button>

        {proxyResponse && (
          <SyntaxHighlighter language="json">
            {JSON.stringify(proxyResponse, undefined, "\t")}
          </SyntaxHighlighter>
        )}
      </Paper>
    </Container>
  )
}
