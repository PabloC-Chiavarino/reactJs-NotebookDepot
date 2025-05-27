import { Item } from '../../components'

const ItemList = ({ data }) => {
  return (
    <>
      {data.map((prod) => (
        <Item product={prod} key={prod.id} />
      ))}
    </>
  )
}

export default ItemList
