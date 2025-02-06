import { fowardBtn } from '../../assets/icons'
import './styles.css'

const FowardBtn = ({ scrollFoward }) => {
  return (
    <img className='fowardBtn' src={fowardBtn} onClick={scrollFoward} alt='' />
  )
}

export default FowardBtn
