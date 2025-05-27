import { useCounter } from '../../hooks'
import { minusImg, plusImg } from '../../assets/icons'
import './styles.css'

const ItemCount = ({ avaiableStock, onAdd }) => {
  const { quantity, plus, minus } = useCounter()

  return (
    <div className='card__buttons--container'>
      <div className='card__buttons--subContainer'>
        <img
          className='card__buttons--minus'
          src={minusImg}
          alt='-'
          onClick={minus}
        />
        <input
          className='card__input'
          type='text'
          readOnly='readonly'
          value={quantity}
        />
        <img
          className='card__buttons--plus'
          src={plusImg}
          alt='+'
          onClick={() => plus(avaiableStock)}
        />
      </div>
      <button
        className='addBtn'
        onClick={() => onAdd(quantity)}
      >Agregar producto
      </button>
    </div>
  )
}

export default ItemCount
