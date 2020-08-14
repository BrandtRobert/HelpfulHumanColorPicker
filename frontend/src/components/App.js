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
      page: 0,
      searchString: ""
    };
    this.updateColorFilter = this.updateColorFilter.bind(this);
    this.clearColorFilter = this.clearColorFilter.bind(this);
    this.randomColor = this.randomColor.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateColorFilter(event) {
    const f = event.target.textContent;
    this.setState({
      filter: f.toLowerCase(),
      page: 0
    });
  }

  clearColorFilter() {
    this.setState({
      filter: "",
      page: 0
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

  updatePage(nextPage) {
    this.setState({
      page: nextPage
    });
  }

  updateSearch(event) {
    const search = event.target.value;
    this.setState({
      searchString: search,
      page: 0
    })
  }

  /**
   * On mount query the server for available colors
   */
  componentDidMount() {
    const {client} = this.props;
    client.query({
      query: COLORS
    })
    .then((result) => this.setState({
      colors: result.data.colors, 
      loading: false, 
    })).catch(this.setState({loading: true}))
  }

  render() {
    const { client } = this.props;
    let currentColors = this.state.colors;
    if (this.state.filter !== "") {
      currentColors = currentColors.filter((colorObj) => {
        return colorObj.family === this.state.filter
      });
    }
    if (this.state.searchString !== "") {
      currentColors = currentColors.filter(colorObj => {
        return colorObj.color.includes(this.state.searchString);
      })
    }
    return (
      <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <TopBar updateSearch={this.updateSearch}/>
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
                  (<CardGrid filter={this.state.filter} colors={currentColors} page={this.state.page}/>)
                  }
                  <Pagination 
                    updatePage={this.updatePage} 
                    numPages={Math.trunc(currentColors.length / 12)} 
                    page={this.state.page}
                  />
                </Route>
                <Route path='/color-detail/:color'>
                  <ColorDetail colorFamilySelection={this.state.filter} allColors={this.state.colors}/>
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