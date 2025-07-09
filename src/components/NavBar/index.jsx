import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { UserWidget, UserMenu, CartWidget, Slider, SliderCategories, OpacityDiv } from '../../components'
import { hamburguerIcon } from '../../assets/icons'
import './styles.css'

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showUser, setShowUser] = useState(false)

  const handleToggle = (target) => {
    switch (target) {
      case 'hamburguer':
        setShowMenu(prev => !prev)
        setShowCart(false)
        setShowUser(false)
        break
      case 'user':
        setShowUser(prev => !prev)
        setShowMenu(false)
        setShowCart(false)
        break
      case 'cart':
        setShowCart(prev => !prev)
        setShowMenu(false)
        setShowUser(false)
        break
      case 'close':
        setShowMenu(false)
        setShowCart(false)
        setShowUser(false)
        break
      default:
        break
    }
  }

  return (
    <>
      <nav className='navBar'>
        <Link to='./' className='categories'>
          <div className='logo__container'>
            <h4 className='logo__title'>Notebook</h4>
            <p className='logo__subtitle'>depot</p>
          </div>
        </Link>
        <div className='menu__container'>
          <ul className={`categories__list ${showMenu ? 'show' : ''}`}>
            <NavLink to='/categories/home' className='categories'><li>Hogar</li></NavLink>
            <NavLink to='/categories/professional' className='categories'><li>Diseño y desarrollo</li></NavLink>
            <NavLink to='/categories/gaming' className='categories'><li>Gaming</li></NavLink>
          </ul>
          <div className='hamburger__btn'>
            <img src={hamburguerIcon} alt='Hamburguer' onClick={() => handleToggle('hamburguer')} />
          </div>
          <SliderCategories show={showMenu} onClose={() => handleToggle('hamburguer')} />
          <UserWidget handleOnClick={() => handleToggle('user')} />
          <UserMenu show={showUser} onClose={() => handleToggle('user')} />
          <CartWidget handleOnClick={() => handleToggle('cart')} />
          <Slider show={showCart} onClose={() => handleToggle('cart')} />
        </div>
      </nav>
      <OpacityDiv show={showCart || showMenu || showUser} handleOnClick={showCart || showMenu || showUser ? () => handleToggle('close') : null} />
    </>
  )
}

export default NavBar
