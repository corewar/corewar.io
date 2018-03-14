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