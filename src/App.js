import React, { useState } from 'react';
import './App.css';
import LoginScreen from './screens/login';
import OrderScreen from './screens/orderForm';
import AuthService from "../src/services/authService";
import { Snackbar } from '@mui/material';
import { SESSION_KEY } from '../src/utils/constants';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [snackIsOpen, setSnackIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userIsConnected, setUserIsConnected] = useState(false);
  const authService = new AuthService();
  
  const handleLogin = async (userData) => {
    setIsLoading(true);
     authService.login(userData).then((response)=> {
      if(response?.access_token){
        setUserIsConnected(true);
        sessionStorage.setItem(SESSION_KEY, response.access_token);
      }
      setIsLoading(false);
     })
     .catch((error)=>{
      setErrorMessage(error);
      setSnackIsOpen(true)
     })
  };

  const handleCloseSnack = () => {
    setSnackIsOpen(false);
}

  return (
    <div>
      {userIsConnected ? (
        <OrderScreen />
        ) : (
          <LoginScreen isLoading={isLoading} onSubmit={handleLogin} />
      )}
      <Snackbar
        open={snackIsOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        message={errorMessage}
      />
    </div>
  );
}

export default App;
