import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class Footer extends Component {

  render() {
    return (
      <Row style={{position: 'fixed', bottom: '0', left: '5%'}}>
        <Col sm={6}>
          <a href="https://github.com/mccaffertycr/oauth-todo"><h3 style={{ color: 'white', textDecoration: 'none', textDecorationLine: 'none' }}>github repo</h3></a>
        </Col>
        { 
          this.props.profile ?
            <Col sm={6}>
              <a href="/api/todos"><h3 style={{ color: 'white', textDecoration: 'none', textDecorationLine: 'none' }}>API Todos</h3></a>
            </Col> :
            ''
        }
      </Row>
    )
  }
}

export default Footer;