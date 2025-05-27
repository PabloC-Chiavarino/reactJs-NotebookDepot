import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { UserWidget, UserMenu, CartWidget, Slider, OpacityDiv } from '../../components'
import './styles.css'

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const handleShowCart = () => {
    setShowCart(!showCart)
    if (showMenu) {
      setShowMenu(!showMenu)
    }
  }
  const handleShowUser = () => {
    setShowMenu(!showMenu)
    if (showCart) {
      setShowCart(!showCart)
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
          <ul className='categories__list'>
            <NavLink to='/categories/family' className='categories'><li>Hogar</li></NavLink>
            <NavLink to='/categories/professional' className='categories'><li>Diseño y desarrollo</li></NavLink>
            <NavLink to='/categories/gaming' className='categories'><li>Gaming</li></NavLink>
          </ul>
          <UserWidget handleOnClick={handleShowUser} />
          <UserMenu show={showMenu} onClose={handleShowUser} />
          <CartWidget handleOnClick={handleShowCart} />
          <Slider show={showCart} onClose={handleShowCart} />
        </div>
      </nav>
      <OpacityDiv show={showCart || showMenu} handleOnClick={showCart ? handleShowCart : handleShowUser} />
    </>
  )
}

export default NavBar
