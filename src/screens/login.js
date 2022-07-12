import * as React from 'react';
import Grid from '@mui/material/Grid';
import {AuthForm} from '../components/composed/AuthForm';

const styles = {
    leftContainer: {
        display:"flex",
        backgroundColor:"#1976d2",
        heigth:"100%"
    }
}

const LoginScreen = ({isLoading, onSubmit }) => {


    return(
        <Grid container>
            <Grid style={styles.leftContainer} item xs={5} /> 
            <Grid  direction="column" alignItems="center" item xs={7}>
               <AuthForm isLoading={isLoading} onSubmit={onSubmit} />
            </Grid>
        </Grid>
    );
}

export default LoginScreen;