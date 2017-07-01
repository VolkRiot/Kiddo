import React from 'react'
import '../index.css'
import Home from './components/Home'

class App extends React.Component {
  render(){
    return (
        <div className="main">
          <h1 className="title">Kiddo</h1>
          <div className="container">
            <Home/>
          </div>

        </div>
    )
  }
}


export default App;
