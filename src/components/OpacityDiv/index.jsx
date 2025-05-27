import './styles.css'

const OpacityDiv = ({ show, handleOnClick }) => {
  return (
    <div
      className='opacityDiv'
      style={{ display: show ? 'block' : 'none' }}
      onClick={handleOnClick}
    />
  )
}

export default OpacityDiv
