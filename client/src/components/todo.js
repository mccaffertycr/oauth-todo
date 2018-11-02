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
          <Button bsStyle="danger"><FontAwesomeIcon icon={'trash'}/></Button> :
          <Button bsStyle="success">✔</Button>
      }
    </ListGroupItem>

  )
}

export default Todo;