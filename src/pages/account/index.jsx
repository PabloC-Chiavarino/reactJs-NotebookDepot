import { useLocation } from 'react-router-dom'
import { UserSignUp, UserSignIn } from '../../components'
import './styles.css'

const Account = () => {
  const location = useLocation()

  return (
    <div className='account__container'>
      {location.pathname.includes('signIn') ? <UserSignIn /> : <UserSignUp />}
    </div>
  )
}

export default Account
