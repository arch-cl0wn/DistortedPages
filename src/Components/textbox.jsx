import {
  withStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#2f4671',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#2f4671',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#2f4671',
        },
        '&:hover fieldset': {
          borderColor: '#283d62',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#2f4671',
        },
      },
    },
  })(TextField);

export default CssTextField;  