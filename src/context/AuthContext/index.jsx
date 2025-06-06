import { createContext, useEffect, useState } from 'react'
import { auth } from '../../constants/services/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      }
    })

    return unsuscribe
  }, [])

  const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password)

  const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password)

  const signOutUser = () => signOut(auth)

  const values = {
    user,
    signUp,
    signIn,
    signOutUser
  }

  return (
    <AuthContext.Provider value={{ values }}>
      {children}
    </AuthContext.Provider>
  )
}
