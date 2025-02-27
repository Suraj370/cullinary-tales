
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pantry from "./pages/Pantry";
import Diet from "./pages/Diet";
import Options from "./components/Options";
import DetailsBoard from "./pages/DetailsBoard";
import Explore from "./pages/Explore";
import Signup from "./pages/Signup";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/options",
    element: <Options />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/pantry",
    element: <Pantry />,

  },
  {
    path: "/explore",
    element: <Explore />,
  },
  {
    path: "/diet",
    element: <Diet />,
  },
  {
    path: "/diet/:dietType",
    element: <Diet />,
  },
  {
    path: "/detailsboard",
    element: <DetailsBoard />,
  }


]);
function App() {

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
