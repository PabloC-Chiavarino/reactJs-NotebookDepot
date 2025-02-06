import { ItemListContainer, Carousel } from '../../components'
import './styles.css'

const DefaultPage = () => {
  return (
    <>
      <Carousel />
      <section className='productsSection'>
        <ItemListContainer />
      </section>
    </>
  )
}

export default DefaultPage
