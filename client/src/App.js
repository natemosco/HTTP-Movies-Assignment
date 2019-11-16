import React, { useState, useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/UpdateForm";
import axios from "axios";

const App = (props) => {
  const [savedList, setSavedList] = useState([]);
  const [initMovies, setInitMovies] = useState([]);
  const [edited, setEdited] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        console.log(res.data, "in app")
        setInitMovies(res.data)
      })
      .catch(err => console.log(err.response));
  }, [props.match.path, edited])

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} setEdited={setEdited} />
      <Route exact path="/" component={MovieList} edited={edited} setEdited={setEdited} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => <UpdateForm {...props} setInitMovies={setInitMovies} initMovies={initMovies} edited={edited} setEdited={setEdited} />}
      />
    </>
  );
};

export default withRouter(App);
