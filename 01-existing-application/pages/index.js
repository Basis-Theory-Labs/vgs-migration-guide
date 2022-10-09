import Head from 'next/head'
import {
  Container,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { useHome } from '@/components/Home.hooks';

import styles from '../styles/Home.module.css'

export default function Home() {
  const { submit } = useHome();

  return (
    <Container maxWidth="md">
      <Head>
        <title>Step 1 - Existing Application</title>
      </Head>

      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Add Credit Card
        </Typography>

        <form onSubmit={submit} className="form">
          <div className={styles.fieldColumns}>
            <div className="field-wrapper">
              <span className="field-title">
                Card Number
              </span>
              <div className="row-input">
                <div id="cc-number" className="form-field"></div>
              </div>
            </div>
          </div>

          <div className={styles.fieldColumns}>
            <div className="field-wrapper">
              <span className="field-title">
                Expiration Date
              </span>
              <div className="row-input">
                <div id="cc-expiration-date" className="form-field"></div>
              </div>
            </div>

            <div className="field-wrapper">
              <span className="field-title">
                CVC
              </span>
              <div className="row-input">
                <div id="cc-cvc" className="form-field"></div>
              </div>
            </div>
          </div>
          
          <Button size="large" variant="contained" onClick={submit}>Submit</Button>
        </form>
      </Paper>
    </Container>
  )
}
