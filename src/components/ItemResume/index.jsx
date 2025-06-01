import { Link } from 'react-router-dom'
import { useCartContext } from '../../hooks'
import { minusImg, clearImg } from '../../assets/icons'
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
        <span className='itemResume__quantity--container'>
          <h5 className='itemResume__quantity'>
            x{quantity}
          </h5>
          <div className='itemResume__options'>
            <img
              onClick={() => cartProductDeduct(product)}
              style={{ display: quantity > 1 ? 'block' : 'none' }}
              className='itemResume__options--minus'
              src={minusImg}
              alt='minus'
            />
            <img
              onClick={() => cartErase(product)}
              className='itemResume__options--delete'
              src={clearImg}
              alt='plus'
            />
          </div>
        </span>
        <h4 className='itemResume__price'>$ {price * quantity}</h4>
      </span>
    </span>
  )
}

export default ItemResume
