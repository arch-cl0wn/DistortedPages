import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import SearchUser from './SearchUser'
import auth from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'


const isActive = (history, path) => {
  if (history.location.pathname == path)
    return {color: '#ffffff'}
  else
    return {color: '#ffffff'}
}



function Menu({history}) {

  return(
  <div>
    <AppBar position="static" >
      <Toolbar>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <MenuIcon style={{ fontSize: 40 }}/> 
          </IconButton>
        </Link>
        <Typography variant="h4" color="inherit" noWrap>
          Quillinx
        </Typography>
        <SearchUser/>
        <div style={{marginLeft: 'auto'}}>
        {
          !auth.isAuthenticated() && (<span>
            <Link to="/signup">
              <Button style={isActive(history, "/signup")}>Sign up
              </Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive(history, "/signin")}>Sign In
              </Button>
            </Link>
          </span>)
        }
        {
          auth.isAuthenticated() && (<span>
            <Link to={"/user/" + auth.isAuthenticated().user._id}>
              <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
            </Link>
            <Button color="inherit" onClick={() => {
                auth.clearJWT(() => history.push('/'))
              }}>Sign out</Button>
          </span>)
        }
        </div>
      </Toolbar>
    </AppBar>
  </div>  
  )
}

export default withRouter(Menu)
