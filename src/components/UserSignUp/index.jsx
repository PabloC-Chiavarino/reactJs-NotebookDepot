import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useScroll } from '../../hooks'
import './styles.css'

const UserSignUp = ({ handleSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef()

  useScroll(formRef, 'element')

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const newUser = {
      email: e.target.email.value,
      password: e.target.password.value
    }

    await handleSubmit(newUser.email, newUser.password)
    setIsSubmitting(false)
  }

  return (
    <div
      className='userSignUp__container'
    >
      <div>
        <h1>Bienvenido !</h1>
      </div>
      <form
        ref={formRef}
        className='userSignUp__form-container'
        onSubmit={onSubmit}
        action='submit'
        method='post'
      >
        <label>Ingresar correo electrónico</label>
        <input
          className='userSignUp__input'
          type='email'
          name='email'
          required
        />
        <label>Ingresar contraseña</label>
        <input
          className='userSignUp__input'
          type='password'
          name='password'
          minLength={6}
          required
        />
        <label>Confirmación de contraseña</label>
        <input
          className='userSignUp__input'
          type='password'
          name='passwordConfirm'
          required
        />
        <div className='userSignUp__options-container'>
          <button className='userSignUp__button' type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
          <div className='userSignUp__options-subcontainer'>
            <h4 style={{ fontWeight: 'normal' }}>Ya tienes una cuenta ?</h4>
            <Link to='/account/signIn'><b className='userSignUp__accountSet'>Iniciar Sesión</b></Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserSignUp
