import { Link } from 'react-router-dom'
import { useCartContext } from '../../hooks'
import { minusImg, clearImg } from '../../assets/icons'
import './styles.css'
import { linkWithCredential } from 'firebase/auth'

const SliderItem = ({ product }) => {
  const { cartErase, cartProductDeduct } = useCartContext()

  const { img, name, price, quantity, category, id } = product

  return (
    <>
      <Link to={`/categories/${category}/product/detail/${id}`} style={{ textDecoration: 'none' }}>
        <div className='slider__item--container'>
          <img className='slider__item--img' src={img} alt='IMG_HERE' />
          <div className='slider__item--info'>
            <h4 className='slider__item--name' title='Ir al producto'>{name}</h4>
            <h6 className='slider__item--price'>$ {price * quantity}</h6>
          </div>
          <div className='slider__item--options'>
            <h6 className='slider__item--quantity'>x{quantity}</h6>
            <img
              onClick={() => cartProductDeduct(product)}
              style={{ display: quantity > 1 ? 'block' : 'none' }}
              className='slider__item--minus'
              src={minusImg} alt=''
            />
            <img onClick={() => cartErase(product)} className='slider__item--delete' src={clearImg} alt='' />
          </div>
        </div>
      </Link>
    </>
  )
}

export default SliderItem
