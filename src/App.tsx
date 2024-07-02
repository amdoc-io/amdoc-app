import { useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Header } from "./layout/Header";
import { SideBar } from "./layout/SideBar";
import { HomePage } from "./pages/HomePage";
import { DemographicPage } from "./pages/auth/DemographicPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { DocumentationPage } from "./pages/DocumentationPage";
import { SettingsPage } from "./pages/SettingsPage";
import { DomainPage } from "./pages/DomainPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { MobileSideBar } from "./layout/MobileSideBar";

function App() {
  const token = useSelector((state: any) => state.auth.token);

  const Wrapper = () => {
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
          <div className="flex h-full max-w-screen-2xl ml-auto mr-auto w-full mt-16">
            <SideBar />
            <div className="py-[68px] px-4 lg:px-20 relative w-full">
              <MobileSideBar />
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
            {
              path: "*",
              element: <Navigate to="/" replace />,
            },
          ]
        : [
            {
              path: "/",
              element: <HomePage />,
            },
            {
              path: "/documentation",
              element: <DocumentationPage />,
            },
            {
              path: "/analytics",
              element: <AnalyticsPage />,
            },
            {
              path: "/domain",
              element: <DomainPage />,
            },
            {
              path: "/settings",
              element: <SettingsPage />,
            },
          ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
