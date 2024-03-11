'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import enLng from '../../../languages/en.json'
import esLng from '../../../languages/es.json'
import '../../../../public/styles.css'

const useStyles = makeStyles<Theme>(theme => ({
  mainContainer: {
    display: 'block',
    position: 'relative',
    width: '100%',
    height: '100%',
    margin: theme.spacing(5, 0)
  }
}))

const FourOFour: React.FC = () => {
  const [lng, setLng] = useState(enLng.common[404])
  const classes = useStyles()

  useEffect(() => {
    window.location.href.includes('/es/') && setLng(esLng.common[404])
  }, [])

  return (
    <section className={classes.mainContainer}>
      <div className='forOfor-content-container'>
        <div className='forOfor-content-text-container'>
          <h1>404</h1>
          <h2>
            {lng?.errorMessage1}
            {lng?.errorMessage2}
          </h2>
          <br />
          <div className='forOfor-button-container'>
            <Link className='forOfor-primary-button' href='/'>
              {lng?.contactMessage1}
            </Link>
            <Link className='forOfor-secondary-button' href='/contact'>
              {lng?.contactMessage2}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FourOFour
