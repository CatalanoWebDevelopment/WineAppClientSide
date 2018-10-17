import { createMuiTheme } from '@material-ui/core/styles';
import Colors from './Colors'

const theme = createMuiTheme({
  palette: {
    primary: {
       main: Colors.primary
    },
    secondary: {
      main: '#f44336',
    },
  },
});

export default theme;