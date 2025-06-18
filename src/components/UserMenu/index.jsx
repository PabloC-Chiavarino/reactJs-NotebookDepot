import { Link } from 'react-router-dom'
import { useAuthContext, useFirestore } from '../../hooks'
import { accountIcon, accountIconDisabled } from '../../assets/icons'
import './styles.css'

const UserMenu = ({ show, onClose }) => {
  const { user, signOutUser } = useAuthContext()
  const { data } = useFirestore('user', { uid: user?.uid, email: user?.email })

  return (
    <div
      className='userMenu__container'
      style={{ transform: show ? 'translate(0)' : 'translate(100%)' }}
    >
      <div className='userMenu__close' onClick={onClose}>
        X
      </div>
      <div className='userMenu__accountIcon--container'>
        {user
          ? (
            <img className='userMenu__accountIcon' src={accountIcon} alt='' />
            )
          : (
            <img
              className='userMenu__accountIcon'
              src={accountIconDisabled}
              alt=''
            />
            )}
      </div>
      {user && data
        ? (
          <h2 className='userMenu__info'>{data.email}</h2>
          )
        : (
          <h2 className='userMenu__info'>Aún no has iniciado sesión</h2>
          )}
      <div className='userMenu__options--container'>
        {user
          ? (
            <div className='userMenu__options--columnContainer'>
              <Link
                to='/account/dashboard'
                className='userMenu__button'
                onClick={onClose}
              >
                Mi cuenta
              </Link>
              <button className='userMenu__button' onClick={signOutUser}>
                Cerrar sesión
              </button>
            </div>
            )
          : (
            <>
              <Link
                to='/account/signIn'
                className='userMenu__button'
                onClick={onClose}
              >
                Iniciar Sesión
              </Link>
              <div className='userMenu__options--rowContainer'>
                <h4 style={{ fontWeight: 'normal' }}>
                  ¿Aún no tienes una cuenta?
                </h4>
                <Link onClick={onClose} to='/account/signUp'>
                  <b className='userMenu__accountSet'>Regístrate</b>
                </Link>
              </div>
            </>
            )}
      </div>
    </div>
  )
}

export default UserMenu
