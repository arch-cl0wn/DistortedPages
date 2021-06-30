import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import auth from './../auth/auth-helper'
import Footer from './Footer'
import Newsfeed from './../post/Newsfeed'
import Banner from './../assets/images/quillinx_banner.png'
import Picture1 from './../assets/images/pic1.png'
import Picture from './../assets/images/pic.png'
import Picture2 from './../assets/images/pic2.png'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  grid: {
    display: 'inline-flex',
  },
  mobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'inline-flex'
    },
  }
}))


export default function Home({history}){
  const classes = useStyles()
  const [defaultPage, setDefaultPage] = useState(false)

  useEffect(()=> {
    setDefaultPage(auth.isAuthenticated())
    const unlisten = history.listen (() => {
      setDefaultPage(auth.isAuthenticated())
    })
    return () => {
      unlisten()
    }
  }, [])

    return (
      <div className={classes.root}>
        { !defaultPage &&
          <div>
            <div style={{
                      backgroundImage: 'url('+Banner+')',
                      backgroundSize: "cover",
                      height: "71vh",
                      color: "#f5f5f5"
                    }} >
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Grid container spacing={3} alignItems="center" justify="center">
              <Paper elevation={0} className={classes.grid}>
                <Grid item xs={7} className={classes.mobile}>
                    <img src={Picture} style={{maxWidth:"450px"}}/>
                </Grid>
                <Grid item xs={5} className={classes.mobile}>
                    <Typography variant="body1" style={{justify: "center", alignContent: "center"}}>This is where you write stuff idk eh</Typography>
                </Grid>
              </Paper>
            </Grid>
            <Grid container spacing={3} alignItems="center" justify="center">
              <Paper elevation={0} className={classes.grid}>
                <Grid item xs={5}>
                  <Typography variant="body1" style={{justify: "center", alignContent: "center"}}>This is where you write stuff idk eh</Typography>
                </Grid>
                <Grid item xs={7}>
                    <img src={Picture2} style={{maxWidth:"400px"}}/>
                </Grid>
              </Paper>
            </Grid>
            <Grid container spacing={3} alignItems="center" justify="center">
              <Paper elevation={0} className={classes.grid}>
                <Grid item xs={7}>
                    <img src={Picture1} style={{maxWidth:"400px"}}/>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1" style={{justify: "center", alignContent: "center"}}>This is where you write stuff idk eh</Typography>
                </Grid>
              </Paper>
            </Grid>
            <br/>
            <br/>
            <Footer/>
          </div>
  
        }
        {defaultPage &&
          <Grid container spacing={4} style={{marginLeft: 'auto'}}>
            <Grid item xs={12} sm={8}>
              <Newsfeed/>
            </Grid>
            <Grid item sm={3}>
              <Paper>ADS</Paper>
            </Grid>
          </Grid>
        }
      </div>
    )
}
