import { useParams, useLocation } from 'react-router-dom'
import { useRef } from 'react'
import { useFirestore, useScroll } from '../../hooks'
import { Loader, ItemList, SectionTitle, BackBtn, ForwardBtn } from '../../components'
import './styles.css'

const ItemListContainer = () => {
  const sectionRef = useRef()
  const productsRef = useRef()
  const location = useLocation()
  const { categoryId } = useParams()
  const { loading, data } = useFirestore('products', { categoryId })

  const maxItemsShow = data.length > 3

  const shouldScroll = (
    location.pathname !== '/'
  )

  const scrollType = shouldScroll ? 'element' : 'manual'

  useScroll(sectionRef, scrollType)

  const scrollBack = () => {
    productsRef.current.scrollLeft = -400
  }

  const scrollForward = () => {
    productsRef.current.scrollLeft = 400
  }

  return (
    <section className='products__container' ref={sectionRef}>
      {loading
        ? (
            categoryId
              ? (
                <Loader greeting={`Cargando ${categoryId}`} />
                )
              : (
                <Loader greeting='Bienvenido' />
                )
          )
        : (
          <>
            <SectionTitle section={categoryId || 'Productos Destacados'} />
            <div ref={productsRef} className={`products__container--items ${maxItemsShow ? 'has-buttons' : ''}`}>
              {maxItemsShow && <BackBtn scrollBack={scrollBack} />}
              <ItemList data={data} />
              {maxItemsShow && <ForwardBtn scrollForward={scrollForward} />}
            </div>
          </>
          )}
    </section>
  )
}

export default ItemListContainer
