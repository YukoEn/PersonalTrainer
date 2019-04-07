import purple from '@material-ui/core/colors/purple';


export const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  cssRoot: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
  bootstrapRoot: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  bootstrapPrimary: {
    backgroundColor: '#007bff',
    borderColor: '#fff',
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: 'none',
      //boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      //boxShadow: '0 0 0 0.2rem rgba(38,143,255,.5)',
    },
  },
  bootstrapSecondary: {
    backgroundColor: '#6c757d',
    borderColor: '#6c757d',
    '&:hover': {
      backgroundColor: '#5a6268',
      borderColor: '#545b62',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#545b62',
      borderColor: '#4e555b',
    },
    '&:focus': {
      boxShadow: 'none',
    },
  },
  bootstrapDanger: {
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
    '&:hover': {
      backgroundColor: '#c82333',
      borderColor: '#bd2130',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#bd2130',
      borderColor: '#b21f2d',
    },
    '&:focus': {
      boxShadow: 'none',
    },
  },
});
