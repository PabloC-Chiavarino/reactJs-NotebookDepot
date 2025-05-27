import { useRef } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const UserSignUp = ({ handleSubmit }) => {
  const formRef = useRef()

  return (
    <div
      className='userSignUp__container'
    >
      <div>
        <h1 style={{ letterSpacing: '1px', fontWeight: '500' }}>Bienvenido !</h1>
      </div>
      <form ref={formRef} className='userSignUp__form-container' onSubmit={handleSubmit}>
        <label>Ingresar correo electrónico</label>
        <input
          className='userSignUp__input'
          type='text'
          name='email'
        />
        <label>Ingresar contraseña</label>
        <input
          className='userSignUp__input'
          type='password'
          name='password'
          minLength={6}
          required
        />
        <label>Confirmación de contraseña</label>
        <input
          className='userSignUp__input'
          type='password'
          name='passwordConfirm'
          required
        />
        <div className='userSignUp__options-container'>
          <button className='userSignUp__button' type='submit'>Crear Cuenta</button>
          <div className='userSignUp__options-subcontainer'>
            <h4 style={{ fontWeight: 'normal' }}>Ya tienes una cuenta ?</h4>
            <Link to='/account/signIn'><b className='userSignUp__accountSet'>Iniciar Sesión</b></Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserSignUp
