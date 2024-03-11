import { Typography } from '@mui/material'
import { useTranslations } from 'next-intl'

import useStyles from './styles'

type FooterProps = {
  isDarkTheme: boolean
  toggleThemeType(): void
}

const Footer: React.FC<FooterProps> = () => {
  const classes = useStyles()
  const t = useTranslations('common')

  return (
    <footer>
      <div className={classes.footerContainer}>
        <Typography className={classes.copyright}>
          Copyright © {new Date().getFullYear()} {t('footer.copyright')}
        </Typography>
      </div>
    </footer>
  )
}

export default Footer
