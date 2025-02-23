import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserRootLayout from "@/layouts/users/UserRoot";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import DetaildFacilityPage from "@/pages/DetaildFacility";
import ErrorPage from "@/pages/Error";
import PlaySchedule from "./pages/Owner/PlaySchedule/PlaySchedule";
import FacilityManager from "./pages/Owner/FacilityManager/FacilityManager";
import FieldManagement from "./pages/Owner/FieldManagement/FieldManagement";
import CreateandFixField from "./pages/Owner/FieldManagement/CreateandFixField/Create_Fix_Field";

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
    path: "FacilityManagement",
    element: <FacilityManager></FacilityManager>,
  },
  {
    path: "fieldmanagement",
    element: <FieldManagement></FieldManagement>,
  },
  {
    path: "createfield",
    element: <CreateandFixField></CreateandFixField>,
  },
  {
    path: "playschedule",
    element: <PlaySchedule></PlaySchedule>,
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
