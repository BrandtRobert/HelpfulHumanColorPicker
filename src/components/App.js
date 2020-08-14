import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import '../styles/App.css';
import '../styles/Content.css'
import TopBar from './TopBar'
import SideBar from './SideBar'
import CardGrid from './CardGrid';
import Pagination from './Pagination';
import ColorDetail from './ColorDetail';

const colors = [
  "#112233", "#551133", "#112266", "#44FF22",
  "#112233", "#551133", "#112266"
]

function App() {
  return (
    <Router>
      <div className="App">
        <TopBar />
        <main>
          <SideBar />
          <div className="Content">
            <Switch>
              <Route exact path='/'>
                <CardGrid colors={ colors }></CardGrid>
                <Pagination />
              </Route>
              <Route path='/color-detail/:color'>
                <ColorDetail />
              </Route>
              <Route>
                <p>Page Not Found</p>
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
