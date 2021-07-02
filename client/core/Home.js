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
    overflow: 'hidden',
  },
  paper: {
    padding: theme.spacing(2),
    elevation: 0,
    background: '#fafafa',
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  paper1: {
    padding: theme.spacing(0),
    elevation: 0,
    background: '#fafafa',
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
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
            <Grid container spacing={0} alignItems="center" justify="center">
                <Grid item xs={12} sm={6}>
                  <Paper elevation={0} className={classes.paper}>
                    <img src={Picture} style={{maxWidth:"500px"}}/>
                  </Paper>
                </Grid>
                <Grid item sm={6} xs={12} >
                <Paper elevation={0} className={classes.paper1}>
                    <Typography variant="h1" align="center">Share Your Thoughts</Typography>
                    <br/>
                    <Typography variant="body1" align="center">
                    Have something so say? Share your thoughts with the world with Quillinx Journals !!
                    </Typography>
                </Paper>
                </Grid>
            </Grid>
            <br/>
            <br/>
            <br/>
            <Grid container spacing={0} alignItems="center" justify="center">
                <Grid item xs={5}>
                <Paper elevation={0} className={classes.paper}>
                <Typography variant="h1" align="center">Chat With Friends</Typography>
                <br/>
                    <Typography variant="body1" style={{justify: "center", alignContent: "center"}}>
                      Get in touch with people all around the world without caring for your privacy being compromised :D
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={7}>
                  <Paper elevation={0} className={classes.paper}>
                      <img src={Picture2} style={{maxWidth:"400px"}}/>
                  </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={7}>
                <Paper elevation={0} className={classes.paper}>
                    <img src={Picture1} style={{maxWidth:"400px"}}/>
                </Paper>
                </Grid>
                <Grid item xs={5}>
                <Paper elevation={0} className={classes.paper}>
                <Typography variant="h1" align="center">Capture Moments</Typography>
                <br/>
                  <Typography variant="body1" style={{justify: "center", alignContent: "center"}}>
                    Connect with people better through posts and a newsfeed that keeps you updated on your favourite people.
                    </Typography>
                </Paper>
                </Grid>
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
              <Paper style={{height:'350px', alignItems: 'center', justify: 'center'}}>ADS</Paper>
            </Grid>
          </Grid>
        }
      </div>
    )
}
