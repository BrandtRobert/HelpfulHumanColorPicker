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

/**
 * Query used to fetch colors and their families from the server.
 * A color family is the primary hue we might associate with it (red, green, blue, black)
 */
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

  /**
   * Update state of the sidebar color filter.
   * This will also reset the pagination for the set of filtered colors.
   */
  updateColorFilter(event) {
    const f = event.target.textContent;
    this.setState({
      filter: f.toLowerCase(),
      page: 0
    });
  }

  /**
   * Reset color filter back to non-filtering mode
   */
  clearColorFilter() {
    this.setState({
      filter: "",
      page: 0
    })
  }

  /**
   * Get a random color from the available colors. Used by the random color button.
   */
  randomColor() {
    if (this.state.colors.length < 1) {
      return "#FFFFFF"
    } else {
      let randomColorObject = this.state.colors[Math.floor(Math.random() * this.state.colors.length)]
      return randomColorObject.color;
    }
  }

  /**
   * Update the pagination page to whichever number the user clicked.
   */
  updatePage(nextPage) {
    this.setState({
      page: nextPage
    });
  }

  /**
   * On searchbar change update our search filter to the searchstring typed by the user.
   */
  updateSearch(event) {
    const search = event.target.value;
    this.setState({
      searchString: search,
      page: 0
    })
  }

  /**
   * On mount query the server for available colors and set color state in the app.
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

    // Filter the set of available colors based on the filter string
    //  which is a color family i.e (red, green, blue, etc)
    let currentColors = this.state.colors;
    if (this.state.filter !== "") {
      currentColors = currentColors.filter((colorObj) => {
        return colorObj.family === this.state.filter
      });
    }
    // Filter the set of colors based on the search string typed by user
    //  this filtering is done after the color family filtering meaning that once you select
    //  something on the left sidebar you will have applied one of two possible filters
    if (this.state.searchString !== "") {
      currentColors = currentColors.filter(colorObj => {
        return colorObj.color.includes(this.state.searchString);
      })
    }

    return (
      // Using apollo client for graphql queries
      //  and react router to route the app between detail and list page views
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