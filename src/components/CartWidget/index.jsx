import { useCartContext } from '../../hooks'
import { cartImg } from '../../assets/icons/'
import './styles.css'

const CartWidget = ({ handleOnClick }) => {
  const { cartProducts, cartTotalProducts } = useCartContext()

  return (
    <>
      <div onClick={handleOnClick} className='cartContainer'>
        <div
          className='cartContainer__count'
          style={{ display: cartProducts.length ? 'block' : 'none' }}
        >
          {cartTotalProducts()}
        </div>
        <img className='cartContainer__img' src={cartImg} alt='' />
      </div>
    </>
  )
}

export default CartWidget
