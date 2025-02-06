import { Link } from 'react-router-dom'
import useFirestore from '../../hooks/useFirestore'
import './styles.css'

const UserSignIn = () => {
  const accounts = useFirestore('users')
  console.log(accounts)

  return (
    <div
      className='userSignIn__container'
    >
      <div>
        <h2 style={{ letterSpacing: '1px' }}>Hola !</h2>
      </div>
      <div className='userSignIn__form-container'>
        <label>Ingresar correo electrónico</label>
        <input
          className='userSignIn__input'
          type='text'
        />
        <label>Ingresar contraseña</label>
        <input
          className='userSignIn__input'
          type='password'
        />
      </div>
      <div className='userMenu__options-container'>
        <button className='userMenu__button'>Iniciar Sesión</button>
        <div className='userMenu__options-subcontainer'>
          <h4 style={{ fontWeight: 'normal' }}>Aún no tienes una cuenta ?</h4><Link to='/account/SignUp'><b className='userMenu__accountSet'>Registrate</b></Link>
        </div>
      </div>
    </div>
  )
}

export default UserSignIn
