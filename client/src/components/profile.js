import React from 'react';
import { Grid, Row, Col, ListGroup, FormGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Todo from './todo';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: [], todos: [], newTodo: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitTodo = this.handleSubmitTodo.bind(this);
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

  handleSubmitTodo = (id, action) => {
    if (action === 'complete') {
      axios
      .put('/api/todos', { data: { id: id, completed: true }})
      .then(res => {
        console.log(res)
        this.setState({ newTodo: '' })
      })
      .catch(err => console.log(err));
      this.getTodos();
    } else if (action === 'delete') {
      axios
      .put('/api/todos', { data: { id: id, finished: true }})
      .then(res => {
        console.log(res)
        this.setState({ newTodo: '' })
      })
      .catch(err => console.log(err));
      this.getTodos();
    } 
  }

  render() { 
    return ( 
     <div>
       <Grid>
         <Row>
           <Col sm={6}>
            <a href="/api/logout">logout</a>
           </Col>
         </Row>
         <Row>
           <Col xs={5} sm={4}>
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
           <Col xs={1} sm={2}>
            <Button 
              bsStyle={'info'}
              onClick={this.handleSubmit}
            >
              <FontAwesomeIcon icon={'plus'} />
            </Button>
           </Col>
         </Row>
         <Row>
           <Col xs={12} sm={6}>
             <ListGroup>
               {
                 this.state.todos ? 
                 this.state.todos.map(t => 
                    !t.completed ?
                   <Todo handleSubmitTodo={this.handleSubmitTodo} {...t} /> :
                   '') :
                 ''
               }
             </ListGroup>
           </Col>
           <Col xs={12} sm={6}>
            <ListGroup>
               {
                 this.state.todos ? 
                 this.state.todos.map(t => 
                  t.completed && !t.finished ?
                   <Todo {...t} /> :
                   '') :
                 ''
               }
            </ListGroup>
            <Button bsStyle={'danger'}>
             empty{' '}
            <FontAwesomeIcon icon={'trash-alt'} />                     
            </Button>
           </Col>
         </Row>
       </Grid>
     </div>
    )
  }
}
 
export default Profile;