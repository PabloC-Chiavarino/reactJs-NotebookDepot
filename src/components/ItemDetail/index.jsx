import { useCartContext } from '../../hooks'
import { ItemCount, MainBtn } from '../../components'
import './styles.css'

const ItemDetail = ({ product, onAddPopUp }) => {
  const { img, name, detail, price, stock } = product

  const { cartAdd } = useCartContext()

  const handleOnAdd = (quantity) => {
    cartAdd({ ...product, quantity })
    onAddPopUp()
  }

  return (
    <>
      <div className='detail__container'>
        <img className='detail__img' src={img} alt='TEST' />
        <h2 className='detail__name'>{name}</h2>
        <div className='detail__description--container'>
          <p className='detail__description'>{detail}</p>
        </div>
        <div className='detail__price--container'>
          <p className='detail__price'>${price}</p>
        </div>
        <div className='detail__stock--container'>
          <p className='detail__stock'>{stock} in stock</p>
        </div>
        <ItemCount avaiableStock={stock} onAdd={handleOnAdd} />
        <div className='detail__mainBtn--container'>
          <MainBtn text='Volver' />
        </div>
      </div>
    </>
  )
}

export default ItemDetail
