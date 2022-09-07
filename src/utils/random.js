// function that return X random elements of an array
const random = (array, elements) => {
  const arrayCopy = array.map(element => element)   // so original array doesn't change with splice
  const result = []
  for (let i = 0; i < elements; i++) {
    const element = Math.floor(Math.random() * arrayCopy.length)
    result.push(arrayCopy[element])
    arrayCopy.splice(element, 1)
  }
  return result
}

export default random