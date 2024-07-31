import {BrowserRouter, Switch, Route} from 'react-router-dom'

import SignUp from './components/SignUp'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  </BrowserRouter>
)

export default App
