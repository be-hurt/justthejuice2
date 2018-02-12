import React from 'react';
import Main from './Main';
import Nav from './components/Nav';

// this component will be rendered by our <___Router>
const App = () => (
  <div>
  	<div className="nav">
  		<Nav />
  	</div>
    <div className="container">
    	<Main />
    </div>
  </div>
)

export default App;