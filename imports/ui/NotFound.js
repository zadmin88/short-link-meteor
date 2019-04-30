import React from 'react';
import { Link } from 'react-router';

// export default class NotFound extends React.Component {
//   render() {
//     return  <p>Not NotFound component</p>;
//   }
// }

export default () => {
  return  (
    <div className="boxed-view">
    <div className="boxed-view__box">
        <h1>Pque cagada</h1>
        <p>sorry mothrfckr</p>
        <Link to="/" className="button button--link">Go home</Link>
      </div>
    </div>



    )
};

// }
