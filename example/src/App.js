import React, { Component } from 'react'

import Tagify from 'react-tagify-section'

class App extends Component {
  tags = [
    {
      name: 'java'
    },
    {
      name: 'javascript'
    },
    {
      name: 'laravel'
    }
  ];
  render() {
    return <Tagify tags={this.tags} />
  }
}

export default App
