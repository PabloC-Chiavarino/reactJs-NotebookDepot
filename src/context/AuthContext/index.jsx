import { createContext, useEffect, useState } from 'react'
import { auth } from '../../constants/services/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { Loader } from '../../components'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return unsuscribe
  }, [])

  useEffect(() => {
    if (user) {
      const timeout = setTimeout(() => {
        signOut(auth)
      }, 2 * 60 * 60 * 1000)

      return () => clearTimeout(timeout)
    }
  }, [user])

  const signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential
  }

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signOutUser = () => signOut(auth)

  const values = {
    loading,
    user,
    signUp,
    signIn,
    signOutUser
  }

  return (
    <AuthContext.Provider value={values}>
      {loading
        ? <Loader />
        : children}
    </AuthContext.Provider>
  )
}
