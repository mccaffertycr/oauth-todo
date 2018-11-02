import React from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Todo = (props) => {

  return (
    <ListGroupItem>
    {`${props.todo}    `}
      <Button bsStyle="info">
        <FontAwesomeIcon icon={'sticky-note'} />
      </Button>{'   '}
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