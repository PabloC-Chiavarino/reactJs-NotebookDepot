import { useFirestore, useScrollToElement } from '../../hooks'
import { ToastContainer } from 'react-toastify';
import { throwAddPopUp } from '../../constants/utils';
import { Loader, ItemDetail } from '../../components'
import 'react-toastify/dist/ReactToastify.css';
import "./styles.css"

const ItemDetailContainer = () => {
    
    const { loading, data } = useFirestore('unity')
    const toView = useScrollToElement()

    return (
        <>  
            <div className='product__Detailcontainer' >
                {loading ? <Loader greeting={'Cargando'}/> : (
                        <ItemDetail product={data} onAddPopUp={throwAddPopUp} />
                    )}
                    <ToastContainer />
            </div>
        </>
    )
}

export default ItemDetailContainer