import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between px-6 py-4 bg-black text-white shadow">
      <h1 className="font-bold text-xl"> PasteApp</h1>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/paste" className="hover:text-gray-300">Pastes</Link>
      </div>
    </div>
  );
};

export default Navbar;