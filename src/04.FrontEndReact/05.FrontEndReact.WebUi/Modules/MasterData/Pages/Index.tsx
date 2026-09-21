import { Navigate } from "react-router-dom";
import { MasterDataCountriesRouteFor } from "../Features/Countries/Statics/RouteFor";
export function Index() {
  return <Navigate to={MasterDataCountriesRouteFor.Index} replace />;
}
