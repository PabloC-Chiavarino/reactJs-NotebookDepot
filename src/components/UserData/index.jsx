import { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { dataBase } from '../../constants/services/firebase'
import { useAuthContext, useFirestore } from '../../hooks'
import { generalErr, mailConfirmErr } from '../../constants/utils'
import './styles.css'

const UserData = () => {
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuthContext()
  const { data: userData, loading, error } = useFirestore('user', { uid: user?.uid })

  if (loading) return <p>Loading...</p>

  if (error) {
    generalErr(error)
    return
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (formData.email !== formData.emailConfirm) {
      mailConfirmErr()
      return
    }
    setIsSubmitting(true)

    const docRef = doc(dataBase, 'users', user.uid)
    try {
      await setDoc(docRef, {
        ...userData,
        ...formData
      })
    } catch (err) {
      generalErr(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <div>
        <h1>UserData</h1>
      </div>
      <div className='userDataForm__container'>
        <form className='userDataForm' onSubmit={onSubmit}>
          <div className='userDataForm__userData'>
            <div className='userDataForm__column'>
              <div className='userDataForm__fieldRow'>
                <label htmlFor='name'>Nombre</label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  onChange={handleFormData}
                  value={formData.name || userData.name}
                  required
                />
              </div>
              <div className='userDataForm__fieldRow'>
                <label htmlFor='lastname'>Apellido</label>
                <input
                  id='lastname'
                  name='lastname'
                  type='text'
                  onChange={handleFormData}
                  value={formData.lastname || userData.lastname}
                  required
                />
              </div>
              <div className='userDataForm__fieldRow'>
                <label htmlFor='phone'>Teléfono</label>
                <input
                  id='phone'
                  name='phone'
                  type='tel'
                  onChange={handleFormData}
                  value={formData.phone || userData.phone}
                  required
                />
              </div>
              <div className='userDataForm__fieldRow'>
                <label htmlFor='city'>Ciudad</label>
                <input
                  id='city'
                  name='city'
                  type='text'
                  onChange={handleFormData}
                  value={formData.city || userData.city}
                  required
                />
              </div>
              <div className='userDataForm__fieldRow'>
                <label htmlFor='city'>Dirección de entrega</label>
                <input
                  id='address'
                  name='address'
                  type='text'
                  onChange={handleFormData}
                  value={formData.address || userData.address}
                  required
                />
              </div>
            </div>

            <div className='userDataForm__column'>
              <div className='userDataForm__fieldRow'>
                <label htmlFor='email'>Email</label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  onChange={handleFormData}
                  value={formData.email || userData.email}
                  required
                />
              </div>
              <div className='userDataForm__fieldRow'>
                <label htmlFor='emailConfirm'>Confirmar Email</label>
                <input
                  id='emailConfirm'
                  name='emailConfirm'
                  type='email'
                  onChange={handleFormData}
                  value={formData.emailConfirm || userData.emailConfirm}
                  required
                />
              </div>
            </div>
          </div>

          <div className='userDataForm__submit'>
            <button
              className='userDataForm__submit--btn'
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default UserData
