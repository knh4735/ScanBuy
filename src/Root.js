import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resize } from "./reducers/view";
import { Home, Shop } from "./pages";

const Root = ({ store }) => {
  const dispatch = useDispatch();

  window.addEventListener("resize", e => {
    dispatch(resize(window.innerWidth, window.innerHeight));
  });

  return (
    <Router basename="/">
      <Route exact path="/" component={Home} />
      <Route path="/shop" component={Shop} />
    </Router>
  );
};

export default Root;
