import { forwardBtn } from '../../assets/icons'
import './styles.css'

const ForwardBtn = ({ scrollForward }) => {
  return (
    <img className='forwardBtn' src={forwardBtn} onClick={scrollForward} alt='' />
  )
}

export default ForwardBtn
