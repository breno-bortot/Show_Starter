import React from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

///Importing components
import Main from './components/main'
import Reg_Supporter from './components/reg_supporter';
import Reg_Creator from './components/reg_creator';
import Login from './components/login'
import Creators from './components/creators'
import Projects from './components/projects'
import Pledges from './components/pledges'
import NavBar from './components/navbar'
import { Container } from 'react-bootstrap'


function App() {
  return (


    <Router>
     
      <div className="App">
        
      <NavBar />
        <Switch>
          <Container className='d-flex align-items-center justify-content-center mt-0'
            style={{ minHeight: '100vh' }}
          >

            <div className="w-100" style={{ maxWidth: '400px' }}>
              <Route path="/" exact component={Main} />
              <Route path="/reg_supporter" component={Reg_Supporter} />
              <Route path="/reg_creator" component={Reg_Creator} />
              <Route path="/login_supporter" component={Login} />
              <Route path="/creators" component={Creators} />
              <Route path="/projects" component={Projects} />
              <Route path="/pledges" component={Pledges} />
            </div>
          </Container>

        </Switch>



      </div>
    </Router>
  )
}

export default App;
