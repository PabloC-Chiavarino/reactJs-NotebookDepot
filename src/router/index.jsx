import { Routes, Route, Navigate } from 'react-router-dom'
import { Cart, NotFound404, Default, Detail, Account } from '../pages'
import { UserDashboard, UserOrders, UserFavs, UserData } from '../components'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Default />} />
      <Route path='/account/signUp' element={<Account />} />
      <Route path='/account/signIn' element={<Account />} />
      <Route path='/categories/:categoryId' element={<Default />} />
      <Route path='/categories/:categoryId/product/detail/:productId' element={<Detail />} />
      <Route path='/cart' element={<Cart />} />

      <Route path='/account/dashboard/*' element={<UserDashboard />}>
        <Route index element={<UserOrders />} />
        <Route path='orders' element={<UserOrders />} />
        <Route path='favs' element={<UserFavs />} />
        <Route path='data' element={<UserData />} />
      </Route>

      <Route path='/404' element={<NotFound404 />} />
      <Route path='*' element={<Navigate to='/404' />} />
    </Routes>
  )
}

export default Router
