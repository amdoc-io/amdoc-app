import { LinkButton } from "../actions/LinkButton";
import { SecondaryLinkButton } from "../actions/SecondaryLinkButton";
import { CodeDisplay } from "../display/CodeDisplay";
import { AISvg } from "../svg/AISvg";

export const CallToActionBanner = () => {
  return (
    <div className="bg-slate-900 py-16 px-12 overflow-hidden ">
      <div className="max-w-screen-xl ml-auto mr-auto text-white flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="z-10 text-center lg:text-start flex flex-col justify-center">
            <p className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent font-medium z-10">
              Documentation
            </p>
            <p className="mt-3 text-2xl tracking-tight text-slate-400 z-10">
              Explore our comprehensive API reference documentation and
              quickstarts.
            </p>

            <div className="flex justify-center lg:justify-start items-center mt-8 gap-4">
              <LinkButton href="/" showIcon className="z-10">
                Get started
              </LinkButton>

              <SecondaryLinkButton href="/" className="z-10">
                Explore our products
              </SecondaryLinkButton>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%] z-0">
              <AISvg />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10 blur-lg" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10" />
            <CodeDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};
