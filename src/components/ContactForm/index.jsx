import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import './styles.css'

const ContactForm = () => {
  const formRef = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm('ND_contact', 'contact', formRef.current, 'hesIfng0YOyoZM2dr')
      .then((msgBody) => {
        console.log(msgBody)
        formRef.current.reset()
      }
      )
      .catch((err) => console.log(err))
  }

  return (
    <div className='contactForm__container'>
      <form className='contactForm' ref={formRef} onSubmit={sendEmail}>
        <h2 className='contactForm__title'>Necesitás ascesoramiento?</h2>
        <h3 className='contactForm__title'>Dejanos tu consulta y te responderemos a la brevedad !</h3>
        <label className='contactForm__label'>Nombre</label>
        <input className='contactForm__input' type='text' name='user_name' required />
        <label className='contactForm__label'>Email</label>
        <input className='contactForm__input' type='email' name='user_email' required />
        <label className='contactForm__label'>Mensaje</label>
        <textarea className='contactForm__msg' name='message' minLength='20' cols='40' rows='6' placeholder='Tu mensaje aquí' required />
        <input className='contactForm__submit' type='submit' value='Enviar' />
      </form>
    </div>
  )
}

export default ContactForm
