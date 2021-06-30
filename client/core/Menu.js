import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import clsx from 'clsx'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import ChatIcon from '@material-ui/icons/Telegram'
import HomeIcon from '@material-ui/icons/Home'
import CreateIcon from '@material-ui/icons/Create'
import SettingsIcon from '@material-ui/icons/Settings'
import ActivityIcon from '@material-ui/icons/ViewHeadline'
import ExploreIcon from '@material-ui/icons/Explore'
import ProfileIcon from '@material-ui/icons/AccountCircle'
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

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});



function Menu({history}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem button key={1}>
            <ListItemIcon><HomeIcon/></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button key={2}>
            <ListItemIcon><ActivityIcon/></ListItemIcon>
            <ListItemText primary="Activities" />
          </ListItem>
          <ListItem button key={3}>
            <ListItemIcon><ChatIcon/></ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItem>
          <ListItem button key={4}>
            <ListItemIcon><ExploreIcon/></ListItemIcon>
            <ListItemText primary="Find People" />
          </ListItem>
      </List>
      <Divider />
      <List>
      <ListItem button key={1}>
            <ListItemIcon><ProfileIcon/></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button key={2}>
            <ListItemIcon><CreateIcon/></ListItemIcon>
            <ListItemText primary="Create" />
          </ListItem>
          <ListItem button key={3}>
            <ListItemIcon><SettingsIcon/></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
      </List>
    </div>
  );

  return(
  <div>
    <AppBar position="static" >
      <Toolbar>
      {['left'].map((anchor) => (
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <MenuIcon style={{ fontSize: 40 }} onClick={toggleDrawer(anchor, true)} /> 
            <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
          </IconButton>
      ))}
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
