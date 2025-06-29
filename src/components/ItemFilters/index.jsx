import { useLocation } from 'react-router-dom'
import './styles.css'
import { useEffect } from 'react'

const ItemFilters = ({ filters, setFilters, data }) => {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      setFilters({
        brand: '',
        processor: '',
        ram: '',
        screensize: ''
      })
    }
  }, [location.pathname])

  const getExistingValues = (property) => {
    if (!data) return
    const values = data.map((prod) => prod[property]
    )
    const uniqueValues = Array.from(new Set(values))
    return uniqueValues
  }

  const brands = getExistingValues('brand')
  const processors = getExistingValues('processor')
  const rams = getExistingValues('ram')
  const screensizes = getExistingValues('screensize')

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='filters-bar'>
      <label className='filter-group'>
        <span className='filter-title'>Marca:</span>
        <select name='brand' value={filters.brand} onChange={handleChange}>
          <option value=''>Todas</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand.toUpperCase()}
            </option>
          ))}
        </select>
      </label>

      <label className='filter-group'>
        <span className='filter-title'>Procesador:</span>
        <select name='processor' value={filters.processor} onChange={handleChange}>
          <option value=''>Todas</option>
          {processors.map((processor) => (
            <option key={processor} value={processor}>
              {processor.toUpperCase()}
            </option>
          ))}
        </select>
      </label>

      <label className='filter-group'>
        <span className='filter-title'>RAM:</span>
        <select name='ram' value={filters.ram} onChange={handleChange}>
          <option value=''>Todas</option>
          {rams.map((ram) => (
            <option key={ram} value={ram}>
              {ram}
            </option>
          ))}
        </select>
      </label>

      <label className='filter-group'>
        <span className='filter-title'>Pantalla:</span>
        <select name='screensize' value={filters.screensize} onChange={handleChange}>
          <option value=''>Todas</option>
          {screensizes.map((screensize) => (
            <option key={screensize} value={screensize}>
              {screensize}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default ItemFilters
