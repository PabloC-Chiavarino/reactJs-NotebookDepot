import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useScroll } from '../../hooks'
import useFirestore from '../../hooks/useFirestore'
import './styles.css'

const UserSignIn = () => {
  const accounts = useFirestore('users')
  console.log(accounts) // debuggin

  const formRef = useRef()
  useScroll(formRef, 'element')

  return (
    <div
      className='userSignIn__container'
    >
      <div>
        <h1>Hola !</h1>
      </div>
      <form ref={formRef} className='userSignIn__form-container'>
        <label>Ingresar correo electrónico</label>
        <input
          className='userSignIn__input'
          type='text'
          name='email'
        />
        <label>Ingresar contraseña</label>
        <input
          className='userSignIn__input'
          type='password'
          name='password'
        />
      </form>
      <div className='userSignIn__options-container'>
        <button className='userSignIn__button'>Iniciar Sesión</button>
        <div className='userSignIn__options-subcontainer'>
          <h4 style={{ fontWeight: 'normal' }}>Aún no tienes una cuenta ?</h4>
          <Link to='/account/SignUp'><b className='userSignIn__accountSet'>Registrate</b></Link>
        </div>
      </div>
    </div>
  )
}

export default UserSignIn
