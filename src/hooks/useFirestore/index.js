import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dataBase } from '../../constants/services/firebase'
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore'

const useFirestore = (requestType) => {
  const { userId, categoryId, productId } = useParams()
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      let requested
      let queryFilter
      let data

      const request = async () => {
        try {
          if (requestType === 'users') {
            requested = collection(dataBase, 'users')
            setData(requested)
          }
          if (requestType === 'orders') {
            requested = collection(dataBase, 'orders')
            setData(requested)
          }
          if (requestType === 'products') {
            requested = collection(dataBase, 'products')
            !categoryId
              ? (
                  queryFilter = query(requested, where('outstanding', '==', true))
                )
              : (
                  queryFilter = query(requested, where('category', '==', categoryId))
                )
            data = await getDocs(queryFilter)
            setData(
              data.docs.map(obj => (
                {
                  id: obj.id,
                  ...obj.data()
                }
              )
              ))
          } else {
            requested = doc(dataBase, 'products', productId)
            data = await getDoc(requested)
            setData(
              {
                id: data.id,
                ...data.data()
              }
            )
          }
        } catch (err) {
          setError(err)
        } finally {
          setLoading(false)
        }
      }

      request()
    }, 1000)
  }, [categoryId])

  return { loading, data }
}

export default useFirestore
