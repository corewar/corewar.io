export const insertItem = (index, array, item) => {
  let newArray = array.slice()
  newArray.splice(index, 0, item)
  return newArray
}

export const removeItem = (index, array) => {
  return [
    ...array.slice(0, index),
    ...array.slice(index + 1)
  ]
}

export const replaceItem = (index, array, item) => {

  const removedList = removeItem(index, array)
  const addedList = insertItem(index, removedList, item)
  return addedList

}

export const replaceItemByKey = (key, value, array, item) => {

  const initialIndex = array.indexOf(item)
  const removedList = removeItemByKey(key, value, array)
  return insertItem(initialIndex, removedList, item)

}

export const replaceById = (id, array, item) => {
  const initialIndex = array.findIndex(x => x.data.id === id)
  const removedList = removeById(id, array)
  const addedList = insertItem(initialIndex, removedList, item)
  return addedList
}

export const removeItemByKey = (key, value, array) => {
  return array.filter(x => x[key] !== value)
}

export const removeById = (id, array) => {
  return array.filter(x => x.data.id !== id)
}