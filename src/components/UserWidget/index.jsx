import { useLocation } from 'react-router-dom'
import { useAuthContext, useFirestore } from '../../hooks'
import { userIcon, userIconDisabled } from '../../assets/icons'
import './styles.css'

const UserWidget = ({ handleOnClick }) => {
  const location = useLocation()
  const { user } = useAuthContext()
  const { data } = useFirestore('user', { uid: user?.uid, email: user?.email })

  return (
    <div className='userWidget__container'>
      {user && data && <span className='userWidget__email'>{data.email}</span>}
      {user ? <img src={userIcon} alt='' onClick={location.pathname === '/account/dashboard' ? null : handleOnClick} /> : <img src={userIconDisabled} alt='' onClick={location.pathname === '/account/dashboard' ? null : handleOnClick} />}
    </div>
  )
}

export default UserWidget
