import { backBtn } from '../../assets/icons'
import './styles.css'

const BackBtn = ({ scrollBack }) => {
  return (
    <img className='backBtn' src={backBtn} onClick={scrollBack} alt='' />
  )
}

export default BackBtn
