import React from 'react'
import '../index.css'
import Home from './components/Home'

class App extends React.Component {
  render(){
    return (
        <div>
          <h1>Hello React!</h1>
          <div className="container">
            <Home/>
          </div>

        </div>
    )
  }
}


export default App;
