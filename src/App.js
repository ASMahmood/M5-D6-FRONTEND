import logo from "./logo.svg";
import NavBar from "./components/NavBar";
import CardsList from "./components/CardsList";
import Detail from "./components/Detail";
import Cart from "./components/Cart";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";

import BackOffice from "./components/BackOffice";

// this.props.match.params.id

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/" exact component={CardsList} />
      <Route path="/detail/:id" render={(props) => <Detail {...props} />} />
      <Route path="/backoffice" exact component={BackOffice} />
      <Route path="/cart" exact component={Cart} />
    </BrowserRouter>
  );
}

export default App;
