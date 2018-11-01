import React, { Component } from 'react';
import Login from './components/login';
import Profile from './components/profile';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  constructor() {
    super() 
    this.state={
      onMobile: false,
      onTablet: false,
      onDesktop: false,
    }
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const breakpoints = [768, 991, 1199]
    if (window.innerWidth <= breakpoints[0]) {
      this.setState({ onMobile: true, onTablet: false, onDesktop: false });
    } else if (window.innerWidth <= breakpoints[1]) {
      this.setState({ onMobile: false, onTablet: true, onDesktop: false });
    } else {
      this.setState({ onMobile: false, onTablet: false, onDesktop: true })
    }
  }

  render() {
    return (
      <div className="App">
        <h1>
          {
            this.state.onMobile ? 
            'mobile' :
            this.state.onTablet ? 
            'tablet' :
            this.state.onDesktop ?
            'desktop' :
            '' 
          }
        </h1>
        <BrowserRouter>
          <div>
            <Route exact path='/login' component={Login} />
            <Route exact path='/profile' component={Profile} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
