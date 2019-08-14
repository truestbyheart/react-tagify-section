import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import styles from './styles.css'

export default class Tagify extends Component {
  constructor() {
    super()
    this.listOfTags = []
    this.initialId = 0
  }
  static propTypes = {
    tags: PropTypes.arrayOf(Object).isRequired
  };

  componentDidMount() {
    const { tags } = this.props
    this.appendNewTag(tags)
  }

  getSuggestions = value => {
    const { tags } = this.props
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : tags.filter(
        word => word.name.toLowerCase().slice(0, inputLength) === inputValue
      )
  };

  appendNewTag = () => {
    const { tags } = this.props
    // auto suggestion wrapper
    const autoSuggestionWrapper = document.createElement('div')
    autoSuggestionWrapper.setAttribute('id', `sug-${this.initialId}`)
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
    this.initialId++
    deleteIcon.classList.add('fas')
    deleteIcon.classList.add('fa-times')
    deleteIcon.setAttribute('id', `delTag-${this.initialId}`)
    deleteIcon.onclick = event => {
      const delTag = document.getElementById(event.target.id)
      this.listOfTags.splice(
        _.indexOf(this.listOfTags, delTag.previousSibling.id, 0),
        1
      )
      this.articleContentUpdater(this.props, { tags: this.listOfTags })
      const elem = document.getElementById(delTag.parentNode.id)
      elem.parentNode.removeChild(elem)
    };

    done.addEventListener('keyup', key => {
      if (key) {
        const words = this.getSuggestions(key.target.value)
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
              if (_.indexOf(this.listOfTags, event.target.innerHTML, 0) > -1) {
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
                this.listOfTags.push(key.target.value.trim())
                this.appendNewTag()
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

        if (_.indexOf(this.listOfTags, key.target.value, 0) > -1) {
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
          this.listOfTags.push(key.target.value.trim())
          this.appendNewTag()
        }
      }
    })
  };

  render() {
    return <div className={styles.tags} id='tags' />
  }
}
