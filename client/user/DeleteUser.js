import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from './../auth/auth-helper'
import {remove} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button:{
    color: theme.palette.dark,
  }
}))

export default function DeleteUser(props) {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const classes = useStyles()
  
  const jwt = auth.isAuthenticated()
  const clickButton = () => {
    setOpen(true)
  }
  const deleteAccount = () => { 
    remove({
      userId: props.userId
    }, {t: jwt.token}).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        auth.clearJWT(() => console.log('deleted'))
        setRedirect(true)
      }
    })
  }
  const handleRequestClose = () => {
    setOpen(false)
  }

    if (redirect) {
      return <Redirect to='/'/>
    }
    return (<span>
  
      <Button onClick={clickButton} color="secondary">Delete Account</Button>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button className={classes.button} onClick={deleteAccount} autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>)
}
DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
}
