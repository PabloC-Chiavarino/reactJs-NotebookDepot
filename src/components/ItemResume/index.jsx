import { Link } from 'react-router-dom'
import { useCartContext } from '../../hooks'
import { minusImg, binImg } from '../../assets/icons'
import './styles.css'

const ItemResume = ({ product }) => {
  const { id, img, category, name, quantity, price } = product

  const { cartErase, cartProductDeduct } = useCartContext()

  return (
    <span className='itemResume__container' key={id}>
      <img className='itemResume__img' src={img} alt='IMG_HERE' />
      <Link to={`/categories/${category}/product/detail/${id}`} style={{ textDecoration: 'none' }}>
        <span className='itemResume__goTo'>
          <h6 style={{ fontWeight: 'unset' }}>Ir al producto</h6>
        </span>
      </Link>
      <span className='itemResume__subContainer'>
        <h4 className='itemResume__name'>{name}</h4>
        <span className='itemResume__options--container'>
          <h6 className='itemResume__quantity'>x{quantity}</h6>
          <img
            onClick={() => cartProductDeduct(product)}
            style={{ display: quantity > 1 ? 'block' : 'none' }}
            className='itemResume__product--minus'
            src={minusImg} alt='minus'
          />
          <img onClick={() => cartErase(product)} className='itemResume__product--delete' src={binImg} alt='plus' />
        </span>
        <h4 className='itemResume__price'>$ {price * quantity}</h4>
      </span>
    </span>
  )
}

export default ItemResume
