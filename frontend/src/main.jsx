import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DisplayUserDetails from './components/DisplayUserDetails.jsx';
import { UserProvider } from './context/UserContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/userDetails",
    element: <DisplayUserDetails/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
    <RouterProvider router={router} />
    <Toaster />
    </UserProvider>
  </React.StrictMode>,
)
