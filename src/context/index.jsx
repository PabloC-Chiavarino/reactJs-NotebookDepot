import { createContext, useState } from 'react'

export const CartContext = createContext([])

const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])

  const cartAdd = (product) => {
    const sameId = (inCartProduct) => inCartProduct.id == product.id
    const indexProduct = cartProducts.findIndex(sameId)

    if (indexProduct === -1) {
      setCartProducts(
        [...cartProducts, product]
      )
    } else {
      cartProducts[indexProduct].quantity += product.quantity
      setCartProducts([...cartProducts])
    }
  }

  const cartTotalPrice = () => {
    return cartProducts.reduce((totalPrice, product) => totalPrice += (product.price * product.quantity), 0)
  }

  const cartTotalProducts = () => {
    return cartProducts.reduce((totalQuantity, product) => totalQuantity += product.quantity, 0)
  }

  const cartEraseAll = () => setCartProducts([])

  const cartErase = (product) => {
    setCartProducts(cartProducts.filter(inCartProduct => inCartProduct.id != product.id))
  }

  const cartProductDeduct = (product) => {
    const sameId = (inCartProduct) => inCartProduct.id == product.id
    const indexProduct = cartProducts.findIndex(sameId)

    cartProducts[indexProduct].quantity -= 1
    setCartProducts([...cartProducts])
  }

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

export default CartProvider
