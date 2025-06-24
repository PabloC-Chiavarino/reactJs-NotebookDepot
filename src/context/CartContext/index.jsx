import { createContext, useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks'
import { dataBase } from '../../constants/services/firebase'
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore'
import { generalErr } from '../../constants/utils'

export const CartContext = createContext([])

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])
  const [cartLoaded, setCartLoaded] = useState(false)
  const { user } = useAuthContext()

  const getLocalKey = () => user ? `cart_${user.uid}` : 'cart_guest'

  useEffect(() => {
    const loadCart = async () => {
      const localKey = getLocalKey()
      const localStr = localStorage.getItem(localKey)
      const localCart = localStr ? JSON.parse(localStr) : []

      if (user) {
        try {
          const cartRef = collection(dataBase, 'users', user.uid, 'cart')
          const remoteSnap = await getDocs(cartRef)
          const remoteCart = remoteSnap.docs.map(doc => doc.data())

          const merged = [...remoteCart]
          localCart.forEach(localProduct => {
            const index = merged.findIndex(p => p.id === localProduct.id)
            if (index === -1) merged.push(localProduct)
            else merged[index].quantity += localProduct.quantity
          })

          if (merged.length > 0) {
            const deletions = remoteSnap.docs.map(d => deleteDoc(d.ref))
            await Promise.all(deletions)

            await Promise.all(
              merged.map(product =>
                setDoc(doc(cartRef, product.id), product)
              )
            )

            setCartProducts(merged)
            localStorage.removeItem('cart_guest')
          }
        } catch (err) {
          generalErr(err)
        }
      } else {
        setCartProducts(localCart)
      }

      setCartLoaded(true)
    }

    loadCart()
  }, [user])

  useEffect(() => {
    const saveCart = async () => {
      const localKey = getLocalKey()

      if (user) {
        try {
          const cartRef = collection(dataBase, 'users', user.uid, 'cart')
          const existingDocs = await getDocs(cartRef)

          const deletions = existingDocs.docs.map(d => deleteDoc(d.ref))
          await Promise.all(deletions)

          await Promise.all(
            cartProducts.map(product =>
              setDoc(doc(cartRef, product.id), product)
            )
          )
        } catch (err) {
          generalErr(err)
        }
      } else {
        localStorage.setItem(localKey, JSON.stringify(cartProducts))
      }
    }

    if (cartLoaded) {
      saveCart()
    }
  }, [cartProducts, user, cartLoaded])

  const cartAdd = (product) => {
    const index = cartProducts.findIndex(p => p.id === product.id)
    if (index === -1) {
      setCartProducts([...cartProducts, product])
    } else {
      const updated = [...cartProducts]
      updated[index].quantity += product.quantity
      setCartProducts(updated)
    }
  }

  const cartErase = (product) => {
    setCartProducts(cartProducts.filter(p => p.id !== product.id))
  }

  const cartEraseAll = () => setCartProducts([])

  const cartProductDeduct = (product) => {
    const index = cartProducts.findIndex(p => p.id === product.id)
    if (index !== -1) {
      const updated = [...cartProducts]
      updated[index].quantity -= 1
      if (updated[index].quantity <= 0) {
        updated.splice(index, 1)
      }
      setCartProducts(updated)
    }
  }

  const cartTotalPrice = () =>
    cartProducts.reduce((total, p) => total + p.price * p.quantity, 0)

  const cartTotalProducts = () =>
    cartProducts.reduce((total, p) => total + p.quantity, 0)

  const values = {
    cartProducts,
    cartAdd,
    cartErase,
    cartEraseAll,
    cartProductDeduct,
    cartTotalProducts,
    cartTotalPrice
  }

  return (
    <CartContext.Provider value={values}>
      {children}
    </CartContext.Provider>
  )
}
