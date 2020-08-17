const throttle = (callback, wait, context = this) => {
  let timeout = null
  const callbackArgs = null

  const later = () => {
    callback.apply(context, callbackArgs)
    timeout = null
  }

  return () => {
    if (!timeout) {
      //callbackArgs = arguments
      timeout = setTimeout(later, wait)
    }
  }
}

export default throttle
