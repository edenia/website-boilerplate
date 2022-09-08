import Header from './Header'
import Container from './Container'
import Footer from './Footer'
import Styles from './styles'

const useStyles = Styles

type LayoutProps = {
  children: JSX.Element
  isDarkTheme: boolean
  toggleThemeType(): void
}

const Layout: React.FC<LayoutProps> = ({
  children,
  isDarkTheme,
  toggleThemeType
}) => {
  const classes = useStyles()

  return (
    <div className={classes.wrapperClass}>
      <Header />
      <Container>{children}</Container>
      <Footer isDarkTheme={isDarkTheme} toggleThemeType={toggleThemeType} />
    </div>
  )
}

export default Layout
