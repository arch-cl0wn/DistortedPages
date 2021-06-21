import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction' 
import ListItemText from '@material-ui/core/ListItemText' 
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'
import FollowProfileButton from './../user/FollowProfileButton'
import ProfileTabs from './../user/ProfileTabs'
import {listByUser} from './../post/api-post.js'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    color: theme.palette.protectedTitle,
    padding: theme.spacing(1.25),
  },
  paper: {
    height: 60,
  },

  paper1:{
    height: 500,
    [theme.breakpoints.down('sm')]:{
      display: 'none',
    }
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10
  },
}))

export default function Profile({ match }) {
  const classes = useStyles()
  const [values, setValues] = useState({
    user: {following:[], followers:[]},
    redirectToSignin: false,
    following: false
  })
  const [posts, setPosts] = useState([])
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
  
    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setValues({...values, redirectToSignin: true})
      } else {
        let following = checkFollow(data)
        setValues({...values, user: data, following: following})
        loadPosts(data._id)
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])
  
  const checkFollow = (user) => {
    const match = user.followers.some((follower)=> {
      return follower._id == jwt.user._id
    })
    return match
  }
  const clickFollowButton = (callApi) => {
    callApi({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, values.user._id).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, user: data, following: !values.following})
      }
    })
  }
  const loadPosts = (user) => {
    listByUser({
      userId: user
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setPosts(data)
      }
    })
  }
  const removePost = (post) => {
    const updatedPosts = posts
    const index = updatedPosts.indexOf(post)
    updatedPosts.splice(index, 1)
    setPosts(updatedPosts)
  }

    const photoUrl = values.user._id
              ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
              : '/api/users/defaultphoto'
    if (values.redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
        <Paper elevation={3}>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={photoUrl} className={classes.bigAvatar}/>
            </ListItemAvatar>
            <ListItemText primary={values.user.name} secondary={values.user.username}/> {
             auth.isAuthenticated().user && auth.isAuthenticated().user._id == values.user._id
             ? (<ListItemSecondaryAction>
                  <Link to={"/user/edit/" + values.user._id}>
                    <IconButton aria-label="Edit" color="primary">
                      <Edit/>
                    </IconButton>
                  </Link>
                </ListItemSecondaryAction>)
            : (<FollowProfileButton following={values.following} onButtonClick={clickFollowButton}/>)
            }
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText primary={values.user.about} secondary={"Joined: " + (
              new Date(values.user.created)).toDateString()}/>
          </ListItem>
        </List>
        <ProfileTabs user={values.user} posts={posts} removePostUpdate={removePost}/>
        </Paper> 
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.paper1}>{
          auth.isAuthenticated().user && auth.isAuthenticated().user._id == values.user._id ?
              (<List dense>
                <ListItem>
                  <ListItemText><Typography variant="h4" className={classes.title}>Create</Typography></ListItemText>
                  <ListItemSecondaryAction>
                    <AddCircleIcon color='primary' fontSize='large'/>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>): 
              (<List dense>
                <ListItem>
                  <ListItemText><Typography variant="h4" className={classes.title}>Creations</Typography></ListItemText>
                  <ListItemSecondaryAction>
                    <TurnedInIcon color='primary' fontSize='large'/>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>)}
              <Divider/>
        </Paper>
        </Grid>
      </Grid>
    </div>

    )
}


