import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
  background: 'linear-gradient(90deg, rgba(9,14,23,1) 0%, rgba(28,42,68,1) 100%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(9, 10, 121, .3)',
  color: 'white',
  height: 40,
});

export default MyButton;