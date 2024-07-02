import { useSelector } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Header } from "./layout/Header";
import { SideBar } from "./layout/SideBar";
import { HomePage } from "./pages/HomePage";
import { DemographicPage } from "./pages/auth/DemographicPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { DocumentationPage } from "./pages/DocumentationPage";
import { SettingsPage } from "./pages/SettingsPage";

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
            <div className="py-20 px-4 lg:p-20">
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
            {
              path: "/documentation",
              element: <DocumentationPage />,
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
