import React, { useEffect, useState } from "react";

const Giffy = () => {
  const [gifs, setGifs] = useState();
  const [input, setInput] = useState(window.localStorage.getItem("text"));
  const [send, setSend] = useState("");

  const key = "61aT4gGfba6GS4wLHh6yGhFVbobuoee9";

  const setLocalStorage = (value) => {
    try {
      setInput(value);
      window.localStorage.setItem("text", value);
    } catch (error) {
      console.log("fallo");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=61aT4gGfba6GS4wLHh6yGhFVbobuoee9&q=${input}}}&limit=25&offset=0&rating=g&lang=en`
      );
      const dataJson = await data.json();
      // console.log(dataJson.data[0].images.downsized.url);
      setGifs(dataJson.data);
    };
    fetchData();
  }, [send]);

  const submit = () => {
    setSend(input);
  };

  return (
    <div className="big-container">
      <div className="header-container">
        <div className="search-bar-container">
          <h1>
            <span>HEY!</span> This is a
          </h1>
          <h2>GIF SEARCHER</h2>
          <h3>Please enter the keyword</h3>
          <div className="search-bar">
            <input
              placeholder="Search for GIFs"
              type="text"
              value={input}
              onChange={(e) => {
                setLocalStorage(e.target.value);
              }}
            />
            <button onClick={submit}>Search</button>
          </div>
        </div>
      </div>
      <div className="container">
        {gifs?.map((value) => {
          console.log(value);
          return (
            <div
              key={value.id}
              style={{ padding: "20px" }}
              className="gifs-container"
            >
              <a href={value.url} target="_blank">
                <div className="hover-effect">
                  <img className="gif-img" src={value.images.downsized.url} />
                </div>
              </a>
              <h2 className="gif-name">{value.title}</h2>
            </div>
          );
        })}
      </div>
      <div className="footer-text">
        <p>
          Build by <a>Agustín Bordachar</a>. All the credits here.
        </p>
      </div>
    </div>
  );
};

export default Giffy;
