import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { LayoutMain } from "./Layouts/LayoutMain";
import { LayoutLanding } from "./Layouts/LayoutLanding";
import { Index as HomeIndex } from "./Modules/Main/Pages/Index";
import { About } from "./Modules/Main/Pages/About";
import { Landing } from "./Modules/Main/Pages/Landing";
import { Login } from "./Modules/Main/Pages/Login";
import { AccessDenied } from "./Modules/Main/Pages/AccessDenied";
import { ErrorPage } from "./Modules/Main/Pages/Error";
import { NotFound } from "./Modules/Main/Pages/NotFound";
import { MySession } from "./Modules/Main/Pages/MySession";
import { Index as MyProfileIndex } from "./Modules/Main/Features/MyProfile/Pages/Index";
import { Index as MasterDataIndex } from "./Modules/MasterData/Pages/Index";
import { Index as CountriesIndex } from "./Modules/MasterData/Features/Countries/Pages/Index";
import { Index as AdministrationIndex } from "./Modules/Administration/Pages/Index";
import { Index as ConfigurationsIndex } from "./Modules/Administration/Features/Configurations/Pages/Index";
import { Index as AuditsIndex } from "./Modules/Administration/Features/Audits/Pages/Index";
import { Index as ApiCallsIndex } from "./Modules/Administration/Features/ApiCalls/Pages/Index";
import { Index as ExamplesIndex } from "./Modules/Examples/Pages/Index";
import { Buttons } from "./Modules/Examples/Pages/Buttons";
import { Typography } from "./Modules/Examples/Pages/Typography";
import { Colour } from "./Modules/Examples/Pages/Colour";
import { TextFields } from "./Modules/Examples/Pages/TextFields";
import { Icons } from "./Modules/Examples/Pages/Icons";
import { Shadow } from "./Modules/Examples/Pages/Shadow";
import { TableExample } from "./Modules/Examples/Pages/Table";
import { MasterDataRouteFor } from "./Modules/MasterData/Statics/RouteFor";
import { MasterDataCountriesRouteFor } from "./Modules/MasterData/Features/Countries/Statics/RouteFor";
import { MainRouteFor } from "./Modules/Main/Statics/RouteFor";
import { AdministrationRouteFor } from "./Modules/Administration/Statics/RouteFor";
import { ExamplesRouteFor } from "./Modules/Examples/Statics/RouteFor";
import { clearSession, getSession, hasPermission } from "./Common/Services/Session";
import { Permissions } from "./Common/Services/Permissions";
import { GlobalLoadingOverlay } from "./Common/Components/LoadingOverlay";

function RequireSession() {
  const location = useLocation();
  const session = getSession();
  if (!session?.authenticated) {
    return <Navigate to={MainRouteFor.Landing} replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}

function RequirePermission({ permission }: { permission: string }) {
  return hasPermission(permission) ? <Outlet /> : <Navigate to={MainRouteFor.AccessDenied} replace />;
}

function UnauthorizedRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const redirectToLogin = () => {
      clearSession();
      navigate(MainRouteFor.Landing, { replace: true });
    };
    window.addEventListener("soltemp-unauthorized", redirectToLogin);
    return () => window.removeEventListener("soltemp-unauthorized", redirectToLogin);
  }, [navigate]);
  return null;
}

export function App() {
  return (
    <>
      <UnauthorizedRedirect />
      <GlobalLoadingOverlay />
      <Routes>
        <Route element={<LayoutLanding />}>
          <Route path={MainRouteFor.Landing} element={<Landing />} />
          <Route path={MainRouteFor.Login} element={<Login />} />
        </Route>
        <Route element={<RequireSession />}>
          <Route element={<LayoutMain />}>
            <Route path="/" element={<HomeIndex />} />
            <Route path={MainRouteFor.About} element={<About />} />
            <Route path={MainRouteFor.MyProfile} element={<MyProfileIndex />} />
            <Route path={MainRouteFor.MySession} element={<MySession />} />
            <Route path={MainRouteFor.AccessDenied} element={<AccessDenied />} />
            <Route path={MainRouteFor.Error} element={<ErrorPage />} />
            <Route element={<RequirePermission permission={Permissions.masterData} />}>
              <Route path={MasterDataRouteFor.Index} element={<MasterDataIndex />} />
            </Route>
            <Route element={<RequirePermission permission={Permissions.countriesRead} />}>
              <Route path={MasterDataCountriesRouteFor.Index} element={<CountriesIndex />} />
            </Route>
            <Route element={<RequirePermission permission={Permissions.administration} />}>
              <Route path={AdministrationRouteFor.Index} element={<AdministrationIndex />} />
            </Route>
            <Route element={<RequirePermission permission={Permissions.configurationsRead} />}>
              <Route path={AdministrationRouteFor.Configurations} element={<ConfigurationsIndex />} />
            </Route>
            <Route element={<RequirePermission permission={Permissions.auditsRead} />}>
              <Route path={AdministrationRouteFor.Audits} element={<AuditsIndex />} />
            </Route>
            <Route element={<RequirePermission permission={Permissions.apiCallsRead} />}>
              <Route path={AdministrationRouteFor.ApiCalls} element={<ApiCallsIndex />} />
            </Route>
            <Route path={ExamplesRouteFor.Index} element={<ExamplesIndex />} />
            <Route path={ExamplesRouteFor.Buttons} element={<Buttons />} />
            <Route path={ExamplesRouteFor.Typography} element={<Typography />} />
            <Route path={ExamplesRouteFor.Colour} element={<Colour />} />
            <Route path={ExamplesRouteFor.TextFields} element={<TextFields />} />
            <Route path={ExamplesRouteFor.Icons} element={<Icons />} />
            <Route path={ExamplesRouteFor.Shadow} element={<Shadow />} />
            <Route path={ExamplesRouteFor.Table} element={<TableExample />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
