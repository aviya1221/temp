
import SideBar from "../pages/SideBar";
import { Outlet } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import globalVar from '../assets/store.js'

export default function AppLayout() {

  const{showSideBar,closeSideBar,openSideBar}=globalVar();

  return (
    <Container fluid className="m-0 p-0 appLayout-cont">
      <Row style={{ paddingLeft: ".625rem",background:" linear-gradient(to bottom right, rgba(155, 220, 237, 0.87), rgba(237, 237, 219, 0.87))" }}>
        <Col
          xs={5}
          s={3}
          md={3}
          lg={2}
          className={`d-flex flex-column p-0 align-items-start sidebar-cont ${
            showSideBar ? "show" : "hidden"
          }`}>
          <SideBar btnStatus={closeSideBar} />
        </Col>

<Col
  xs={showSideBar ? 7 : 12}
  s={showSideBar ? 9 : 12}
  md={showSideBar ? 9 : 12}
  lg={showSideBar ? 10 : 12}
  className="d-flex p-0 flex-column border-2 position-relative"
>
  {!showSideBar && (
    <div className="d-flex justify-content-start p-2">
      <Button onClick={() => openSideBar()}>Menu</Button>
    </div>
  )}

  <div className="flex-grow-1 d-flex justify-content-center align-items-center outlet">
    <Outlet/>
  </div>
</Col>

      </Row>
    </Container>
  );
}
