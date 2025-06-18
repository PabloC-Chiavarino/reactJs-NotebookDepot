import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useFirestore, useScroll } from '../../hooks'
import { ToastContainer } from 'react-toastify'
import { throwAddPopUp } from '../../constants/utils'
import { Loader, ItemDetail } from '../../components'
import 'react-toastify/dist/ReactToastify.css'
import './styles.css'

const ItemDetailContainer = () => {
  const { productId } = useParams()
  const ref = useRef()
  const { loading, data } = useFirestore('product', { productId })
  useScroll(ref, 'element')

  return (
    <div className='product__Detailcontainer' ref={ref}>
      {loading
        ? <Loader greeting='Cargando' />
        : (
          <ItemDetail product={data} onAddPopUp={throwAddPopUp} />
          )}
      <ToastContainer />
    </div>
  )
}

export default ItemDetailContainer
