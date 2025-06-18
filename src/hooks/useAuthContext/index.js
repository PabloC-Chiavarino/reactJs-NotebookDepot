import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export const useAuthContext = () => useContext(AuthContext)

export default useAuthContext
