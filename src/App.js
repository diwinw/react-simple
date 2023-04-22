
import './App.css';
import LoginPage from './components/loginPage/LoginPage';
import SignupPage from './components/signupPage/SignupPage';
import PackagesPage from './components/packagePage/PackagePage';
import CreatePackagePage from './components/packagePage/CreatePackagePage';
import UpdatePackagePage from './components/packagePage/UpdatePackagePage';
import Search from './components/packagePage/Search';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (

   <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/package" component={PackagesPage} />
        <Route exact path="/create" component={CreatePackagePage} />
        <Route exact path="/update" component={UpdatePackagePage} />
        <Route exact path="/search" component={Search} />
      </Switch>
    </Router>

 
  );
}

export default App;
