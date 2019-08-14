import _ from 'lodash'

import getSuggestions from './searchSuggestiveWord'

let initialId = 0
let listOfTags = []
const appendNewTag = tags => {
  // auto suggestion wrapper
  const autoSuggestionWrapper = document.createElement('div')
  autoSuggestionWrapper.setAttribute('id', `sug-${initialId}`)
  autoSuggestionWrapper.classList.add('tags__autosuggest')

  // tags container
  const tag = document.getElementById('tags')
  const tagElement = document.createElement('input')
  tagElement.classList.add('tags__inputs')
  tagElement.setAttribute('id', 'done')
  tag.appendChild(autoSuggestionWrapper)
  autoSuggestionWrapper.appendChild(tagElement)

  // suggestion box
  const done = document.getElementById('done')
  const suggestionBox = document.createElement('ul')
  suggestionBox.classList.add('tags__suggestion')
  suggestionBox.setAttribute('id', 'suggestion-box')

  // deleting tag
  const deleteIcon = document.createElement('i')
  initialId++
  deleteIcon.classList.add('fas')
  deleteIcon.classList.add('fa-times')
  deleteIcon.setAttribute('id', `delTag-${initialId}`)
  deleteIcon.onclick = event => {
    const delTag = document.getElementById(event.target.id)
    listOfTags.splice(_.indexOf(listOfTags, delTag.previousSibling.id, 0), 1)
    const elem = document.getElementById(delTag.parentNode.id)
    elem.parentNode.removeChild(elem)
  }

  done.addEventListener('keyup', key => {
    if (key) {
      const words = getSuggestions(key.target.value, tags)
      let tagNames
      let list = 0
      if (words.length !== 0) {
        while (suggestionBox.childNodes.length > 0) {
          suggestionBox.removeChild(suggestionBox.childNodes[list])
          list++
        }
        words.map(word => {
          tagNames = document.createElement('li')
          tagNames.setAttribute('id', 'tag-index')
          const names = document.createTextNode(word.name)
          tagNames.appendChild(names)
          tagNames.onclick = event => {
            if (_.indexOf(listOfTags, event.target.innerHTML, 0) > -1) {
              const originalTag = document.getElementById(word.name)
              originalTag.classList.add('tags__original')
              autoSuggestionWrapper.removeChild(suggestionBox)
              done.value = ''
              setTimeout(() => {
                originalTag.classList.remove('tags__original')
              }, 1000)
            } else {
              done.value = event.target.innerHTML
              const sugBox = document.getElementById('suggestion-box')
              autoSuggestionWrapper.removeChild(sugBox)
              done.classList.add('tags__inputs--disabled')
              done.disabled = true
              autoSuggestionWrapper.appendChild(deleteIcon)
              done.removeAttribute('id')
              done.setAttribute('id', word.name)
              listOfTags.push(key.target.value.trim())
              appendNewTag()
            }
          }
        })

        suggestionBox.appendChild(tagNames)

        autoSuggestionWrapper.appendChild(suggestionBox)
      } else {
        const sugBox = document.getElementById('suggestion-box')
        sugBox ? autoSuggestionWrapper.removeChild(sugBox) : ''
      }
    }
    if (key.which === 32 || key.which === 9) {
      const sugBox = document.getElementById('suggestion-box')
      sugBox ? autoSuggestionWrapper.removeChild(sugBox) : ''
      done.removeAttribute('id')
      done.setAttribute('id', event.target.value.trim())

      if (_.indexOf(listOfTags, key.target.value, 0) > -1) {
        const originalTag = document.getElementById(key.target.value.trim())
        originalTag.classList.add('tags__original')
        done.value = ''
        setTimeout(() => {
          originalTag.classList.remove('tags__original')
        }, 1000)
      } else {
        done.classList.add('tags__inputs--disabled')
        done.disabled = true
        autoSuggestionWrapper.appendChild(deleteIcon)
        listOfTags.push(key.target.value.trim())
        appendNewTag()
      }
    }
  })
}

export default appendNewTag
