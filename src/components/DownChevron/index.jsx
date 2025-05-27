import { useState, useEffect } from 'react'
import downChevron from '../../assets/Icons/down-chevron.png'
import './styles.css'

const DownChevron = ({ scrollDirection }) => {
  const [display, setDisplay] = useState(true)

  useEffect(() => {
    if (scrollDirection === 'down' && display) {
      setDisplay(false)
    }
  }, [scrollDirection, display])

  return (
    <div
      className={`downChevron__container ${display ? 'fadeIn' : 'fadeOut'}`}
      onAnimationEnd={(e) => {
        if (!display) {
          e.target.classList.add('hidden')
        }
      }}
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
