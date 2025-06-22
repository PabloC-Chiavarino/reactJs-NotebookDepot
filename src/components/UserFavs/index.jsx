import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFirestore, useAuthContext } from '../../hooks'
import { dataBase } from '../../constants/services/firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { generalErr, throwDeleteFavPopUp } from '../../constants/utils'
import { binBig } from '../../assets/icons'
import './styles.css'

const UserFavs = () => {
  const { user } = useAuthContext()
  const { data: favs, loading, error } = useFirestore('favs', { uid: user?.uid })
  const [localUserFavs, setLocalUserFavs] = useState([])

  useEffect(() => {
    if (!favs) return
    setLocalUserFavs(favs)
  }, [favs])

  if (loading) return <p>Cargando favoritos...</p>
  if (error) return <p>Error: {error}</p>
  if (!favs || favs.length === 0 || localUserFavs.length === 0) {
    return <strong><p style={{ fontSize: '1.25rem' }}>No has guardado favoritos.</p></strong>
  }

  const deleteFav = async (fav) => {
    try {
      const userFavRef = doc(dataBase, 'users', user.uid, 'favs', fav.id)
      await deleteDoc(userFavRef)
      setLocalUserFavs(localUserFavs.filter((f) => f.id !== fav.id))
      throwDeleteFavPopUp()
    } catch (err) {
      generalErr(err)
    }
  }

  return (
    <div>
      <h1>Favoritos</h1>
      {localUserFavs.map((fav) => (
        <div key={fav.id} className='userFavs__row-wrapper'>
          <Link
            to={`/categories/${fav.category}/product/detail/${fav.id}`}
            style={{ textDecoration: 'none', display: 'flex' }}
            className='userFavs__row'
          >
            <div className='userFavs__column'>
              <img src={fav.img} alt='' />
            </div>
            <div className='userFavs__column'>
              <h3><strong>{fav.name}</strong></h3>
            </div>
            <div className='userFavs__column'>
              <h3><strong>$ {fav.price}</strong></h3>
            </div>
          </Link>
          <div className='userFavs__bin'>
            <img
              src={binBig}
              alt=''
              className='userFavs__bin--img'
              onClick={(e) => {
                e.preventDefault()
                deleteFav(fav)
              }}
              title='Eliminar de favoritos'
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserFavs
