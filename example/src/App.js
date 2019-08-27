import React, { Component } from 'react';

import Tagify from 'react-tagify-section';
import './styles.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tags: null
    };
  }
  tags = [
    {
      name: 'laravel'
    },
    {
      name: 'C',
      year: 1972
    },
    {
      name: 'C#',
      year: 2000
    },
    {
      name: 'C++',
      year: 1983
    },
    {
      name: 'Clojure',
      year: 2007
    },
    {
      name: 'Elm',
      year: 2012
    },
    {
      name: 'Go',
      year: 2009
    },
    {
      name: 'Haskell',
      year: 1990
    },
    {
      name: 'Java',
      year: 1995
    },
    {
      name: 'Javascript',
      year: 1995
    },
    {
      name: 'Perl',
      year: 1987
    },
    {
      name: 'PHP',
      year: 1995
    },
    {
      name: 'Python',
      year: 1991
    },
    {
      name: 'Ruby',
      year: 1995
    },
    {
      name: 'Scala',
      year: 2003
    }
  ];

  previousTags = [
    {
      id: 1,
      name: 'clojure'
    },
    {
      id: 2,
      name: 'java'
    },
    {
      id: 3,
      name: 'ruby'
    }
  ];
  listofTags = value => {
    this.setState({ tags: value });
  };
  render() {
    return (
      <div className='container'>
        <div className='form-group'>
          <label htmlFor='tags-with-data'>Tags</label>
          <Tagify
            tags={this.tags}
            getTagList={this.listofTags}
            existingTags={this.previousTags}
          />
        </div>
      </div>
    );
  }
}

export default App;
