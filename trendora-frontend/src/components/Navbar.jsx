import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-5 shadow-md">
      <Link to="/" className="text-3xl font-bold">
        Trendora
      </Link>

      <div className="flex gap-5">
        <Link to="/login">Login</Link>

        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
