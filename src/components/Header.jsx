import { useContext } from "react";
import ContextPage from "../ContextPage";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
function Header() {
  const { searchTerm, setSearchTerm } = useContext(ContextPage);

  return (
    <>
      <div className="header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => {
              console.log(searchTerm);
              setSearchTerm(e.target.value);
            }}
          />

          <Link to={`/search/${searchTerm}`}>
            <SearchIcon />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
