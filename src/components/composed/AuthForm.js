import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Snackbar } from '@mui/material';

const styles = {
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        display:"flex",
        flex: 1,
        height: '100vh',
        marginLeft:130,
        marginRight: 130
    },
    input: {
        marginBottom:20
    },
    label: {
        marginBottom:40,
        fontWeight: "bold",
        fontSize: 22,
        color: 'black'
    }
}

export const AuthForm = ({ isLoading, onSubmit }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [snackIsOpen, setSnackIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if(username && password){
            const data = {
                username,
                password
            }
            onSubmit(data);
        } else {
            setSnackIsOpen(true);
        }
    }

    const handleClick = () => {
        setIsVisible(!isVisible);
    }

    const handleEmail = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleCloseSnack = () => {
        setSnackIsOpen(false);
    }

    return(
        <div style={styles.formContainer}>
            <FormControl autoFocus fullWidth margin="dense">
                <FormLabel style={styles.label}>Órdenes</FormLabel>
                <TextField onChange={handleEmail} style={styles.input} id="outlined-basic" type="email" label="Correo electrónico" variant="outlined" />
                <TextField 
                    style={styles.input}
                    id="outlined-basic" 
                    type={isVisible ? "text" : "password"}
                    label="Contraseña"
                    variant="outlined"
                    onChange={handlePassword}
                    InputProps={{
                    endAdornment: (
                    <InputAdornment>
                        <IconButton onClick={handleClick}>
                           {isVisible ? ( <VisibilityIcon />) : ( <VisibilityOffIcon />)}
                        </IconButton>
                    </InputAdornment>
                    )
                }}
                   />
                <Button variant="contained" color="primary" onClick={handleSubmit}>Ingresar</Button>
            </FormControl>
            <Snackbar
              open={snackIsOpen}
              autoHideDuration={6000}
              onClose={handleCloseSnack}
              message="Ambos campos son requeridos"
            />
        </div>
    );
}