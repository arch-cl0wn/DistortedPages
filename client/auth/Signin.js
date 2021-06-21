import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import {Redirect} from 'react-router-dom'
import {signin} from './api-auth.js'
import {Link} from 'react-router-dom'
import Textbox1 from '../core/Textbox1'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://www.quillinx.co">
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
    alignItems: 'center'
  },
  submit: {
    margin: 'auto',
    width: 350,
    height: 40,
    marginBottom: theme.spacing(2)
  }
}))

export default function Signin(props) {
  const classes = useStyles()
  const [values, setValues] = useState({
      username: '',
      password: '',
      error: '',
      redirectToReferrer: false
  })

  const clickSubmit = () => {
    const user = {
      username: values.username || undefined,
      password: values.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '',redirectToReferrer: true})
        })
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const {from} = props.location.state || {
      from: {
        pathname: '/'
      }
  }
  const {redirectToReferrer} = values
    if (redirectToReferrer) {
      return (<Redirect to={from}/>)
  }

  return (
      <Card className={classes.card}>
        <CardContent>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        </div>
          <Typography variant="h6" className={classes.title}>
            Sign In
          </Typography>
          <Textbox1 id="username" type="username" label="Username" variant="outlined" className={classes.textField} value={values.username} onChange={handleChange('username')} margin="normal"/><br/>
          <Textbox1 id="password" type="password" label="Password" variant="outlined" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
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
    )
}
