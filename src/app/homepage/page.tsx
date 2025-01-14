
import ResponsiveAppBar from "@/components/Materialuinavbar";
import Navbarmenu from "@/components/Navbarmenu";
import Navbarmenu2 from "@/components/Navbarmenu2";
import { Col, Row } from "react-bootstrap";

export default function Page() {
    

    return (
        <><Row>
            <Col>
                <Navbarmenu />
            </Col>
        </Row>
        <Row>
            <Col>
             <Navbarmenu2 />
             <ResponsiveAppBar />
            </Col>
        </Row>
        
        
        </>

        
    )
}