import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import auth from './../auth/auth-helper'
import FindPeople from './../user/FindPeople'
import Newsfeed from './../post/Newsfeed'
import Carousel from './Carousel'
import Paper from '@material-ui/core/Paper'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paperContainer: {
    marginTop: 0,
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
            <Paper className={classes.paperContainer}>
              <Carousel/>
            </Paper>
        }
        {defaultPage &&
          <Grid container spacing={8}>
            <Grid item xs={12} sm={7}>
              <Newsfeed/>
            </Grid>
            <Grid item xs={12} sm={5}>
              <FindPeople/>
            </Grid>
          </Grid>
        }
      </div>
    )
}
