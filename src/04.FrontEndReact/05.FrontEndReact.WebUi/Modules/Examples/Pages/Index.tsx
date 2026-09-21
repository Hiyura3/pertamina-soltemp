import { Navigate } from "react-router-dom";
import { ExamplesRouteFor } from "../Statics/RouteFor";
export function Index() {
  return <Navigate to={ExamplesRouteFor.Buttons} replace />;
}
