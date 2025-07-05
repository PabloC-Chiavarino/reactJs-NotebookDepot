import { useEffect, useState } from 'react'
import { dataBase } from '../../constants/services/firebase'
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { useCartContext, useAuthContext } from '../../hooks'
import { ItemCount, MainBtn } from '../../components'
import { mustBeLogged, generalErr, capitalizeStr } from '../../constants/utils'
import { favImg, noFavImg } from '../../assets/icons'
import './styles.css'

const ItemDetail = ({ product, onAddPopUp, throwAddFavPopUp, throwDeleteFavPopUp }) => {
  const [isFav, setIsFav] = useState(false)
  const { cartAdd } = useCartContext()
  const { user } = useAuthContext()

  if (!product) return <p>Cargando producto...</p>

  const { img, name, detail, price, stock } = product

  useEffect(() => {
    const checkIfFav = async () => {
      if (user && product?.id) {
        try {
          const userFavRef = doc(dataBase, 'users', user.uid, 'favs', product.id)
          const docSnap = await getDoc(userFavRef)
          if (docSnap.exists()) {
            setIsFav(true)
          }
        } catch (err) {
          generalErr(err)
        }
      }

      if (!user) {
        setIsFav(false)
      }
    }

    checkIfFav()
  }, [user, product])

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
      <div className='detail__img--wrapper'>
        <img className='detail__img' src={img} alt='product' draggable={false} />
      </div>
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
      <div className='tech-specs__container'>
        <h3 className='tech-specs__title'>ESPECIFICACIONES TÉCNICAS</h3>
        <ul className='tech-specs__list'>
          <li className='tech-specs__item'>Marca: {capitalizeStr(product.brand)}</li>
          <li className='tech-specs__item'>Procesador: {capitalizeStr(product.processor)}</li>
          <li className='tech-specs__item'>RAM: {product.ram}</li>
          <li className='tech-specs__item'>Pantalla: {product.screensize}</li>
          <li className='tech-specs__item'>Almacenamiento: {product.storage}</li>
        </ul>
      </div>
    </div>
  )
}

export default ItemDetail
