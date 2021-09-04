import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ViewPage } from './ViewPage'
import { AddPage } from './AddPage'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <p>Gardening</p>
        </header>
        <Switch>
          <Route path="/add">
            <AddPage />
          </Route>
          <Route path="/">
            <ViewPage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
