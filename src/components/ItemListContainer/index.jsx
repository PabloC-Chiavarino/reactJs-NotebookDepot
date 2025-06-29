import { useParams, useLocation } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useFirestore, useScroll } from '../../hooks'
import { Loader, ItemList, SectionTitle, BackBtn, ForwardBtn, ItemFilters } from '../../components'
import './styles.css'

const ItemListContainer = () => {
  const sectionRef = useRef()
  const productsRef = useRef()
  const location = useLocation()
  const { categoryId } = useParams()
  const { loading, data } = useFirestore('products', { categoryId })

  const [filters, setFilters] = useState({
    brand: '',
    processor: '',
    ram: '',
    screensize: ''
  })

  const filteredData = data.filter((item) => {
    const { brand, processor, ram, screensize } = filters

    if (brand && item.brand !== brand) return false
    if (processor && item.processor !== processor) return false
    if (ram && item.ram !== ram) return false
    if (screensize && item.screensize !== screensize) return false

    return true
  })

  const maxItemsShow = filteredData.length > 3

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
            <ItemFilters filters={filters} setFilters={setFilters} data={data} />
            <div ref={productsRef} className={`products__container--items ${maxItemsShow ? 'has-buttons' : ''}`}>
              {maxItemsShow && <BackBtn scrollBack={scrollBack} />}
              <ItemList data={filteredData} />
              {maxItemsShow && <ForwardBtn scrollForward={scrollForward} />}
            </div>
          </>
          )}
    </section>
  )
}

export default ItemListContainer
