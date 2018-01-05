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

    return array.map((el, i) => {
      if(i !== index) {
        return el;
      }

      return {
        ...el,
        ...item
      }
    })

}