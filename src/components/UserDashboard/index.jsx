import { useEffect } from 'react'
import { Link, Outlet, Navigate } from 'react-router-dom'
import { useAuthContext, useFirestore } from '../../hooks'
import { ToastContainer } from 'react-toastify'
import { throwAuthPopUp } from '../../constants/utils'
import './styles.css'

const UserDashboard = () => {
  const { user, signOutUser } = useAuthContext()

  if (!user) {
    return <Navigate to='/account/signIn' replace />
  }

  const { data, loading } = useFirestore('user', { uid: user.uid, email: user.email })

  useEffect(() => {
    if (!loading && data?.email) {
      const toastShown = sessionStorage.getItem('hasShownToast')

      if (!toastShown) {
        throwAuthPopUp(data.email)
        sessionStorage.setItem('hasShownToast', 'true')
      }
    }
  }, [data, loading])

  return (
    <div className='userDashboard__container'>
      <main className='userDashboard__main'>
        <Outlet />
      </main>
      <aside className='userDashboard__sidebar'>
        <div className='userDashboard__options'>
          <h2>Panel de usuario</h2>
          <hr />
          <Link to='/account/dashboard/orders' className='userDashboard__btn'>Órdenes realizadas</Link>
          <Link to='/account/dashboard/favs' className='userDashboard__btn'>Favoritos</Link>
          <Link to='/account/dashboard/data' className='userDashboard__btn'>Datos de usuario</Link>
        </div>
        <button
          className='userDashboard__signOutBtn'
          onClick={() => {
            sessionStorage.removeItem('hasShownToast')
            signOutUser()
          }}
        >Cerrar sesión
        </button>
      </aside>
      <ToastContainer />
    </div>
  )
}

export default UserDashboard
