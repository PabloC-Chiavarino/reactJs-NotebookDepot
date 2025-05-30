import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useScroll = (ref, type) => {
  const location = useLocation()
  useEffect(() => {
    if (type !== 'manual') {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    }
  }, [location.pathname])
}

export default useScroll
