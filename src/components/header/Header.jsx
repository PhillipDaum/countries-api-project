import "./Header.css";
import { Link } from "react-router";

function Header() {
  return (
    <header>
      <nav className="nav">
        <h1>
          <Link to="/">Where in the World?</Link>
        </h1>
        <p>
          <Link to="/saved-countries">Saved Countries</Link>
        </p>
      </nav>
    </header>
  );
}

export default Header;
