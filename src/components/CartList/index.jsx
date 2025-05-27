import { useCartContext } from '../../hooks'
import { ItemResume } from '../../components'

const CartList = () => {
  const { cartProducts } = useCartContext()

  return (
    <>
      {cartProducts.map(product => (
        <ItemResume product={product} key={product.id} />
      ))}
    </>
  )
}

export default CartList
