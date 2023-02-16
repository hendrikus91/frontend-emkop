import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListEmployee from './pages/ListEmployee';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import ShowEmployee from './pages/ShowEmployee';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";




const router = createBrowserRouter([
  {
    path: "/",
    element: <ListEmployee />
  },
  {
    path: "/employee/add",
    element: <AddEmployee />
  },
  {
    path: "/employee/:id/edit",
    element: <EditEmployee />
  },
  {
    path: "/employee/:id/show",
    element: <ShowEmployee />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
