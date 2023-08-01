import React, { useEffect, useState } from "react";

function SearchWeather() {
  const [search, setSearch] = useState("kochi");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componentMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=bd0b018da35ede54a5577ab83131b31d
`
      );
      if (componentMounted) {
        setData(await response.json());
        console.log(data);
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchWeather();
  }, [search]);

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let temp = data.main ? (data.main.temp - 273.15).toFixed(2) : "";
  let temp_min = data.main ? (data.main.temp_min - 273.15).toFixed(2) : "";
  let temp_max = data.main ? (data.main.temp_max - 273.15).toFixed(2) : "";

  let emoji = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main == "Clouds") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main == "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (data.weather[0].main == "Drizzle") {
      emoji = "fa-cloud-bolt";
    } else if (data.weather[0].main == "Rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (data.weather[0].main == "Snow") {
      emoji = "fa-snow-flake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <div>.....loading</div>;
  }

  const handleOnsubmit=(e)=>{
    e.preventDefault();
    setSearch(input);
    
    

}
  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center ">
          <div className="col-md-4">
            <div className="card text-white text-center  border-0">
              <img
                className="card-img"
                src={`https://source.unsplash.com/900x1500/?${data.weather[0].main}`}
                alt="Card image"
              />
              <div className="card-img-overlay">
                <form onSubmit={handleOnsubmit}>
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input
                      type="text"
                      style={{ height: "100%" }}
                      className="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required
                    />
                    <div className="input-group-append">
                      <button
                        type="sumbit"
                        style={{ height: "100%" }}
                        className="input-group-text"
                        id="basic-addon2"
                      >
                        {" "}
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                  <h2 className="card-title">{data.name}</h2>
                  <p className="card-text lead">
                    {day},{month} {date},{year} <br /> {time}{" "}
                  </p>
                  <hr />
                  <i className={`fas ${emoji} fa-4x`}></i>
                  <h1 className="fw-bolder mb-5"> {temp} &deg;C</h1>
                  <p className="lead fw-bolder mb-0">
                    {data.weather && data.weather[0].main}
                  </p>
                  <p className="lead">
                    {temp_min}&deg;C | {temp_max}&deg;C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchWeather;
