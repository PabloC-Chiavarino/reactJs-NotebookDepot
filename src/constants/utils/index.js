import { toast } from 'react-toastify'
import { firebaseErrorMessages } from '../services/firebase'
import Swal from 'sweetalert2'

export const throwAddPopUp = () => {
  toast.success('Producto agregado al carrito', {
    position: 'top-right',
    autoClose: 1750,
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
    autoClose: 1750,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark'
  })
}

export const throwAddFavPopUp = () => {
  toast.success('Producto agregado a favoritos', {
    position: 'top-right',
    autoClose: 1750,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark'
  })
}

export const throwDeleteFavPopUp = () => {
  toast.success('Producto eliminado de favoritos', {
    position: 'top-right',
    autoClose: 1750,
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
  return Swal.fire({
    icon: 'warning',
    title: 'Debés iniciar sesión',
    text: '¿Deseás hacerlo ahora?',
    showCancelButton: true,
    confirmButtonText: 'Sí, iniciar sesión',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  })
}

export const capitalizeStr = (string) => {
  if (!string) return
  return string.charAt(0).toUpperCase() + string.slice(1)
}
