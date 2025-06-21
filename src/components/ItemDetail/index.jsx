import { useState } from 'react'
import { dataBase } from '../../constants/services/firebase'
import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import { useCartContext, useAuthContext } from '../../hooks'
import { ItemCount, MainBtn } from '../../components'
import { mustBeLogged, generalErr } from '../../constants/utils'
import { favImg, noFavImg } from '../../assets/icons'
import './styles.css'

const ItemDetail = ({ product, onAddPopUp, throwAddFavPopUp, throwDeleteFavPopUp }) => {
  const [isFav, setIsFav] = useState(false)
  const { img, name, detail, price, stock } = product
  const { cartAdd } = useCartContext()
  const { user } = useAuthContext()

  const fav = {
    id: product.id,
    name: product.name,
    price: product.price,
    img: product.img
  }

  const toggleFavorite = () => setIsFav(prev => !prev)
  const addFav = async () => {
    try {
      const userFavRef = doc(dataBase, 'users', user.uid, 'favs', fav.id)
      await setDoc(userFavRef, fav)
    } catch (err) {
      generalErr(err)
    }
  }

  const deleteFav = async () => {
    try {
      const userFavRef = doc(dataBase, 'users', user.uid, 'favs', fav.id)
      await deleteDoc(userFavRef)
    } catch (err) {
      generalErr(err)
    }
  }

  const handleOnClick = () => {
    if (!user) {
      mustBeLogged('guardar tus productos favoritos')
      return
    }

    if (user && !isFav) {
      addFav()
      toggleFavorite()
      throwAddFavPopUp()
    } else {
      deleteFav()
      toggleFavorite()
      throwDeleteFavPopUp()
    }
  }

  const handleOnAdd = (quantity) => {
    cartAdd({ ...product, quantity })
    onAddPopUp()
  }

  return (
    <div className='detail__container'>
      <img className='detail__img' src={img} alt='product' draggable={false} />
      <div className='detail__container--info'>
        <h2 className='detail__name'>{name}</h2>
        <div className='detail__description--container'>
          <p className='detail__description'>{detail}</p>
        </div>
        <div className='detail__price--container'>
          <p className='detail__price'>${price}</p>
        </div>
        <div className='detail__stock--container'>
          <p className='detail__stock'>{stock} in stock</p>
        </div>
      </div>
      <button
        className='heart-btn'
        onClick={handleOnClick}
        aria-label='Agregar a favoritos'
      >
        <img className='heart-img' src={isFav ? favImg : noFavImg} alt='' draggable={false} />
      </button>
      <ItemCount avaiableStock={stock} onAdd={handleOnAdd} />
      <div className='detail__mainBtn--container'>
        <MainBtn text='Volver' />
      </div>
    </div>
  )
}

export default ItemDetail
