import { Routes, Route, Navigate } from 'react-router-dom'
import { Cart, NotFound404, Default, Detail, Account } from '../pages'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Default />} />
      <Route path='/account/signUp' element={<Account />} />
      <Route path='/account/signIn' element={<Account />} />
      <Route path='/categories/:categoryId' element={<Default />} />
      <Route path='/categories/:categoryId/product/detail/:productId' element={<Detail />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/404' element={<NotFound404 />} />
      <Route path='*' element={<Navigate to='/404' />} />
    </Routes>
  )
}

export default Router
