import './styles.css'

const SearchInput = ({ onSearch, search }) => {
  return (
    <div className='search-input'>
      <input
        type='text'
        placeholder='Buscar...'
        value={search}
        onChange={onSearch}
      />
    </div>
  )
}

export default SearchInput
