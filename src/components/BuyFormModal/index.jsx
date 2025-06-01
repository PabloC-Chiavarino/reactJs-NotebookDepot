import './styles.css'

const BuyFormModal = ({ data, show, handleOnClick, handleOnChange, handleSubmit }) => {
  return (
    <div
      className='buyformModal__container'
      style={{ transform: show ? 'translateY(0)' : 'translateY(128%)' }}
    >
      <div
        onClick={handleOnClick}
        className='buyFormModal__sliderDown'
        style={{ transform: show ? 'rotate(0deg)' : 'rotate(180deg)' }}
      >▼
      </div>
      <h6 className='buyForm__title'>Formulario de envío</h6>
      <div className='buyFormModal__userData'>
        <form
          onSubmit={handleSubmit}
          className='buyForm'
          action='submit'
          name='customersInfo'
          method='post'
        >
          <label>Nombre</label>
          <input
            type='text'
            name='name'
            placeholder='John'
            onChange={handleOnChange}
            value={data.name || ''}
            required
          />
          <label>Apellido</label>
          <input
            type='text'
            name='lastName'
            placeholder='Wick'
            onChange={handleOnChange}
            value={data.lastName || ''}
            required
          />
          <label>Teléfono de contacto</label>
          <input
            type='text'
            name='phone'
            placeholder='01144444444'
            onChange={handleOnChange}
            value={data.phone || ''}
            required
          />
          <label>Dirección de envío</label>
          <input
            type='text'
            name='address'
            placeholder='a donde te lo enviamos?'
            onChange={handleOnChange}
            value={data.address || ''}
            required
          />
          <label>Email de contacto</label>
          <input
            type='email'
            name='email' placeholder='johnwick@..'
            onChange={handleOnChange}
            value={data.email || ''}
            required
          />
          <label>Email de confirmación</label>
          <input
            type='email'
            name='emailOk'
            placeholder='johnwick@..'
            onChange={handleOnChange}
            value={data.emailOk || ''}
            required
          />
          <div className='buyForm__submit--container'>
            <button className='buyForm__submit' type='submit'>Finalizar compra</button>
          </div>
        </form>
          <div className='buyForm__paymentData'>

          </div>
      </div>
    </div>
  )
}

export default BuyFormModal
