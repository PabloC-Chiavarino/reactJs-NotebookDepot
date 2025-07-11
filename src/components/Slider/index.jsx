import { useNavigate } from 'react-router-dom'
import { useCartContext, useAuthContext } from '../../hooks'
import SliderItem from '../SliderItem'
import { mustBeLogged } from '../../constants/utils'
import './styles.css'

const Slider = ({ show, onClose }) => {
  const { cartProducts, cartTotalPrice } = useCartContext()
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const handleOnClick = async () => {
    if (user) {
      navigate('/cart')
      onClose()
    } else {
      const result = await mustBeLogged()
      if (result.isConfirmed) {
        navigate('account/signIn')
        onClose()
      }
    }
  }

  return (
    <div
      className='slider__container'
      style={{ transform: show ? 'translateX(0)' : 'translateX(100%)' }}
    >
      <div onClick={onClose} className='slider__closeButton'>
        X
      </div>
      <h3 className='slider__title'>Carrito</h3>
      {!cartProducts.length
        ? (
          <h1 className='slider__empty'>Carrito vacío</h1>
          )
        : (
          <>
            <div className='slider__listContainer'>
              {cartProducts.map((product) => (
                <SliderItem product={product} key={product.id} />
              ))}
            </div>
            <div className='total__container'>
              <h3>Total:</h3>
              <h4 className='total__price'> ${cartTotalPrice()}</h4>
            </div>
            <div className='slider__goToCartBtn--container'>
              <button to='/cart' onClick={handleOnClick} className='slider__goToCartBtn'>
                Ir al carrito
              </button>
            </div>
          </>
          )}
    </div>
  )
}

export default Slider
