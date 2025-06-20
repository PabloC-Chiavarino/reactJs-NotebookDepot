import { Navigate, useLocation } from 'react-router-dom'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { dataBase } from '../../constants/services/firebase'
import { useAuthContext } from '../../hooks'
import { UserSignUp, UserSignIn, Loader } from '../../components'
import './styles.css'
import { generalErr } from '../../constants/utils'

const Account = () => {
  const location = useLocation()
  const { signUp, signIn, user, loading } = useAuthContext()

  if (loading) {
    return <Loader greeting='Cargando' />
  }

  if (user) {
    return <Navigate to='/account/dashboard' replace />
  }

  const handleSignUp = async (email, password) => {
    try {
      const userCredential = await signUp(email, password)

      const uid = userCredential.user.uid
      const uemail = userCredential.user.email

      await setDoc(doc(dataBase, 'users', uid), {
        email: uemail,
        favs: [],
        createdAt: serverTimestamp()
      })
    } catch (err) {
      generalErr(err)
    }
  }

  const handleSignIn = async (email, password) => {
    try {
      await signIn(email, password)
    } catch (err) {
      generalErr(err)
    }
  }

  return (
    <div className='account__container'>
      {location.pathname.includes('signIn')
        ? <UserSignIn handleSubmit={handleSignIn} />
        : <UserSignUp handleSubmit={handleSignUp} />}
    </div>
  )
}

export default Account
