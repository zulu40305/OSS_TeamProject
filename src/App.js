import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CurrencyList from './pages/currencyList';
import Layout from './layout/layout';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <CurrencyList />,
        },
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
