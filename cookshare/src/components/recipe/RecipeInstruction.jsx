import React from 'react'
import { Card } from 'react-bootstrap';

const RecipeInstruction = ({instructions}) => {
   return (
     <div className='mt-5'>
       <p className='sub-titles'>Instruction:</p>
       <Card.Text>{instructions}</Card.Text>
     </div>
   );
}

export default RecipeInstruction
