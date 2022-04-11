import './App.css';
import {BrowserRouter , Route , Switch , Redirect} from 'react-router-dom'


import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';
import OnlineUsers from './components/OnlineUsers';

function App() {
   
  const {user , authIsReady} = useAuthContext()


  return (
    <div className="App">
      { authIsReady && (
      <BrowserRouter>
        {user &&<Sidebar/> }
        <div className='container' >
        <Navbar/>
          <Switch>
            <Route exact path='/' >
              {user && <Dashboard/> }
              {!user && <Redirect to='/login' /> }
            </Route>
            <Route path='/create' >
              {user && <Create/> }
              {!user && <Redirect to='/login' /> }
            </Route>
            <Route path='/projects/:id' >
              {user && <Project/>}
              {!user && <Redirect to='/login' /> }
            </Route>
            <Route path='/login' >
              {!user && <Login/> }
              {user && <Redirect to='/' /> }
            </Route>
            <Route path='/signup' >
              {!user && <Signup/> }
              {user && <Redirect to='/' /> }
            </Route>

          </Switch>
        </div>
        {user && <OnlineUsers/> }
      </BrowserRouter>
      ) }
    </div>
  );
}

export default App;
