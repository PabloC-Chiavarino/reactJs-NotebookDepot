import { useEffect, useState } from 'react'
import { dataBase } from '../../constants/services/firebase'
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore'

const useFirestore = (requestType, options = {}) => {
  const { uid, categoryId, productId } = options

  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        let result

        if (requestType === 'user') {
          if (!uid) {
            throw new Error('Se necesita el UID para obtener el usuario')
          }

          const docRef = doc(dataBase, 'users', uid)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            result = { id: docSnap.id, ...docSnap.data() }
          } else {
            throw new Error('El usuario no existe')
          }
        } else if (requestType === 'orders') {
          if (!uid) throw new Error('Se necesita el UID para obtener las órdenes')
          const collectionRef = collection(dataBase, 'users', uid, 'orders')

          const snapshot = await getDocs(collectionRef)
          result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        } else if (requestType === 'products') {
          const collectionRef = collection(dataBase, 'products')
          const q = categoryId
            ? query(collectionRef, where('category', '==', categoryId))
            : query(collectionRef, where('outstanding', '==', true))

          const snapshot = await getDocs(q)
          result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        } else if (requestType === 'product') {
          if (!productId) {
            throw new Error('Se necesita productId para obtener el producto')
          }

          const docRef = doc(dataBase, 'products', productId)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            result = { id: docSnap.id, ...docSnap.data() }
          } else {
            throw new Error('El producto no existe')
          }
        } else {
          throw new Error(`Tipo de request inválido: ${requestType}`)
        }

        setData(result)
        setError('')
      } catch (err) {
        setError(err.message || 'Error al obtener datos')
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [requestType, uid, categoryId, productId])

  return { loading, data, error }
}

export default useFirestore
