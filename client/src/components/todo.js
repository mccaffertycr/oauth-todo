import React from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Todo = (props) => {

  return (
    <ListGroupItem
      key={props._id}
    >
    {props.todo}
      {
        props.completed ? 
          <Button 
            bsStyle="danger"
            onClick={() => props.handleSubmitTodo(props._id, 'delete')}
          >
          <FontAwesomeIcon icon={'trash-alt'}/>
          </Button> :
          <Button 
            bsStyle="success" 
            onClick={() => props.handleSubmitTodo(props._id, 'complete')}
          >
          ✔
          </Button>
      }
    </ListGroupItem>

  )
}

export default Todo;