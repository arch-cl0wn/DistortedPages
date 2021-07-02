import React, {useState} from 'react'
import {fade, makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText' 
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Avatar from '@material-ui/core/Avatar'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import {searchUsers} from './api-search'
import {Link} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '23ch',
      },
    },
    sectionDesktop: {
      alignContent: 'left',
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    avatar: {
      marginRight: theme.spacing(1)
    },
    list: {
      position: 'absolute',
      width: 369,
      color: 'white',
      top: '50px',
      left: '281px',
    },
  }));

  export default function SearchUsers() {
    const classes = useStyles()

    const [search, setSearch] = useState('')
    const [values, setValues] = useState([])
    const [open, setOpen] = React.useState(false)

    const fetchUsers = (query) => {
      setSearch(query)
      setOpen((prev) => !prev)
      searchUsers({query}).then((data) => {
        if (data && data.error){
          console.log(data.error)
        }else{
          setValues(data)
          console.log(data)
        }
      })
    }


    const handleClickAway = () => {
      setOpen(false);
    }

      return(
        <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.sectionDesktop}>
        <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                value={search}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e)=>fetchUsers(e.target.value)}
              />
            </div>
            {open?
            <List className={classes.list}>
            {values.map((item, i) => {
              return <Paper elevation={0}><span key={i}>
                <ListItem button component={Link} to={"/user/" + item._id}>
                  <ListItemAvatar className={classes.avatar}>
                    <Avatar src={'/api/users/photo/'+item._id}/>
                  </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.username} color='black'/>
                </ListItem>
              </span>
              </Paper>
            })}
            </List>
             : null}
        </div>
        </ClickAwayListener>
      )
  }