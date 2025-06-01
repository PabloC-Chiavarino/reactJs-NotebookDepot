import { useState, useRef } from 'react'
import { addDoc } from 'firebase/firestore'
import { mailConfirmErr } from '../../constants/utils'
import { useFirestore, useCartContext, useScroll } from '../../hooks'
import { MainBtn, BuyFormModal, OpacityDiv, CartList } from '../../components'
import { binBig } from '../../assets/icons'
import './styles.css'

const Cart = () => {
  const [formShow, setFormShow] = useState(false)
  const [formData, setFormData] = useState({})
  const [orderSent, setOrderSent] = useState(null)
  const { cartProducts, cartTotalProducts, cartEraseAll, cartTotalPrice } = useCartContext()
  const { data: orders } = useFirestore('orders')

  const ref = useRef()
  useScroll(ref, 'element')

  const handleOnClick = () => setFormShow(!formShow)

  const handleFormData = (event) => {
    setFormData(
      {
        ...formData,
        [event.target.name]: event.target.value
      }
    )
  }

  const handleOrderSubmit = (event) => {
    event.preventDefault()

    if (formData.email !== formData.emailOk) {
      mailConfirmErr()
    } else {
      const order = {
        buyer: {
          name: formData.name,
          lastName: formData.lastName,
          contact: formData.phone,
          address: formData.address,
          email: formData.email
        },
        products: cartProducts.map(({ id, name, quantity, price }) => (
          { id, name, quantity, price }
        )),
        total: cartTotalPrice()
      }
      addDoc(orders, order)
        .then(response => setOrderSent(response.id))
        .catch(err => console.log(err))
        .finally(() =>
          cartEraseAll()
        )
    }
  }

  return (
    <div ref={ref} className='cart__container'>
      <OpacityDiv show={formShow} handleOnClick={handleOnClick} />
      {orderSent != null
        ? (
          <div className='cart__orderInfo--container'>
            <div className='cart__orderInfo--subcontainer'>
              <h1 style={{ fontSize: '1.4rem', color: 'white' }}>Muchas gracias por su compra !</h1>
              <div className='cart__orderInfo--ID'>
                <h3>Orden de compra:</h3>
                <div style={{ color: 'red' }}>
                  {orderSent}
                </div>
              </div>
              <div className='cart__orderInfo--details'>
                <h3>Datos de envio:</h3>
                <h5>{formData.name}</h5>
                <h5>{formData.lastName}</h5>
                <h5>{formData.phone}</h5>
                <h5>{formData.address}</h5>
              </div>
            </div>
          </div>
          )
        : (
          <div className='cartProducts__container'>
            {!cartProducts.length
              ? (
                <h1 className='cart__empty'>No ha agregado productos aún</h1>
                )
              : (
                <>
                  <div className='cart__title--container'>
                    <h1 className='cart__title'>Carrito</h1>
                  </div>
                  <div className='cart__erase--container'>
                    <img onClick={cartEraseAll} className='cart__erase' src={binBig} alt='erase cart' />
                  </div>
                  <div className='cart__list--container'>
                    <CartList />
                  </div>
                </>
                )}
          </div>
          )}
      <div className='cart__total--container'>
        <h3>Cant. productos: {cartTotalProducts()}</h3>
        <h3>Subtotal: {cartTotalPrice()}</h3>
        <h3>Envío: {cartTotalProducts() >= 2 ? 'Gratis !' : '$' + 10000}</h3>
        <h2>Total: $ {cartTotalPrice()}</h2>
      </div>
      <div className='cart__checkoutBtn--container'>
        <button onClick={handleOnClick} className='cart__checkoutBtn' alt='Checkout'>
          Checkout
        </button>
      </div>
      <div className='navigate__options--container'>
        <MainBtn type='default' text='Ver más productos' />
        <MainBtn type='back' text='Volver' />
      </div>
      <BuyFormModal
        data={formData}
        show={formShow}
        handleOnClick={handleOnClick}
        handleOnChange={handleFormData}
        handleSubmit={handleOrderSubmit}
      />
    </div>
  )
}

export default Cart
