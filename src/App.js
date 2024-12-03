import { useState, useEffect } from "react";

// import logo from "./logo.svg";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredmonsters, setFilteredMonsters] = useState(monsters);

  // console.log("render");

  useEffect(() => {
    // console.log("fetch effect");
    async function fetchData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await response.json();
      setMonsters(users);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // console.log("filter effect");
    const newFilteredmonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredmonsters);
  }, [monsters, searchField]);

  const onSearchChange = (e) => {
    // console.log("search event");
    const searchFieldSting = e.target.value.toLocaleLowerCase();
    setSearchField(searchFieldSting);
  };

  return (
    <div className='App'>
      <h1 className='app-title'>Monster Rolodex k</h1>
      <SearchBox
        className='search-box'
        placeholder='search monsters'
        onChangeHandler={onSearchChange}
      />
      <CardList monsters={filteredmonsters} />
    </div>
  );
};

export default App;
