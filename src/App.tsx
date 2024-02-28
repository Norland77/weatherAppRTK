import './App.scss'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home/Home";

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Home />}/>
      </Route>
  ))

  return (
      <RouterProvider router={router}/>
  )
}

export default App
