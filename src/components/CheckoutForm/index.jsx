import { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { paymentErr } from '../../constants/utils'
import './styles.css'

const CheckoutForm = ({ data, handleOnChange, handleSubmit }) => {
  const [paymentOption, setPaymentOption] = useState('card')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const handlePaymentOption = (e) => {
    setPaymentOption(e.target.value)
  }
  const onSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitting(true)

    if (paymentOption === 'card') {
      const cardElement = elements.getElement(CardElement)

      if (!cardElement) {
        paymentErr('No se pudo cargar el formulario de pago.')
        return
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      })

      if (error) {
        paymentErr(error.message)
        setIsSubmitting(false)
        return
      }

      const paymentInfo = {
        id: paymentMethod.id,
        brand: paymentMethod.card.brand,
        last4: paymentMethod.card.last4,
        type: paymentMethod.type
      }

      await handleSubmit(paymentInfo)
    } else if (paymentOption === 'bank') {
      const paymentInfo = {
        accountHolder: data.accountHolder,
        transactionId: data.transactionId
      }

      await handleSubmit(paymentInfo)

      setIsSubmitting(false)
    }
  }

  const elementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#000',
        fontFamily: '"wix madefor display", sans-serif',
        '::placeholder': {
          color: '#999'
        }
      },
      invalid: {
        color: 'red'
      }
    }
  }

  return (
    <div className='checkoutForm__container'>
      <form
        onSubmit={onSubmit}
        className='checkoutForm'
        action='submit'
        name='customersInfo'
        method='post'
      >
        <div className='checkoutForm__userData'>
          <div className='checkoutForm__fieldRow'>
            <label>Nombre</label>
            <input
              type='text'
              name='name'
              placeholder='John'
              onChange={handleOnChange}
              value={data.name || ''}
              required
            />
          </div>
          <div className='checkoutForm__fieldRow'>
            <label>Apellido</label>
            <input
              type='text'
              name='lastName'
              placeholder='Wick'
              onChange={handleOnChange}
              value={data.lastName || ''}
              required
            />
          </div>
          <div className='checkoutForm__fieldRow'>
            <label>Teléfono de contacto</label>
            <input
              type='number'
              name='phone'
              placeholder='01144444444'
              onChange={handleOnChange}
              value={data.phone || ''}
              required
            />
          </div>
          <div className='checkoutForm__fieldRow'>
            <label>Dirección de envío</label>
            <input
              type='text'
              name='address'
              placeholder='a donde te lo enviamos?'
              onChange={handleOnChange}
              value={data.address || ''}
              required
            />
          </div>
          <div className='checkoutForm__fieldRow'>
            <label>Email de contacto</label>
            <input
              type='email'
              name='email'
              placeholder='johnwick@..'
              onChange={handleOnChange}
              value={data.email || ''}
              required
            />
          </div>
          <div className='checkoutForm__fieldRow'>
            <label>Email de confirmación</label>
            <input
              type='email'
              name='emailOk'
              placeholder='johnwick@..'
              onChange={handleOnChange}
              value={data.emailOk || ''}
              required
            />
          </div>
        </div>

        <div className='checkoutForm__paymentData'>
          <div className='checkoutForm__fieldRow'>
            <label>Método de pago</label>
            <select onChange={handlePaymentOption} value={paymentOption}>
              <option value='card'>Tarjeta de crédito/débito</option>
              <option value='bank'>Transferencia bancaria</option>
            </select>
          </div>
          {paymentOption === 'card' && (
            <div className='checkoutForm__cardData'>
              <div className='checkoutForm__fieldRow'>
                <label>Datos de la tarjeta</label>
                <CardElement options={elementOptions} />
              </div>
            </div>
          )}
          {paymentOption === 'bank' && (
            <div className='checkoutForm__bankData'>
              <div className='checkoutForm__fieldRow'>
                <p>
                  Transferí al siguiente alias:
                </p>
                <p>
                  <strong>mi.tienda.mp</strong> (Mercado Pago)
                </p>
              </div>
              <div className='checkoutForm__fieldRow'>
                <label>Nombre del titular</label>
                <input
                  type='text'
                  name='accountHolder'
                  onChange={handleOnChange}
                  value={data.accountHolder || ''}
                  required
                />
              </div>
              <div className='checkoutForm__fieldRow'>
                <label>Número de comprobante</label>
                <input
                  type='number'
                  name='transactionId'
                  value={data.transactionId || ''}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className='checkoutForm__submit'>
          <button
            className='checkoutForm__submit--btn'
            type='submit'
            disabled={!stripe || isSubmitting}
          >
            {isSubmitting ? 'Procesando...' : 'Finalizar compra'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm
