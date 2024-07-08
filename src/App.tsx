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
import { CompleteSetupPage } from "./pages/auth/CompleteSetupPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { DocumentationPage } from "./pages/DocumentationPage";
import { SettingsPage } from "./pages/SettingsPage";
import { DomainPage } from "./pages/DomainPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { MobileSideBar } from "./layout/MobileSideBar";
import { OutletWrapper } from "./layout/OutletWrapper";
import { AddOrganizationPage } from "./pages/auth/AddOrganizationPage";
import { Organization } from "./model/AccountModel";
import { useMemo } from "react";

function App() {
  const token: string = useSelector((state: any) => state.auth.token);
  const setupCompleted: boolean = useSelector(
    (state: any) => state.auth.setupCompleted
  );
  const organizations: Organization[] = useSelector(
    (state: any) => state.auth.organizations
  );

  const isAuthorized = useMemo(
    () => token && setupCompleted && organizations.length > 0,
    [token, setupCompleted, organizations]
  );

  const Wrapper = () => {
    if (!isAuthorized) {
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
            <div className="py-[68px] px-4 lg:px-12 relative w-full">
              <MobileSideBar />
              <OutletWrapper>
                <Outlet />
              </OutletWrapper>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      element: <Wrapper />,
      children: !isAuthorized
        ? [
            {
              path: "/",
              element: <LoginPage />,
            },
            {
              path: "/complete-setup",
              element: <CompleteSetupPage />,
            },
            {
              path: "/add-organization",
              element: <AddOrganizationPage />,
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
