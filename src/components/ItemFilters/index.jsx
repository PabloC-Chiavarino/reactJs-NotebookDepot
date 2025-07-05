import { useLocation } from 'react-router-dom'
import './styles.css'
import { useEffect } from 'react'

const ItemFilters = ({ filters, setFilters, data }) => {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      setFilters({
        brand: [],
        processor: [],
        ram: [],
        screensize: [],
        storage: []
      })
    }
  }, [location.pathname])

  const getExistingValues = (property) => {
    if (!data) return
    const values = data
      .map((prod) => prod[property])
      .filter(value => value !== null && value !== undefined)

    const uniqueValues = Array.from(new Set(values))
    return uniqueValues
  }

  const brands = getExistingValues('brand')
  const processors = getExistingValues('processor')
  const rams = getExistingValues('ram')
  const screensizes = getExistingValues('screensize')
  const storages = getExistingValues('storage')

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target
    if (checked) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: [...prevFilters[name], value]
      }))
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: prevFilters[name].filter((item) => item !== value)
      }))
    }
  }

  return (
    <div className='filters-bar'>

      <div className='filter-group'>
        <span className='filter-title'>Marca:</span>
        {brands.map((brand) => (
          <label key={brand} className='checkbox-item'>
            <input
              type='checkbox'
              name='brand'
              value={brand}
              checked={filters.brand.includes(brand)}
              onChange={handleCheckboxChange}
            />
            {brand.toUpperCase()}
          </label>
        ))}
      </div>

      <div className='filter-group'>
        <span className='filter-title'>Procesador:</span>
        {processors.map((processor) => (
          <label key={processor} className='checkbox-item'>
            <input
              type='checkbox'
              name='processor'
              value={processor}
              checked={filters.processor.includes(processor)}
              onChange={handleCheckboxChange}
            />
            {processor.toUpperCase()}
          </label>
        ))}
      </div>

      <div className='filter-group'>
        <span className='filter-title'>RAM:</span>
        {rams.map((ram) => (
          <label key={ram} className='checkbox-item'>
            <input
              type='checkbox'
              name='ram'
              value={ram}
              checked={filters.ram.includes(ram)}
              onChange={handleCheckboxChange}
            />
            {ram}
          </label>
        ))}
      </div>

      <div className='filter-group'>
        <span className='filter-title'>Almacenamiento:</span>
        {storages.map((storage) => (
          <label key={storage} className='checkbox-item'>
            <input
              type='checkbox'
              name='storage'
              value={storage}
              checked={filters.storage.includes(storage)}
              onChange={handleCheckboxChange}
            />
            {storage}
          </label>
        ))}
      </div>

      <div className='filter-group'>
        <span className='filter-title'>Pantalla:</span>
        {screensizes.map((screensize) => (
          <label key={screensize} className='checkbox-item'>
            <input
              type='checkbox'
              name='screensize'
              value={screensize}
              checked={filters.screensize.includes(screensize)}
              onChange={handleCheckboxChange}
            />
            {screensize}
          </label>
        ))}
      </div>
    </div>
  )
}

export default ItemFilters
