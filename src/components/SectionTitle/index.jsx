import './styles.css'

const SectionTitle = ({ section }) => {
  return (
    <div className='title__container'>
      <h1>
        {section}
        <span className='title__underscore'>_</span>
      </h1>
    </div>
  )
}

export default SectionTitle
