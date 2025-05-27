import { useState, useEffect } from 'react'

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('null')

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollDirection = () => {
      const scrollY = window.scrollY

      const direction = scrollY > lastScrollY ? 'down' : 'up'

      if (direction !== scrollDirection) {
        setScrollDirection(direction)
      }
      lastScrollY = window.scrollY
    }

    window.addEventListener('scroll', updateScrollDirection)

    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [])

  return scrollDirection
}

export default useScrollDirection
