import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../components/shared/layout/header/Header';
import { ThemeProviderEnum, themeVar } from '../variables/Shared'
import { Page404 } from '../pages/Page404'
import {AppContext} from '../contexts'

const HomePage = lazy(() => import('../pages/HomePage'))


export default function Routes() {
  const [theme, setTheme] = useState({theme: localStorage.getItem('theme')})

  useEffect(() => {
    if (theme.theme === 'dark') {
      themeVar(ThemeProviderEnum.dark)
    } else {
      themeVar(ThemeProviderEnum.light)
    }
  }, [theme])

  return (    
      <Suspense fallback={<Header />}>
        <AppContext.Provider value={{theme, setTheme}}>
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='**' component={Page404} />
          </Switch>
        </AppContext.Provider>
      </Suspense>
  )
}
