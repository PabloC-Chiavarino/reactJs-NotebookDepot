import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useScroll } from '../../hooks'
import './styles.css'

const UserSignIn = ({ handleSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formRef = useRef()
  useScroll(formRef, 'element')

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const user = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    try {
      await handleSubmit(user.email, user.password)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='userSignIn__container'>
      <div>
        <h1>Hola !</h1>
      </div>
      <form
        ref={formRef}
        name='userSignIn'
        className='userSignIn__form-container'
        onSubmit={onSubmit}
        type='submit'
        method='post'
      >
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
        <div className='userSignIn__options-container'>
          <button type='submit' className='userSignIn__button'>
            {isSubmitting ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
          <div className='userSignIn__options-subcontainer'>
            <h4 style={{ fontWeight: 'normal' }}>Aún no tienes una cuenta ?</h4>
            <Link to='/account/SignUp'><b className='userSignIn__accountSet'>Registrate</b></Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserSignIn
