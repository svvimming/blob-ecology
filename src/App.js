import React from 'react';
import Map from './components/map';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div id="router">
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <NotFallPrey />
          </Route>
          <Route path="/nban">
            <Nban />
          </Route>
          <Route path="/alongwalksomewhereclose">
            <LongWalkSomewhereClose />
          </Route>
          <Route path="/aside">
            <Aside />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function NotFallPrey() {
  return (
    <Map
    portal={0}
    />
  );
}

function Nban() {
  return (
    <Map
    portal={1}
    />
  );
}

function LongWalkSomewhereClose() {
  return (
    <Map
    portal={2}
    />
  );
}

function Aside() {
  return (
    <Map
    portal={3}
    />
  );
}

export default App;
