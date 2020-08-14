import React, { Component } from 'react';
import { ApolloProvider, gql } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import TopBar from './TopBar'
import SideBar from './SideBar'
import CardGrid from './CardGrid';
import Pagination from './Pagination';
import ColorDetail from './ColorDetail';
import '../styles/Content.css'
import '../styles/App.css';

const COLORS = gql `
{
    colors {
        color,
        family
    }
}
`

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      colors: [],
      loading: false,
    };
    this.updateColorFilter = this.updateColorFilter.bind(this);
    this.clearColorFilter = this.clearColorFilter.bind(this);
    this.randomColor = this.randomColor.bind(this);
  }

  updateColorFilter(event) {
    const f = event.target.textContent;
    this.setState({
      filter: f.toLowerCase()
    });
  }

  clearColorFilter() {
    this.setState({
      filter: "",
    })
  }

  randomColor() {
    if (this.state.colors.length < 1) {
      return "#FFFFFF"
    } else {
      let randomColorObject = this.state.colors[Math.floor(Math.random() * this.state.colors.length)]
      return randomColorObject.color;
    }
  }

  /**
   * On mount query the server for available colors
   */
  componentDidMount() {
    const {client} = this.props;
    client.query({
      query: COLORS
    })
    .then((result) => this.setState({colors: result.data.colors, loading: false}))
    .catch(this.setState({loading: true}))
  }

  render() {
    const { client } = this.props;
    return (
      <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <TopBar />
          <main>
            <SideBar 
              updateFilter={ this.updateColorFilter } 
              clearColorFilter={ this.clearColorFilter }
              randomColor={ this.randomColor }
            />
            <div className="Content">
              <Switch>
                <Route exact path='/'>
                  {
                  this.state.loading?
                  (<p>Data loading...</p>):
                  (<CardGrid filter={this.state.filter} colors={this.state.colors} />)
                  }
                  <Pagination />
                </Route>
                <Route path='/color-detail/:color'>
                  <ColorDetail colorFamilySelection={this.state.filter}/>
                </Route>
                <Route>
                  <p>Page Not Found</p>
                </Route>
              </Switch>
            </div>
          </main>
        </div>
      </Router>
      </ApolloProvider>
    )
  }
}