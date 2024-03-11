import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  footerContainer: {
    marginTop: 'auto'
  },
  copyright: {
    backgroundColor: '#000',
    color: theme.palette.common.white,
    fontSize: '14px',
    fontWeight: 400,
    padding: theme.spacing(1),
    textAlign: 'center'
  }
}))

export default Styles
