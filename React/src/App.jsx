import React  from 'react';
import {Route, Switch} from 'react-router-dom';
import Receipt from './Receipt.jsx';
import Register from './Register.jsx';
import CarDetails from './CarDetails.jsx';
import Filter from './Filter.jsx'
const App = ()=> 
{
  return(
      <>
      <Switch>
        <Route exact path='/' component={Register}/>
        <Route exact path='/register/:id' component={Register}/>
        <Route exact path='/receipt/:number' component={Receipt}/>
        <Route exact path='/car-details/' component={CarDetails}/>
        <Route exact path='/car-details/:id' component={CarDetails}/>
        <Route exact path='/filter/' component={Filter}/>
        
    
            
      </Switch> 
      </>
  );
}
export default App;