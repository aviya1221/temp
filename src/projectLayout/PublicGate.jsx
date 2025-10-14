
import { Navigate, Outlet } from "react-router-dom";
import  globalVar  from "../assets/store.js";
import { Spinner } from "react-bootstrap";

export default function PublicGate() {
const user = globalVar(s => s.user);
const loading = globalVar(s => s.loading);

  if (loading) return (<Spinner/>);
  return user ? <Navigate to="/" replace />:<Outlet/> ;

}
