import { useRef } from 'react'
import { useFirestore, useScroll } from '../../hooks'
import { ToastContainer } from 'react-toastify'
import { throwAddPopUp } from '../../constants/utils'
import { Loader, ItemDetail } from '../../components'
import 'react-toastify/dist/ReactToastify.css'
import './styles.css'

const ItemDetailContainer = () => {
  const ref = useRef()
  const { loading, data } = useFirestore('unity')
  const toView = useScroll(ref, 'element')

  return (
    <>
      <div className='product__Detailcontainer' ref={ref}>
        {loading
          ? <Loader greeting='Cargando' />
          : (
            <ItemDetail product={data} onAddPopUp={throwAddPopUp} />
            )}
        <ToastContainer />
      </div>
    </>
  )
}

export default ItemDetailContainer
