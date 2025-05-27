import { useNavigate } from 'react-router-dom'
import './styles.css'

const MainBtn = ({ type, text }) => {
  const navigate = useNavigate()
  const handleOnClick = () => type === 'default' ? navigate('/') : navigate(-1)

  return (
    <div>
      <button type='default' className='mainBtn' onClick={handleOnClick}>{text}</button>
    </div>
  )
}

export default MainBtn
