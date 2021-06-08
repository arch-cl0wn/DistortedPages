import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {create} from './api-user.js'
import {Link} from 'react-router-dom'
import Textbox1 from '../core/Textbox1'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.distortedpages.com">
        Quillinx
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350
  },

  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  
  submit: {
    margin: 'auto',
    width: 350,
    height: 40,
    marginBottom: theme.spacing(2)
  }
}))

export default function Signup (){
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '',
    password: '',
    username: '',
    open: false,
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      username: values.username || undefined,
      password: values.password || undefined
    }
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, error: '', open: true})
      }
    })
  }

    return (<div>
      <Card className={classes.card}>
        <CardContent>
        <div className={classes.paper}>  
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        </div>
          <Typography variant="h6" className={classes.title}>
            Sign Up
          </Typography>
          <br/>
          <Textbox1 id="name" label="Name" className={classes.textField} variant="outlined" value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
          <Textbox1 id="username" type="username" label="Username" className={classes.textField} variant="outlined" value={values.username} onChange={handleChange('username')} margin="normal"/><br/>
          <Textbox1 id="password" type="password" label="Password" className={classes.textField} variant="outlined" value={values.password} onChange={handleChange('password')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}</Typography>)
          }
        </CardContent>
        <br/>
        <CardActions>
          <Button color="primary" fullWidth variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
        <Box mt={5}>
        <Copyright />
      </Box>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>)
}