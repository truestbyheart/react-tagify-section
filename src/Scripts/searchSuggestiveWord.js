const getSuggestions = (value, tags) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0
    ? []
    : tags.filter(
      word => word.name.toLowerCase().slice(0, inputLength) === inputValue
    )
}

export default getSuggestions
