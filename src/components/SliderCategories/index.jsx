import { NavLink } from 'react-router-dom'
import './styles.css'

const SliderCategories = ({ show, onClose }) => {
  return (
    <div
      className='sliderCategories__container'
      style={{ transform: show ? 'translate(0)' : 'translate(-100%)' }}
    >
      <div className='sliderCategories__close' onClick={onClose}>
        X
      </div>
      <h2>Categorias</h2>
      <ul className='sliderCategories__list'>
        <NavLink to='/categories/home' className='sliderCategories' onClick={onClose}>
          <li>Hogar</li>
        </NavLink>
        <NavLink to='/categories/professional' className='sliderCategories' onClick={onClose}>
          <li>Diseño y desarrollo</li>
        </NavLink>
        <NavLink to='/categories/gaming' className='sliderCategories' onClick={onClose}>
          <li>Gaming</li>
        </NavLink>
      </ul>
    </div>
  )
}

export default SliderCategories
