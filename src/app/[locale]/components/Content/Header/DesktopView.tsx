import React, { memo } from 'react'
import clsx from 'clsx'
import { Link, Typography } from '@mui/material'

import { useTranslations } from 'next-intl'
import LanguageSelector from '../LanguageSelector'
import Logo from '../../Logo'

import useMenuStyles from './MenuStyles'

type HeaderDesktopProps = {
  asPath: string
  getRouteRef?: (r: { id: number; path: string; name: string }) => string
}

const HeaderDesktopView: React.FC<HeaderDesktopProps> = ({ asPath }) => {
  const classes = useMenuStyles()
  const t = useTranslations('common')

  return (
    <div className={(classes.drawerContainer, classes.drawerShowDesktop)}>
      <div className={classes.logoAndMenu}>
        <Link
          href='/'
          aria-label='logo-header'
          width={200}
          height={42}
          display='flex'
        >
          <Logo width={200} height={42} />
        </Link>
        <div className={classes.topBarMenu}>{/* here map for routers */}</div>
      </div>
      <div className={classes.languageBox}>
        <div className={classes.contactUs}>
          <Link href='/contact' underline='none'>
            <Typography
              variant='body1'
              className={clsx('text', {
                ['linkActive']: asPath === '/contact'
              })}
            >
              {t('contactUs')}
            </Typography>
          </Link>
        </div>
        <LanguageSelector />
      </div>
    </div>
  )
}

export default memo(HeaderDesktopView)
