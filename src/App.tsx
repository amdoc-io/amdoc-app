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

function App() {
  const Wrapper = () => {
    const location = useLocation();

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
      children: [
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
