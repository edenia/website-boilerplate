import localFont from 'next/font/local'

export const helvetica = localFont({
  display: 'swap',
  preload: true,
  src: [
    {
      path: '../../../public/fonts/Helvetica.woff',
      weight: '400',
      style: 'medium'
    },
    {
      path: '../../../public/fonts/Helvetica-Bold.woff',
      weight: '700',
      style: 'bold'
    }
  ]
})
