import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import { useFirestore, useScroll } from '../../hooks'
import { Loader, ItemList, SectionTitle, BackBtn, FowardBtn } from '../../components'
import './styles.css'

const ItemListContainer = () => {
  const ref = useRef()
  const toView = useScroll(ref, 'top')
  const { categoryId } = useParams()
  const { loading, data } = useFirestore('products')
  const maxItemsShow = data.length > 3

  const scrollBack = () => {
    ref.current.scrollLeft = -366
  }

  const scrollForward = () => {
    ref.current.scrollLeft = 400
  }

  return (
    <section className='products__container' ref={ref}>
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
            {
                        maxItemsShow
                          ? (
                            <>
                              <BackBtn scrollBack={scrollBack} />
                              <ItemList data={data} />
                              <FowardBtn scrollFoward={scrollForward} />
                            </>
                            )
                          : (
                            <ItemList data={data} />
                            )
                    }
          </>
          )}
    </section>
  )
}

export default ItemListContainer
