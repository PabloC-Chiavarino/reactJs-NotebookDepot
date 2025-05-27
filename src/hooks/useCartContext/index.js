import { useContext } from 'react'
import { CartContext } from '../../context'

const useCartContext = () => useContext(CartContext)

export default useCartContext
