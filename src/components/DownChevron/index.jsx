import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks'
import downChevron from '../../assets/icons/down-chevron.png'
import './styles.css'

const DownChevron = ({ scrollDirection }) => {
  const [display, setDisplay] = useState(false)
  const { loading } = useFirestore('products')

  useEffect(() => {
    if (!loading) {
      setDisplay(true)
    }
  }, [])

  useEffect(() => {
    if (scrollDirection === 'down' && display) {
      setDisplay(false)
    }
  }, [scrollDirection, display])

  return (
    <div
      className={`downChevron__container ${display ? 'fadeIn' : 'fadeOut'}`}
    >
      <img
        className='downChevron'
        src={downChevron}
        alt='downChevron'
      />
    </div>
  )
}

export default DownChevron
