import { Navigate } from "react-router-dom";
import { AdministrationRouteFor } from "../Statics/RouteFor";
export function Index() {
  return <Navigate to={AdministrationRouteFor.Configurations} replace />;
}
