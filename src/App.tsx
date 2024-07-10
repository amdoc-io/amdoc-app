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
import { PrepareApplicationPage } from "./pages/auth/PrepareApplicationPage";

function App() {
  const token: string = useSelector((state: any) => state.auth.token);
  const setupCompleted: boolean = useSelector(
    (state: any) => state.auth.setupCompleted
  );
  const prepareCompleted: boolean = useSelector(
    (state: any) => state.auth.prepareCompleted
  );
  const organizations: Organization[] = useSelector(
    (state: any) => state.auth.organizations
  );

  const isAuthorized = useMemo(
    () =>
      token && setupCompleted && organizations.length > 0 && prepareCompleted,
    [token, setupCompleted, organizations, prepareCompleted]
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
              path: "/linkedin",
              element: <LoginPage />,
            },
            {
              path: "/github",
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
              path: "/prepare-application",
              element: <PrepareApplicationPage />,
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
            {
              path: "*",
              element: <Navigate to="/" replace />,
            },
          ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
