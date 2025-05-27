import { Link } from 'react-router-dom'
import { accountIcon } from '../../assets/icons'
import './styles.css'

const UserMenu = ({ show, onClose }) => {
  return (
    <div
      className='userMenu__container'
      style={{ transform: show ? 'translate(0)' : 'translate(100%)' }}
    >
      <div className='userMenu__close' onClick={onClose}>X</div>
      <div className='userMenu__accountIcon--container'>
        <img className='userMenu__accountIcon' src={accountIcon} alt='' />
      </div>
      <h2 className='userMenu__info'>Aún no has iniciado sesión</h2>
      <div className='userMenu__options--container'>
        <Link to='/account/signIn' className='userMenu__button' onClick={onClose}>Iniciar Sesión</Link>
        <div className='userMenu__options--subcontainer'>
          <h4 style={{ fontWeight: 'normal' }}>Aún no tienes una cuenta?</h4><Link onClick={onClose} to='/account/signUp'><b className='userMenu__accountSet'>Regístrate</b></Link>
        </div>
      </div>
    </div>
  )
}

export default UserMenu
