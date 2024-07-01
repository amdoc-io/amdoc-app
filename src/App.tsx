import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Header } from "./layout/Header";
import { SideBar } from "./layout/SideBar";
import { CallToActionBanner } from "./layout/CallToActionBanner";
import { useSelector } from "react-redux";
import { LoginPage } from "./pages/auth/LoginPage";
import { DemographicPage } from "./pages/auth/DemographicPage";

function App() {
  const token = useSelector((state: any) => state.auth.token);

  const Wrapper = () => {
    const location = useLocation();

    if (!token) {
      return (
        <div className="h-[100vh]">
          <Outlet />
        </div>
      );
    }

    return (
      <div>
        <Header />

        <div className="flex flex-col h-[100vh]">
          {location.pathname === "/" && (
            <div className="mt-16">
              <CallToActionBanner />
            </div>
          )}
          <div className="flex h-full">
            <SideBar />
            <div className="py-20 px-6 lg:p-20">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      element: <Wrapper />,
      children: !token
        ? [
            {
              path: "/",
              element: <LoginPage />,
            },
            {
              path: "/demographic-information",
              element: <DemographicPage />,
            },
          ]
        : [
            {
              path: "/",
              element: <HomePage />,
            },
          ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
