import { Link } from 'react-router-dom'
import { useCartContext } from '../../hooks'
import { minusImg, clearImg } from '../../assets/icons'
import './styles.css'

const SliderItem = ({ product }) => {
  const { cartErase, cartProductDeduct } = useCartContext()

  const { img, name, price, quantity, category, id } = product

  return (
    <div className='slider__item--container'>
      <Link to={`/categories/${category}/product/detail/${id}`} className='slider__item--link'>
        <img className='slider__item--img' src={img} alt='IMG_HERE' />
        <div className='slider__item--info'>
          <h4 className='slider__item--name' title='Ir al producto'>{name}</h4>
          <h6 className='slider__item--price'>$ {price * quantity}</h6>
        </div>
      </Link>

      <div className='slider__item--options'>
        <h6 className='slider__item--quantity'>x{quantity}</h6>
        {quantity > 1 && (
          <img
            onClick={() => cartProductDeduct(product)}
            className='slider__item--minus'
            src={minusImg}
            alt='Restar'
          />
        )}
        <img
          onClick={() => cartErase(product)}
          className='slider__item--delete'
          src={clearImg}
          alt='Eliminar'
        />
      </div>
    </div>
  )
}

export default SliderItem
