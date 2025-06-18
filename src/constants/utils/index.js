import { toast } from 'react-toastify'
import { firebaseErrorMessages } from '../services/firebase'
import Swal from 'sweetalert2'

export const throwAddPopUp = () => {
  toast.success('Producto agregado al carrito', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark'
  })
}

export const throwAuthPopUp = (uemail) => {
  toast.success(`¡Bienvenido, ${uemail}!`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark'
  })
}

export const mailConfirmErr = () => {
  Swal.fire({
    icon: 'warning',
    title: 'Oops...',
    text: 'El email de confirmacion debe ser igual al ingresado'
  })
}

export const passConfirmErr = () => {
  Swal.fire({
    icon: 'warning',
    title: 'Oops...',
    text: 'El password no coincide'
  })
}

export const userSuccess = () => {
  Swal.fire({
    icon: 'success',
    title: 'Gracias por registrarte',
    text: 'Inicia sesión para continuar'
  })
}

export const paymentErr = (e) => {
  Swal.fire({
    icon: 'warning',
    title: 'Oops...',
    text: `${e}`
  })
}

export const generalErr = (err) => {
  console.log('Error capturado:', err)
  Swal.fire({
    icon: 'warning',
    title: 'Oops...',
    text: firebaseErrorMessages[err.code] || 'Ocurrió un error. Intentá nuevamente.'
  })
}

export const mustBeLogged = () => {
  Swal.fire({
    icon: 'warning',
    title: 'Oops...',
    text: 'Debés iniciar sesión para realizar la compra.'
  })
}
