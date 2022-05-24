import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import ActivityCreate from './components/Activity/ActivityCreate'
import Detail from './components/Detail/Detail'
import Home from './components/Home/Home'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component={LandingPage}/>
        <Route exact path = '/home' component={Home}/>
        <Route path = '/activity' component={ActivityCreate}/>
        <Route path = '/home/:id' component={Detail}/> 
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
