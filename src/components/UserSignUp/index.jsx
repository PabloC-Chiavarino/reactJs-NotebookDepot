import { useRef } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const UserSignUp = ({ handleSubmit }) => {
  const formRef = useRef()

  return (
    <div
      className='userReg__container'
    >
      <div>
        <h2 style={{ letterSpacing: '1px', fontSize: '1.9rem' }}>Bienvenido !</h2>
      </div>
      <form ref={formRef} className='userReg__form-container' onSubmit={handleSubmit}>
        <label style={{ padding: '5px' }}>Ingresar correo electrónico</label>
        <input
          className='userReg__input'
          type='text'
          name='email'
        />
        <label style={{ padding: '5px' }}>Ingresar contraseña de 6 a 9 dígitos</label>
        <input
          className='userReg__input'
          type='password'
          name='password'
        />
        <label style={{ padding: '5px' }}>Confirmación de contraseña</label>
        <input
          className='userReg__input'
          type='password'
          name='passwordConfirm'
        />
        <div className='userMenu__options-container'>
          <button className='userMenu__button' type='submit'>Crear Cuenta</button>
          <div className='userMenu__options-subcontainer'>
            <h4 style={{ fontWeight: 'normal' }}>Ya tienes una cuenta ?</h4>
            <Link to='/account/signIn'><b className='userMenu__accountSet'>Iniciar Sesión</b></Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserSignUp
