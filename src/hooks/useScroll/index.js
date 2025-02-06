import { useEffect } from 'react'

const useScroll = (ref, type) => {
  useEffect(() => {
    type === 'top'
      ? window.scrollTo(0, 0)
      : ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }
  )
}

export default useScroll
