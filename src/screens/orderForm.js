import * as React from 'react';
import Grid from '@mui/material/Grid';
import {OrderForm} from '../components/composed/OrderForm';
import {Header} from '../components/composed/Header';

const OrderScreen = ({isLoading, onSubmit }) => {


    return(
        <Grid container>
            <Header />
            <Grid  direction="column" alignItems="center" item xs={12}>
               <OrderForm isLoading={isLoading} onSubmit={onSubmit} />
            </Grid>
        </Grid>
    );
}

export default OrderScreen;