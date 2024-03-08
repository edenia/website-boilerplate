/* eslint-disable @next/next/no-page-custom-font */
'use client'

import { useState, useCallback, useEffect } from 'react'
import Script from 'next/script'
import { usePathname, notFound } from 'next/navigation'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { NextIntlClientProvider } from 'next-intl'

import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

import { generalConfig } from 'config'
import {
  analyticsConfig,
  seoConfig,
  themeConfig,
  reCaptchaConfig,
  i18nConfig
} from '../../config'
import { analyticsUtils } from '../../utils'
import '../../../public/styles.css'
import enLng from 'languages/en.json'
import esLng from 'languages/es.json'

import MainContent from './components/Content'
import { helvetica } from './font'

type LayoutProps = {
  children: React.ReactNode
  params: {
    locale: string
  }
}

async function getLanguages(locale: string) {
  try {
    return (await import(`../../languages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
}

export default function RootLayout({
  children,
  params: { locale = 'en' }
}: LayoutProps): JSX.Element {
  const pathname = usePathname() || ''
  const currentLanguage = locale === 'en' ? enLng.Metadata : esLng.Metadata
  const isPost = pathname.includes('/blog/')

  const metadata = {
    title:
      currentLanguage[pathname]?.Title || currentLanguage['notFound'].Title,
    description:
      currentLanguage[pathname]?.Description ||
      currentLanguage['notFound'].Description,
    currentRoute: pathname,
    image: isPost
      ? `posts/${pathname.split('/blog/')[1]}.webp`
      : 'preview-image.webp'
  }
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)
  const toggleThemeType = useCallback((): void => {
    setIsDarkTheme(isDark => !isDark)
  }, [])

  const [languages, setlanguages] = useState(null)
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : ''

  useEffect(() => {
    analyticsUtils.pageview(`${origin}${pathname}`)
  }, [origin, pathname])

  useEffect(() => {
    const getLngs = async () => {
      const lgns = await getLanguages(locale)

      setlanguages(lgns)
    }

    getLngs()
  }, [locale])

  return (
    <html lang={locale}>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.trackingCode}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${analyticsConfig.trackingCode}', {
              page_path: window.location.pathname,
            });
          `
        }}
      />
      {/* <DefaultSeo {...seoConfig} /> */}
      <head>
        <title>{metadata.title}</title>
        <meta name='description' content={metadata.description} />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <meta
          name='theme-color'
          content={
            isDarkTheme
              ? themeConfig.darkTheme.palette.primary.main
              : themeConfig.lightTheme.palette.primary.main
          }
        />
        <meta property='og:title' content={metadata.title} />
        <meta property='og:description' content={metadata.description} />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='edenia' />
        <meta property='og:url' content={generalConfig.appUrl} />
        <meta
          property='og:image'
          content={`${generalConfig.appUrl}/images/${metadata.image}`}
        />
        <meta property='og:image:alt' content='Preview image Edenia' />
        <meta property='og:locale' content='en'></meta>
        <meta name='twitter:title' content={metadata.title} />
        <meta name='twitter:description' content={metadata.description} />
        <meta property='twitter:url' content={generalConfig.appUrl} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:image'
          content={`${generalConfig.appUrl}/images/${metadata.image}`}
        />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body className={helvetica.className}>
        <ThemeProvider
          theme={isDarkTheme ? themeConfig.darkTheme : themeConfig.lightTheme}
        >
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={i18nConfig?.dateFnsLocaleMap?.[locale]}
          >
            <GoogleReCaptchaProvider
              reCaptchaKey={reCaptchaConfig.key}
              language={locale}
              useEnterprise={true}
            >
              {languages ? (
                <NextIntlClientProvider locale={locale} messages={languages}>
                  <CssBaseline />
                  <MainContent
                    isDarkTheme={isDarkTheme}
                    toggleThemeType={toggleThemeType}
                    lng={locale}
                  >
                    {children}
                  </MainContent>
                </NextIntlClientProvider>
              ) : (
                <span>loading...</span>
              )}
            </GoogleReCaptchaProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
