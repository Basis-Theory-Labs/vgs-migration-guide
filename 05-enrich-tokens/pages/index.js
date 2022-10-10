import Head from 'next/head'
import {
  Container,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import {
  CardNumberElement,
  CardExpirationDateElement,
  CardVerificationCodeElement,
  BasisTheoryProvider,
} from "@basis-theory/basis-theory-react";
import { useHome } from '@/components/Home.hooks';

import styles from '../styles/Home.module.css'

export default function Home() {
  const { cardBrand, onCardNumberChange, submit, bt } = useHome();

  return (
    <Container maxWidth="md">
      <Head>
        <title>Step 4 - Replace VGS Proxy with Basis Theory Proxy</title>
      </Head>

      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Add Credit Card
        </Typography>

        <form onSubmit={submit} className="form">
          <BasisTheoryProvider bt={bt}>
            <div className={styles.fieldColumns}>
              <div className="field-wrapper">
                <span className="field-title">
                  Card Number
                </span>
                <div className="row-input">
                  <CardNumberElement id="cc-number" 
                    onChange={onCardNumberChange} />
                </div>
              </div>
            </div>

            <div className={styles.fieldColumns}>
              <div className="field-wrapper">
                <span className="field-title">
                  Expiration Date
                </span>
                <div className="row-input">
                  <CardExpirationDateElement id="cc-expiration-date" />
                </div>
              </div>

              <div className="field-wrapper">
                <span className="field-title">
                  CVC
                </span>
                <div className="row-input">
                  <CardVerificationCodeElement id="cc-cvc" 
                    cardBrand={cardBrand} />
                </div>
              </div>
            </div>
          </BasisTheoryProvider>

          <Button size="large" variant="contained" onClick={submit}>Submit</Button>
        </form>
      </Paper>
    </Container>
  )
}
