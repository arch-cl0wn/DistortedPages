import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Newsfeed from './post/Newsfeed'
import Menu from './core/Menu'
import FindPeople from './user/FindPeople'
import CssBaseline from '@material-ui/core/CssBaseline'

const MainRouter = () => {
    return (<div>
      <Menu/>
      <CssBaseline/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/explore" component={FindPeople}/>
        <Route path="/activities" component={Newsfeed}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
      </Switch>
    </div>)
}

export default MainRouter
