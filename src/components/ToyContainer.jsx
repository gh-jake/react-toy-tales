import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  // console.log("props", props);
  return(
    <div id="toy-collection">
      {/* Render the collection of ToyCards */
        props.toysArray.map(toyObj => <ToyCard key={toyObj.id} toy={toyObj} likeToy={props.likeToy} deleteToy={props.deleteToy}/>)
      }
    </div>
  );
}

export default ToyContainer;
