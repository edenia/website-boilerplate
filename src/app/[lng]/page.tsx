'use client'

import useTranslation from 'app/i18n'

const Home: React.FC<{ params: { lng: string } }> = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, 'home')

  if (!t) return <h1>Loading..</h1>

  return (
    <div data-testid='test-home'>
      <h1>Home Page</h1>
    </div>
  )
}

export default Home
