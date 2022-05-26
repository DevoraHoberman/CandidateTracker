import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import AddCandidate from './Pages/AddCandidate';
import Pending from './Pages/Pending';
import Confirmed from './Pages/Confirmed';
import Refused from './Pages/Refused';
import Details from './Components/Details';
import { CountContextComponent } from './CountContext';

const App = () => {
   return  <CountContextComponent>
        <Layout>
            <Route exact path='/' component={Home} />
            <Route exact path='/addcandidate' component={AddCandidate} />
            <Route exact path='/pending' component={Pending} />
            <Route exact path='/confirmed' component={Confirmed} />
            <Route exact path='/refused' component={Refused} />
            <Route exact path='/pending/details/:id' component={Details} />
        </Layout>
    </CountContextComponent>
}

export default App;