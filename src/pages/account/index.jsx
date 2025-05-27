import { useLocation } from 'react-router-dom'
import { auth, createUser } from '../../constants/services/firebase'
import { UserSignUp, UserSignIn } from '../../components'
import { passConfirmErr, userSuccess } from '../../constants/utils'
import './styles.css'

const Account = () => {
  const location = useLocation()

  const createAccount = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const passwordConfirm = e.target.passwordConfirm.value

    password !== passwordConfirm
      ? passConfirmErr()
      : await createUser(auth, email, password)
    userSuccess()
    e.target.reset()
  }

  return (
    <div className='account__container'>
      {location.pathname.includes('signIn') ? <UserSignIn /> : <UserSignUp handleSubmit={createAccount} />}
    </div>
  )
}

export default Account
