import { useEffect } from "react";
import globalVar from "./assets/store.js";
import {Container, Spinner } from "react-bootstrap";

export default function AppShell({ children }) {
  const initAuthListener = globalVar(s => s.initAuthListener);
  const loading = globalVar(s => s.loading);

  useEffect(() => { initAuthListener(); }, [initAuthListener]);
  if (loading) return <Container fluid className="appShell-loading">
 <Spinner animation="border" variant="primary" />
 <span className="mt-3 text-muted">The page will be ready in a few moments...</span>
</Container>

  return children
}
