import { userIcon } from '../../assets/icons'
import './styles.css'

const UserWidget = ({ handleOnClick }) => {
  return (
    <div className='userWidget__container'>
      <img src={userIcon} alt='' onClick={handleOnClick} />
    </div>
  )
}

export default UserWidget
