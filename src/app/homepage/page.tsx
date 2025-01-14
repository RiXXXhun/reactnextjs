
import ResponsiveAppBar from "@/components/Materialuinavbar";
import Materialuisignin from "@/components/Materialuisignin";
import Materiualuifaq from "@/components/Materiualuifaq";
import Materialuifooter from "@/components/Materiualuifooter";
import MyMap from "@/components/Mymap";
import MySwiper from "@/components/MySwiper";
import { Col, Row } from "react-bootstrap";

export default function Page() {
    

    return (
        <>
        <Row>
            <Col>
             <ResponsiveAppBar />
            </Col>
        </Row>
        <Row>
            <MySwiper />
        </Row>
        <Row>
            <Materialuisignin />
        </Row>
        <Row>

        </Row>
        <Row>
            <MyMap />
        </Row>
        <Row>
           
           <Materiualuifaq />
        </Row>
        <Row>
            <Materialuifooter />
        </Row>
        
        </>

        
    )
}