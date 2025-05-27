import './styles.css'

const BuyFormModal = ({ data, show, handleOnClick, handleOnChange, handleSubmit }) => {
  return (
    <div
      className='buyformModal__container'
      style={{ transform: show ? 'translateY(0)' : 'translateY(100%)' }}
    >
      <div
        onClick={handleOnClick}
        className='buyFormModal__sliderDown'
        style={{ transform: show ? 'rotate(0deg)' : 'rotate(180deg)' }}
      >▼
      </div>
      <h6 className='buyForm__title'>Formulario de envío</h6>

      <form
        onSubmit={handleSubmit}
        className='buyForm'
        action='submit'
        name='customersInfo'
        method='post'
      >
        <div className='buyForm__grid'>
          <span>
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
          </span>

          <span>
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
          </span>
          <div className='buyForm__submit--container'>
            <button className='buyForm__submit' type='submit'>Finalizar compra</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default BuyFormModal
