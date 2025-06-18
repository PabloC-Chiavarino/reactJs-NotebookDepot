import { useLocation } from 'react-router-dom'
import { NavBar, Slideshow, ContactForm, Footer, DownChevron } from './components'
import { useScrollDirection } from './hooks'

import Router from './router'
function App () {
  const scrollDirection = useScrollDirection()

  const location = useLocation()

  const isDefault = location.pathname === '/' || location.pathname.startsWith('/categories')

  return (
    <>
      <NavBar />
      {isDefault && (
        <>
          <Slideshow />
          <DownChevron scrollDirection={scrollDirection} />
        </>
      )}
      <Router />
      {isDefault && (
        <>
          <ContactForm />
          <Footer />
        </>
      )}
    </>
  )
}

export default App
