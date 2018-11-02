import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import Clock from './clock'

class Login extends React.Component {
  render() { 
    return ( 
        <Grid>
          <Row>
            <Col sm={12}>
              <Clock />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <a href="/auth/google"><Button>login with google</Button></a>
              {/* <a href="/auth/facebook" ><Button>Login with facebook</Button></a> */}
            </Col>
          </Row>
        </Grid>
     )
  }
}
 
export default Login;