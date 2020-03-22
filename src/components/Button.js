import { withStyles } from '@material-ui/core/styles';
import MaterialUIButton from '@material-ui/core/Button';

const Button = withStyles({
  root: {
    color: 'white',
    backgroundColor: '#0b0b0b',
    fontFamily: 'Assistant',
    textTransform: 'lowercase',
    border: '2px solid #0b0b0b',
    boxShadow: 'none',
    fontSize: '20px',
    fontWeight: '600',
    width: '250px',
    '&:hover': {
      backgroundColor: '#0b0b0b',
      color: 'white',
      borderColor: '#fcd13f'
    },
    '&:disabled': {
      color: 'grey'
    }
  }
})(MaterialUIButton);

export default Button;
