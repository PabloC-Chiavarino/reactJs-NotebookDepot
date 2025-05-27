import { useState } from 'react'

const useCounter = () => {
  const [quantity, setQuantity] = useState(1)

  const plus = (avaiableStock) => {
    if (quantity < avaiableStock) { setQuantity(quantity + 1) }
  }

  const minus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return { quantity, plus, minus }
}

export default useCounter
