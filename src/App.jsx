import { NavBar, Slideshow, ContactForm, Footer, DownChevron } from './components'
import { useScrollDirection } from './hooks'

import Router from './router'
function App () {
  const scrollDirection = useScrollDirection()

  return (
    <>
      <NavBar />
      <Slideshow />
      <DownChevron scrollDirection={scrollDirection} />
      <Router />
      <ContactForm />
      <Footer />
    </>
  )
}

export default App
