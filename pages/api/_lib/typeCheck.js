let isType = (elem, object) => {
  return (Object.prototype.toString.call(elem).slice(8, -1).toLowerCase() === object)
}

export { isType }