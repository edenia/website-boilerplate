import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  containerIcon: {
    display: 'flex',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginRight: '0px'
    }
  },
  languageLabel: {
    fontSize: '16px',
    color: theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
      color: theme.palette.common.white,
      display: 'block'
    },
    [theme.breakpoints.down('sm')]: {
      color: theme.palette.common.white,
      display: 'none'
    }
  },
  button: {
    '& .MuiButton-root': {
      minWidth: '30px'
    }
  },
  mobileContainer: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  desktopContainer: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  selectedOption: {
    color: theme.palette.common.black,
    display: 'flex',
    flexDirection: 'column',
    '& .underline': {
      height: '3px',
      width: '100%',
      borderTop: `2px solid ${theme.palette.primary.main}`
    }
  }
}))

export default Styles
