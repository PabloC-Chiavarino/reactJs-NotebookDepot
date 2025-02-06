import { note1, note2, note3, note4 } from '../../assets/imgs'
import './styles.css'

const Carousel = () => {
  const images = [note1, note2, note3, note4]

  return (
    <div className='carousel__container'>
      <div className='carousel__collection'>
        {images.map(image => (
          <img className='carousel__img' key={image.toString()} src={image} alt='' />
        ))}
      </div>
    </div>
  )
}

export default Carousel
