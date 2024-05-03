import React, { useState } from "react";
import { handleFetch } from "../utils";
import apiKey from "../config";

/* FEEDBACK: Excellent job with this Louis! */
function GifSearch({ setData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=3&rating=g`;

      const response = await handleFetch(searchUrl);
      setData(response);
      // FEEDBACK: if you invoke this with an empty string, you can reset
      // the form: setSearchTerm('')
      setSearchTerm("");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  /* FEEDBACK: Nice controlled form! */
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="searchInput">Enter a Search Term </label>
      <input
        type="text"
        className="form-control"
        id="searchInput"
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn-success">
        Search
      </button>
    </form>
  );
}

export default GifSearch;
