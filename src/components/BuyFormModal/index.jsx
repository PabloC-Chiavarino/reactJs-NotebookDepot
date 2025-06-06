import { CheckoutForm } from '../../components'
import './styles.css'

const BuyFormModal = ({ data, show, handleOnClick, handleOnChange, handleSubmit }) => {
  return (
    <div
      className='buyformModal__container'
      style={{
        transform: show ? 'translateY(0)' : 'translateY(135%)',
        opacity: show ? 1 : 0,
        visibility: show ? 'visible' : 'hidden',
        transition: 'all 0.4s ease'
      }}
    >
      <div
        onClick={handleOnClick}
        className='buyFormModal__sliderDown'
        style={{ transform: show ? 'rotate(0deg)' : 'rotate(180deg)' }}
      >▼
      </div>
      <h6 className='buyForm__title'>Formulario de envío</h6>
      <CheckoutForm data={data} handleOnChange={handleOnChange} handleSubmit={handleSubmit} />
    </div>
  )
}

export default BuyFormModal
