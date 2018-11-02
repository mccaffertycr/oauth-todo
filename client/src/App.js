import React, { Component } from 'react';
import Login from './components/login';
import Profile from './components/profile';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt, faPlus, faStickyNote } from '@fortawesome/free-solid-svg-icons'
library.add(faTrashAlt, faPlus, faStickyNote);

class App extends Component {
  constructor() {
    super() 
    this.state={
      onMobile: false,
      onTablet: false,
      onDesktop: false,
      isDay: false
    }
    this.handleResize = this.handleResize.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleTimeChange();
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

  handleTimeChange() {
    let time = new Date(Date.now());

    time = time.toLocaleString();

    if (time.indexOf('PM') <= 0) {
      this.setState({
        isDay: false
      });
    } else {
      this.setState({
        isDay: true
      });
    }

  }

  render() {
     const bgStyle = {
      background: `${this.state.isDay ? 
                    'url("/assets/img/day_bg.jpg")' : 
                    'url("/assets/img/night_bg.jpg")'} 
                    no-repeat center center fixed`,
      backgroundSize: 'cover',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0
    }

    return (
      <div className="App" style={bgStyle}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path='/profile' component={Profile} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
