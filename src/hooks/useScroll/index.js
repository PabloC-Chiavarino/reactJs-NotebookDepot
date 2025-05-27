import { useEffect } from 'react'

const useScroll = (ref, type) => {
  useEffect(() => {
    if (type !== 'manual') {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
    }
  }
  )
}

export default useScroll
