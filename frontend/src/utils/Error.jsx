import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
const Error = ({message,open,setopen}) => {
   const handelClose=()=>{
    setopen(false)
   }
    return <div>
        <Snackbar 
        open={open} 
        autoHideDuration={6000}
        anchorOrigin={{
            vertical:"bottom",
            horizontal:"center"
        }} >
            <Alert variant="filled" onClose={handelClose} severity="info" sx={{ width: '100%' }}>
               {message}
            </Alert>
        </Snackbar>
    </div>
}

export default Error;