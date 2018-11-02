import React from 'react';
import { Grid, Row, Col, ListGroup, FormGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Clock from './clock';
import Todo from './todo';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = { profile: [], todos: [], newTodo: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.getTodos();
  }

  getUser() {
    axios
      .get('/api/current_user')
      .then(res => {
        this.setState({ profile: res.data });
        console.log(this.state.profile);
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  getTodos() {
    axios
      .get('/api/todos')
      .then(res => {
        this.setState({ todos: res.data.todos });
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ newTodo: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post('/api/todos', { data: { todo: this.state.newTodo }})
      .then(res => {
        console.log(res)
        this.setState({ newTodo: '' })
      })
      .catch(err => console.log(err));
    this.getTodos();
  }

  render() { 
    return ( 
     <div>
       <Grid>
         <Row>
           <Col sm={6}>
             <Clock />
           </Col>
           <Col sm={6}>
            <a className="ml-auto" href="/api/logout">logout</a>
           </Col>
         </Row>
         <Row>
           <Col sm={4}>
             <form>
               <FormGroup>
                <FormControl
                  type="text"
                  value={this.state.newTodo}
                  onChange={this.handleChange}
                >
                </FormControl>
               </FormGroup>
             </form>
           </Col>
           <Col sm={2}>
            <Button 
              bsStyle={'info'}
              onClick={this.handleSubmit}
            >
              <FontAwesomeIcon icon={'plus'} />
            </Button>
           </Col>
         </Row>
         <Row>
           <Col sm={6}>
             <ListGroup>
               {
                 this.state.todos ? 
                 this.state.todos.map(t => 
                   <Todo {...t} />) :
                 ''
               }
             </ListGroup>
           </Col>
           <Col sm={6}>
           </Col>
         </Row>
       </Grid>
     </div>
    )
  }
}
 
export default Profile;