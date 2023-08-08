import Navbar from './Navbar';
import Accueil from './Accueil';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Create from './Create';
import Edit from './Edit';
import Search from './Search';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <div className="content">
        <Switch>
            <Route exact path="/">
              <Accueil/>
            </Route>
            <Route path="/Create">
              <Create/> 
            </Route>
            <Route path="/Edit/:id">
              <Edit />
            </Route>
            <Route path="/Search/:find">
              <Search />
            </Route>
        </Switch>     
      </div>
    </div>
    </Router>
  );
}

export default App;
