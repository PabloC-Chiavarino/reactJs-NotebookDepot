import { useState, useRef } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '../../constants/services/stripe'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { dataBase } from '../../constants/services/firebase'
import { generalErr, mailConfirmErr } from '../../constants/utils'
import { useAuthContext, useCartContext, useScroll } from '../../hooks'
import { MainBtn, BuyFormModal, OpacityDiv, CartList } from '../../components'
import { binBig } from '../../assets/icons'
import './styles.css'

const Cart = () => {
  const { user } = useAuthContext()
  const [formShow, setFormShow] = useState(false)
  const [formData, setFormData] = useState({})
  const [orderSent, setOrderSent] = useState(null)
  const [buyInfo, setBuyInfo] = useState({})
  const { cartProducts, cartTotalProducts, cartEraseAll, cartTotalPrice } = useCartContext()

  const ref = useRef()
  useScroll(ref, 'element')

  const handleOnClick = () => {
    setFormShow(!formShow)
  }

  const handleFormData = (event) => {
    setFormData(
      {
        ...formData,
        [event.target.name]: event.target.value
      }
    )
  }

  const handleOrderSubmit = async (paymentInfo) => {
    if (formData.email !== formData.emailOk) {
      mailConfirmErr()
      return
    }

    const order = {
      data: {
        userId: user.uid,
        name: formData.name,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        email: formData.email,
        payMethod: paymentInfo
      },
      products: cartProducts.map(({ id, name, quantity, price }) => (
        { id, name, quantity, price }
      )),
      paymentInfo,
      total: cartTotalPrice()
    }

    try {
      const orderDocRef = collection(dataBase, 'orders')
      const orderDoc = await addDoc(orderDocRef, order)
      setOrderSent(orderDoc.id)

      const userOrderRef = doc(dataBase, 'users', user.uid, 'orders', orderDoc.id)
      await setDoc(userOrderRef, order)

      setBuyInfo(order.data)
      cartEraseAll()
      setFormData({})
      setFormShow(false)
    } catch (err) {
      generalErr(err)
    }
  }

  return (
    <div ref={ref} className='cart__container'>
      <OpacityDiv show={formShow} handleOnClick={handleOnClick} />
      {orderSent != null
        ? (
          <div className='cart__orderInfo--container'>
            <h2 style={{ fontSize: '1.3rem', color: 'black' }}>Muchas gracias por su compra !</h2>
            <div className='cart__orderInfo--ID'>
              <h3>Orden de compra:</h3>
              <div style={{ color: 'red' }}>
                {orderSent}
              </div>
            </div>
            <div className='cart__orderInfo--details'>
              <h3>Datos de envio:</h3>
              <h4>Comprador: {buyInfo.name + ' ' + buyInfo.lastName}</h4>
              <h4>Teléfono: {buyInfo.phone}</h4>
              <h4>Domicilio de entrega: {buyInfo.address}</h4>
              <h4>Email de contacto: {buyInfo.email}</h4>
              {buyInfo.payMethod && (
                typeof buyInfo.payMethod.brand !== 'undefined'
                  ? (
                    <>
                      <h4>Método: Tarjeta ({buyInfo.payMethod.brand.toUpperCase()})</h4>
                      <h4>Terminada en **** {buyInfo.payMethod.last4}</h4>
                    </>
                    )
                  : (
                    <>
                      <h4>Método: Transferencia</h4>
                      <h4>Titular: {buyInfo.payMethod.accountHolder}</h4>
                      <h4>ID Transacción: {buyInfo.payMethod.transactionId}</h4>
                    </>
                    )
              )}
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
      {cartProducts.length
        ? (
          <>
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
          </>
          )
        : null}
      <div className='navigate__options--container'>
        <MainBtn type='default' text='Ver más productos' />
        <MainBtn type='back' text='Volver' />
      </div>
      <Elements stripe={stripePromise}>
        <BuyFormModal
          data={formData}
          show={formShow}
          handleOnClick={handleOnClick}
          handleOnChange={handleFormData}
          handleSubmit={handleOrderSubmit}
        />
      </Elements>
    </div>
  )
}

export default Cart
