import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Clock from './clock';
import Todo from './todo';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: [], todos: [], newTodo: '', delStatus: false };
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
      .then(() => {
        this.state.todos.forEach(function(ele) {
          if (ele.completed) {
            return this.setState({ delStatus: true });
          } 
        })
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
        this.setState({ newTodo: '', delStatus: true })
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

  handleDeleteTodos = () => {}

  render() { 

    return ( 
     <div>
       <Grid>
         <Row>
           <Col xs={6} sm={3}>
            <Clock />
           </Col>
           <Col xs={6} sm={1} smOffset={8}>
            <a href="/api/logout"><h3 style={{ color: 'white', textDecoration: 'none', textDecorationLine: 'none' }}>logout</h3></a>
           </Col>
         </Row>
         <Row>
           <Col xs={10} sm={4}>
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
           <Col xs={2} sm={2}>
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
               <ListGroupItem header="to do"></ListGroupItem>
               {
                 this.state.todos ? 
                 this.state.todos.map(t => 
                    !t.completed ?
                   <Todo key={t._id} handleSubmitTodo={this.handleSubmitTodo} {...t} /> :
                   '') :
                 ''
               }
             </ListGroup>
           </Col>
           <Col xs={12} sm={6}>
            <ListGroup>
              <ListGroupItem xs={2} header="completed"></ListGroupItem>
               {
                 this.state.todos ? 
                 this.state.todos.map(t => 
                  t.completed && !t.finished ?
                   <Todo  key={t._id} {...t} /> :
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