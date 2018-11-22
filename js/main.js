import React from 'react';
import ReactDOM from 'react-dom'
import ExampleWork from './example-work'

const myWork = [
  {
    'title': "First Job",
    'image': {
        'desc': "example screenshot of a project involving code",
        'src': "images/example1.png",
        'comment': "Work Example"
    }
  },
  {
    'title': "Second Job",
    'image': {
        'desc': "example screenshot of a project involving chemistry",
        'src': "images/example2.png",
        'comment': "Work Example"
    }
  },
  {
    'title': "Third Job",
    'image': {
        'desc': "example screenshot of a project involving cats",
        'src': "images/example3.png",
        'comment': `Multi line comment          finished on 2nd line`
    }
  }
]

ReactDOM.render(<ExampleWork work={myWork}/>, document.getElementById('exampleWorkId'))
