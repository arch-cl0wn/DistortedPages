import React, {useEffect, useState} from 'react'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import DeleteUser from './DeleteUser'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import Avatar from '@material-ui/core/Avatar'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    alignItems: 'center',
    padding: theme.spacing(0, 3),
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  paper: {
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2)
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
}))

export default function EditProfile({ match }) {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '',
    about: '',
    photo: '',
    username: '',
    password: '',
    redirectToProfile: false,
    error: '',
    id: ''
  })
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data & data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, id: data._id, name: data.name, username: data.username, about: data.about})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])
  
  const clickSubmit = () => {
    let userData = new FormData()
    values.name && userData.append('name', values.name)
    values.username && userData.append('username', values.username)
    values.passoword && userData.append('passoword', values.passoword)
    values.about && userData.append('about', values.about)
    values.photo && userData.append('photo', values.photo)
    update({
      userId: match.params.userId
    }, {
      t: jwt.token
    }, userData).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, 'redirectToProfile': true})
      }
    })
  }
  const handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    //userData.set(name, value)
    setValues({...values, [name]: value })
  }
    const photoUrl = values.id
                 ? `/api/users/photo/${values.id}?${new Date().getTime()}`
                 : '/api/users/defaultphoto'
    if (values.redirectToProfile) {
      return (<Redirect to={'/user/' + values.id}/>)
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={7}>
          <Paper className={classes.paper}>
              <Typography variant="h6" className={classes.title}>
                Edit Profile
              </Typography>
              <Avatar src={photoUrl} className={classes.bigAvatar}/><br/>
              <input accept="image/*" onChange={handleChange('photo')} className={classes.input} id="icon-button-file" type="file" />
              <label htmlFor="icon-button-file">
                <Button variant="contained" color="default" component="span">
                  Upload
                  <FileUpload/>
                </Button>
              </label> <span className={classes.filename}>{values.photo ? values.photo.name : ''}</span><br/>
              <TextField id="name" label="Name" variant="outlined" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
              <TextField
                id="multiline-flexible"
                label="About"
                variant="outlined"
                multiline
                rows="5"
                value={values.about}
                onChange={handleChange('about')}
                className={classes.textField}
                margin="normal"
              /><br/>
              <TextField id="username" variant="outlined" type="username" label="Username" className={classes.textField} value={values.username} onChange={handleChange('username')} margin="normal"/><br/>
              <TextField id="password" variant="outlined" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>                  
              <br/> {
                values.error && (<Typography component="p" color="error">
                  <Icon color="error" className={classes.error}>error</Icon>
                  {values.error}
                </Typography>)
              }
              <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
          </Paper>
          </Grid>
          <Grid item xs={5}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h5" className={classes.title}>Keen on missing out all the awesome content of Quillinx? Delete your account here ! </Typography>
            <DeleteUser userId={values.id}/>
          </Paper>
        </Grid>
        </Grid>
      </div>
    )
}
