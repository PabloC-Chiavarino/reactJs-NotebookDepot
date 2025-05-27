import './styles.css'

const Loader = ({ greeting }) => {
  return (
    <>
      <div className='loader__container'>
        <div className='loader__container--ellipsis'>
          <div />
          <div />
          <div />
          <div />
        </div>
        <span>{greeting}</span>
      </div>
    </>
  )
}

export default Loader
