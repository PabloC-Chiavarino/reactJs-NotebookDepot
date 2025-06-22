import { useFirestore, useAuthContext } from '../../hooks'
import './styles.css'

const UserOrders = () => {
  const { user } = useAuthContext()
  const { data: orders, loading, error } = useFirestore('orders', { uid: user?.uid })

  if (loading) return <p>Cargando órdenes...</p>
  if (error) return <p>Error: {error}</p>

  if (!orders || orders.length === 0) {
    return <p>No tienes órdenes.</p>
  }

  return (
    <div>
      <h1>Compras realizadas</h1>
      <ul className='userOrders__list'>
        {orders.map((order) => (
          <li key={order.id} className='userOrders__row'>
            <div className='userOrders__column'>
              <p><strong>Nombre:</strong> {order.data.name}</p>
              <p><strong>Apellido:</strong> {order.data.lastName}</p>
              <p><strong>Email:</strong> {order.data.email}</p>
              <p><strong>Teléfono:</strong> {order.data.phone}</p>
              <p><strong>Dirección:</strong> {order.data.address}</p>
            </div>
            <div className='userOrders__column'>
              <p><strong>Método de pago:</strong></p>
              <ul>
                <li><strong>ID transacción:</strong> {order.data.payMethod.transactionId}</li>
                <li><strong>Titular:</strong> {order.data.payMethod.accountHolder}</li>
              </ul>
              <p><strong>Total:</strong> ${order.total}</p>
            </div>
            <div className='userOrders__column'>
              <p><strong>Productos:</strong></p>
              <ul>
                {order.products.map((product) => (
                  <li key={product.id}>
                    {product.name} – Cantidad: {product.quantity} – Precio: ${product.price}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserOrders
