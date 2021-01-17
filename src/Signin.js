import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Container from '@material-ui/core/Container';
import StyledCheckbox from './Components/checkbox';
import CssTextField from './Components/textbox';
import MyButton from './Components/button';
import theme from './Components/theme';
import auth from './Components/auth/auth-helper';
import { Redirect } from 'react-router-dom';
import { signin } from './utils/api-auth.js';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
	card: {
		maxWidth: 600,
		margin: 'auto',
		textAlign: 'center',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
		paddingBottom: theme.spacing.unit * 2
	},
	error: {
		verticalAlign: 'middle'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
	title: {
    marginTop: theme.spacing.unit * 2,
    align: 'center',
		color: theme.palette.openTitle
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 300
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		marginBottom: theme.spacing.unit * 2
	}
});

class Signin extends Component {
	state = {
		email: '',
		password: '',
		error: '',
		redirectToReferrer: false
	};

	clickSubmit = () => {
		const user = {
			email: this.state.email || undefined,
			password: this.state.password || undefined
		};

		signin(user).then(data => {
			if (data.error) {
				this.setState({ error: data.error });
			} else {
				auth.authenticate(data, () => {
					this.setState({ redirectToReferrer: true });
				});
			}
		});
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	render() {
		const { classes } = this.props;
		const { from } = this.props.location.state || {
			from: {
				pathname: '/'
			}
		};
		const { redirectToReferrer } = this.state;
		if (redirectToReferrer) {
			return <Redirect to={from} />;
		}

		return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <ThemeProvider theme={theme}>
            <div className={classes.paper}>
              <div align='center'>
              <Avatar className={classes.avatar} align='center'>
                <LockOutlinedIcon />
              </Avatar>
              </div>
              <br/>
              <Typography component="h1" variant="h5" align='center'>
                Sign in
              </Typography>
              <form className={classes.form} Validate>
                <CssTextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  autoFocus
                />
                <CssTextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                />
                <br />{' '}
					        {this.state.error && (
						      <Typography component="p" color="error">
							    <Icon color="error" className={classes.error}>
								  error
							    </Icon>
							    {this.state.error}
						      </Typography>
					      )}
                <FormControlLabel
                  control={<StyledCheckbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <MyButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.clickSubmit}
                >
                  Sign In
                </MyButton>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            </ThemeProvider>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
		);
	}
}

export default withStyles(styles)(Signin);