import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getFirestore, collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore'


const useFirestore = ( requestType ) => {
    
    const { categoryId, productId } = useParams()
    const [ data, setData ] = useState([]);
    const [ error, setError ] = useState('-');
    const [ loading, setLoading ] = useState(false);
    
    console.log('Loading:',loading, 'Data Recieved:' ,data, 'Error:', error)
    
    useEffect( () => {       
        setLoading(true)
        
        setTimeout(() => {
            
            const dataBase = getFirestore()
            let requested;
            let queryFilter;
            let data;
            
            let request = async () => {
                try {
                    if (requestType === 'orders') {
                        requested = collection(dataBase, 'orders')
                        setData(requested)
                    }
                    if (requestType === 'collection') {
                        requested = collection(dataBase, 'products')
                        !categoryId ? (
                            queryFilter = query(requested, where('outstanding', '==', true))
                            ) : (
                            queryFilter = query(requested, where('category', '==', categoryId)) 
                        )       
                        data = await getDocs(queryFilter)
                        setData(
                            data.docs.map(obj => (
                                { id: obj.id,
                                     ...obj.data() }
                                )
                            ))
                    } else {
                        requested = doc(dataBase, 'products', productId)
                        data = await getDoc(requested)
                        setData(
                            { id: data.id, 
                            ...data.data() }
                            )
                        }

                } catch(err) {
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

    //Solo lo dejo temporal para que ud profe vea como lo hacia funcionar antes de firebase y pueda corregirme algo de ser necesario
    //esto obvio que vuela todo del proyecto! me lo guarde como un hook para futuro que reacciona 
    //con los url y endpoints que estan en /constants/services/api
    

    // const useDelayFetch = (URL) => {
    //     const [ data, setData ] = useState([]);
    //     const [ error, setError ] = useState('Listening');
    //     const [ loading, setLoading ] = useState(false);
        
    //     console.log('Loading:',loading, 'Data Recieved:' ,{data}, 'Error:', error)

    // useEffect( () => {
    //     setLoading(true)
    //     setTimeout(() => {
            
    //         let request = async () => {
    //             try {
    //                 let response = await fetch(URL)
    //                 console.log('Request: ', response)
    //                 let data = await response.json()
    //                 setData(data)
    //                 setLoading(false)
    //                 setError('no error')
    //             } catch (err) {
    //                 setError(err)
    //                 console.log(error)
    //             }
    //         }
    //         request()
    //     }, 1200)
    
    // }, [URL]);
    
    // return { loading, data }