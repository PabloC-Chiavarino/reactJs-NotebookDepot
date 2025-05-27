import { faceIco, instIco, ytIco, wAppIco } from '../../assets/icons'
import './styles.css'

const Footer = () => {
  return (
    <div className='footer__container'>
      <div className='footer__subcontainer'>
        <h2 className='footer__logo--title'>Notebook</h2>
        <h3 className='footer__logo--subtitle'>depot</h3>
        <div className='footer__contactInfo'>
          <img src={wAppIco} alt='' />
          <a className='footer__wApp' href='https://wa.me/542216545052'>Chatea con nosotros!</a>
        </div>
        <div className='footer__social'>
          <h4>Seguinos !</h4>
          <div className='footer__networks'>
            <a href='#'><img href='#' src={faceIco} alt='' /></a>
            <a href='#'><img href='#' src={ytIco} alt='' /></a>
            <a href='#'><img href='#' src={instIco} alt='' /></a>
          </div>
        </div>
      </div>
      <h5 className='footer__copyright'>Developed by pdev</h5>
    </div>
  )
}

export default Footer
