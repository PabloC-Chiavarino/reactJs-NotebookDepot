import { useLocation } from 'react-router-dom'
import { useAuthContext, useFirestore } from '../../hooks'
import { userIcon, userIconDisabled } from '../../assets/icons'
import './styles.css'

const UserWidget = ({ handleOnClick }) => {
  const location = useLocation()
  const { user } = useAuthContext()
  const { data } = useFirestore('user', { uid: user?.uid, email: user?.email })

  const disabledRoutes = ['/account/dashboard', '/account/signIn']
  const isClickDisabled = disabledRoutes.includes(location.pathname)

  const handleClick = isClickDisabled ? null : handleOnClick
  const icon = user ? userIcon : userIconDisabled

  return (
    <div className='userWidget__container'>
      {user && data && <span className='userWidget__email'>{data.email}</span>}
      <img src={icon} alt='' onClick={handleClick} />
    </div>
  )
}

export default UserWidget
