import { useFirestore } from '../../hooks'
import './styles.css'

const Loader = ({ greeting }) => {
  const { loading } = useFirestore()

  return (
    <>
      <div className={`loader__container ${!loading ? 'fadeIn' : 'fadeOut'}`}>
        <div
          className='loader__container--ellipsis'
        >
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
