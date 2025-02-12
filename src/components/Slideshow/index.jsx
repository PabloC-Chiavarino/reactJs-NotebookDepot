import { useEffect, useState } from 'react'
import { mainVivoBook, mainKatana, mainArtBook16 } from '../../assets/imgs'
import './styles.css'

const Slideshow = () => {
  const [intervalIndex, setIntervalIndex] = useState(0)

  const images = [mainKatana, mainVivoBook, mainArtBook16]
  const intervalTime = 4250

  useEffect(() => {
    const interval = setInterval(() => {
      setIntervalIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, intervalTime)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='slideshow__container'>
      <div className='slideshow__collection'>
        {images.map((image, index) => (
          <img
            className={`slideshow__img ${intervalIndex === index ? 'visible' : 'hidden'}`}
            key={index}
            src={image}
            alt=''
          />
        ))}
      </div>
    </div>
  )
}

export default Slideshow
