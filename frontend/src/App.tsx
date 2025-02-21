import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserRootLayout from "@/layouts/users/UserRoot";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import DetaildFacilityPage from "@/pages/DetaildFacility";
import ErrorPage from "@/pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserRootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "detail/:id",
        element: <DetaildFacilityPage />,
      },
    ],
  },
  {
    path: "owner",
    element: <></>,
  },
  {
    path: "test",
    element: (
      <div className="flex bg-white min-h-screen justify-center items-center"></div>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
