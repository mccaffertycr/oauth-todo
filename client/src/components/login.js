import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import Clock from './clock';

class Login extends React.Component {
  render() { 
    return ( 
      <div className="day">
        <Grid>
          <Row>
            <Col sm={12}>
              <Clock />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <a href="/auth/google" ><Button>Login with google</Button></a>
              {/* <a href="/auth/facebook" ><Button>Login with facebook</Button></a> */}
            </Col>
          </Row>
        </Grid>
      </div>
     )
  }
}
 
export default Login;