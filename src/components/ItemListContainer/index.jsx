import { useParams, useLocation } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useFirestore, useScroll } from '../../hooks'
import { capitalizeStr } from '../../constants/utils'
import { Loader, ItemList, SectionTitle, BackBtn, ForwardBtn, ItemFilters } from '../../components'
import './styles.css'

const ItemListContainer = () => {
  const sectionRef = useRef()
  const productsRef = useRef()
  const location = useLocation()
  const { categoryId } = useParams()
  const { loading, data } = useFirestore('products', { categoryId })
  const [filters, setFilters] = useState({
    brand: [],
    processor: [],
    ram: [],
    screensize: [],
    storage: []
  })

  const homePath = (
    location.pathname === '/'
  )

  const filteredData = homePath ? data : data.filter((item) => {
    const { brand, processor, ram, screensize, storage } = filters

    if (brand.length > 0 && !brand.includes(item.brand)) return false
    if (processor.length > 0 && !processor.includes(item.processor)) return false
    if (ram.length > 0 && !ram.includes(item.ram)) return false
    if (screensize.length > 0 && !screensize.includes(item.screensize)) return false
    if (storage.length > 0 && !storage.includes(item.storage)) return false

    return true
  })

  const maxItemsShow = filteredData.length > 3

  const scrollType = homePath ? 'manual' : 'element'

  useScroll(sectionRef, scrollType)

  const scrollBack = () => {
    productsRef.current.scrollLeft -= 400
  }

  const scrollForward = () => {
    productsRef.current.scrollLeft += 400
  }

  return (
    <section className='products__container' ref={sectionRef}>
      {loading
        ? (
            capitalizeStr(categoryId)
              ? (
                <Loader greeting={`Cargando ${capitalizeStr(categoryId)}`} />
                )
              : (
                <Loader greeting='Bienvenido' />
                )
          )
        : (
          <>
            <SectionTitle section={categoryId ? capitalizeStr(categoryId) : 'Productos Destacados'} />
            <div className='products__container--wrapper'>
              {!homePath && <ItemFilters filters={filters} setFilters={setFilters} data={data} />}
              <div ref={productsRef} className={`products__container--items ${maxItemsShow && homePath ? 'has-buttons' : 'grid-style'}`}>
                {maxItemsShow && homePath && <BackBtn scrollBack={scrollBack} />}
                <ItemList data={filteredData} />
                {maxItemsShow && homePath && <ForwardBtn scrollForward={scrollForward} />}
              </div>
            </div>
          </>
          )}
    </section>
  )
}

export default ItemListContainer
