import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute, {
  ProtectedLoginRoute,
} from "./Component/ProtectedRoute/ProtectedRoute";
import CategoryDetail from "./Pages/CategoryDetail";
import ProductDetail from "./Pages/ProductDetail";


function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/product",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/contact",
          element: (
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          ),
        },
        {
          path:'category/:_id',
          element: (
            <ProtectedRoute>
              <CategoryDetail />
            </ProtectedRoute>
          ),
        },
        {
          path:'product/:_id',
          element: (
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: (
            <ProtectedLoginRoute>
              <Login />
            </ProtectedLoginRoute>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedLoginRoute>
              <Register />
            </ProtectedLoginRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
