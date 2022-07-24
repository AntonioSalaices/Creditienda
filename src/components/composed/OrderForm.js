import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Snackbar } from '@mui/material';
import OrderService from '../../services/orderService';
import { STATUS } from '../../utils/constants';

const styles = {
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        display:"flex",
        flex: 1,
        height: '100vh',
        marginLeft:"28%",
        marginRight: "28%"
    },
    input: {
        marginBottom:20
    },
    label: {
        textAlign: "center",
        marginBottom:40,
        fontWeight: "bold",
        fontSize: 22,
        color: 'black'
    },
    statusLabel: {
        marginBottom:20,
        fontWeight: "bold",
        color: 'black'
    },
    radioGroup: {
       display:'flex',
       marginBottom:20,
       justifyContent:'space-between'
    },
    radioButton: {
        border: '1px solid #BDC3C7',
        padding: '6px',
        borderRadius: '3px',
        flex:1,
        width: '80%',
        margin:5,
    }
}

export const OrderForm = () => {
    const [snackIsOpen, setSnackIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [order, setOrder] = useState('');
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState('');
    const orderService = new OrderService();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(order && status){
            let data = {
                numOrden:order,
                estado: status
            };
            if(status === STATUS.CANCELADO){
                data = {
                    numOrden:order,
                    estado: status, 
                    motivo: comment
                };
            }
            
            orderService.saveOrder(data)
            .then((response)=> {
                setSnackIsOpen(true)
                setMessage(response);


                //CLEAR INPUTS
                setComment('');
                setOrder('');
                setStatus('')
            })
            .catch((error)=>{
                setMessage(error);
                setSnackIsOpen(true);
            });
        } else {
            setSnackIsOpen(true);
        }
    }

    const handleNumOrder = (e) => {
        e.preventDefault()
        setOrder(e.target.value)
    }

    const handleReason = (e) => {
        e.preventDefault()
        setComment(e.target.value)
    }
    
    const handleChangeStatus = (e) => {
        e.preventDefault()
        setStatus(e.target.value)
    }

    const handleCloseSnack = () => {
        setSnackIsOpen(false);
    }

    return(
        <div style={styles.formContainer}>
            <FormControl autoFocus fullWidth margin="dense">
                <FormLabel style={styles.label}>Órdenes</FormLabel>
                <TextField 
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                  onChange={handleNumOrder} style={styles.input}
                  id="outlined-basic" 
                  type="number"
                  label="Número de orden"
                  variant="outlined"
                />
                <FormLabel style={styles.statusLabel}>Estatus</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="delivered"
                    name="radio-buttons-group"
                    row
                    value={status}
                    onChange={handleChangeStatus}
                    style={styles.radioGroup}
                >
                    <FormControlLabel 
                     style={{...styles.radioButton, border:`1px solid ${status === 'delivered' ?  '#1976d2' : '#BDC3C7'}`}}
                     value="delivered" control={<Radio />}
                     label="Entregado"
                    />
                    <FormControlLabel 
                     style={{...styles.radioButton, border: `1px solid ${status === 'cancelled' ?  '#1976d2' : '#BDC3C7'}`}} 
                     value="cancelled"
                     control={<Radio />}
                     label="Cancelado"
                    />
                </RadioGroup>
                {status === 'cancelled' && (
                    <TextField 
                        onChange={handleReason} style={styles.input}
                        id="outlined-basic" 
                        type="text"
                        label="Comentario"
                        variant="outlined"
                    />
                )}
                <Button variant="contained" color="primary" onClick={handleSubmit}>Enviar</Button>
            </FormControl>
            <Snackbar
              open={snackIsOpen}
              autoHideDuration={6000}
              onClose={handleCloseSnack}
              message={message}
            />
        </div>
    );
}