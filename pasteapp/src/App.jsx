import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Paste from "./pages/Paste";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/paste",
    element: (
      <>
        <Navbar />
        <Paste />
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;