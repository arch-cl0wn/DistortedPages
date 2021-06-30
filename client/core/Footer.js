import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Background from './../assets/images/bg.png'


export default function Footer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div style={{
                      backgroundImage: 'url('+Background+')',
                      backgroundSize: "cover",
                      height: "50vh",
                      color: "#f5f5f5"
                    }} >
            <br/>
               <Typography variant="h2" size="56" color="inherit">Quillinx</Typography>
            </div>
    </React.Fragment>
  );
}