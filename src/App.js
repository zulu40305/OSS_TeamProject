import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CurrencyList from './pages/currencyList';
import AddCurrency from './pages/addCurrency';
import Detail from './pages/detail';
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
        {
          path: "/add_currency",
          element: <AddCurrency />,
        },
        {
          path: "/detail",
          element: <Detail />,
        },
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
