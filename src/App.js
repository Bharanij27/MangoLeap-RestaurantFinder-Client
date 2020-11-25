import { BrowserRouter as Router, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Form from "./components/Form/Form";
import './App.css';
import Home from "./components/Home/Home";
import SelectCity from "./components/SelectCity/SelectCity";
import RestaurantDetails from "./components/RestaurantDetails/RestaurantDetails";
import Add from "./components/Add/Add";

function App() {
  return (
    <CookiesProvider>
    <Router>
      <Route path="/" exact component={Form} />
      <Route path="/selectCity" component={SelectCity} />
      <Route path="/home" component={Home} />
      <Route path="/restaurant" component={RestaurantDetails} />
      <Route path="/add" component={Add} />
    </Router>
  </CookiesProvider>
  );
}

export default App;
