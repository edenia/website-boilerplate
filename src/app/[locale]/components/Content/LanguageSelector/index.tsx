'use client'

import { useTransition, memo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import { usePathname, useRouter } from 'navigation'
import LanguageIcon from './LanguageIcon'

import useStyles from './styles'

const LanguageSelector = () => {
  const t = useTranslations('common')
  const locale = useLocale()
  const classes = useStyles()
  const router = useRouter()
  const pathname = usePathname()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [, startTransition] = useTransition()
  const open = Boolean(anchorEl)

  console.log(locale)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (lng: string | null) => {
    if (!lng) {
      setAnchorEl(null)

      return
    }

    startTransition(() => {
      router.replace(pathname, { locale: lng })
    })
  }

  return (
    <div>
      <div className={classes.button}>
        <Button
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <div className={classes.containerIcon}>
            <div className={classes.desktopContainer}>
              <LanguageIcon width={24} height={24} />
            </div>
            <div className={classes.mobileContainer}>
              <LanguageIcon width={32} height={32} />
            </div>
          </div>
          <Typography variant='body1' className={classes.languageLabel}>
            {locale}
          </Typography>
        </Button>
      </div>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {['en', 'es'].map(lng => (
          <MenuItem
            key={lng}
            onClick={() => handleClose(lng)}
            className={locale === lng ? classes.selectedOption : ''}
          >
            {t('locale', { locale: lng })}
            <div className='underline' />
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default memo(LanguageSelector)
