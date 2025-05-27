import { useCartContext } from '../../hooks'
import { minusImg, binImg } from '../../assets/icons'
import './styles.css'

const SliderItem = ({ product }) => {
  const { cartErase, cartProductDeduct } = useCartContext()

  const { img, name, price, quantity } = product

  return (
    <div className='slider__item--container'>
      <img className='slider__item--img' src={img} alt='IMG_HERE' />
      <div>
        <h4 className='slider__item--name'>{name}</h4>
        <h6 className='slider__item--price'>$ {price * quantity}</h6>
        <h6 className='slider__item--quantity'>x{quantity}</h6>
      </div>
      <div className='slider__item--options'>
        <img
          onClick={() => cartProductDeduct(product)}
          style={{ display: quantity > 1 ? 'block' : 'none' }}
          className='slider__item--minus'
          src={minusImg} alt=''
        />
        <img onClick={() => cartErase(product)} className='slider__item--delete' src={binImg} alt='' />
      </div>
    </div>
  )
}

export default SliderItem
