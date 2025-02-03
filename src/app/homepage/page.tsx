"use client";

import Materialuiinform from "@/components/Materialuiinform";
import ResponsiveAppBar from "@/components/Materialuinavbar";
import Materiualuifaq from "@/components/Materiualuifaq";
import Materialuifooter from "@/components/Materiualuifooter";
import MyMap from "@/components/Mymap";
import MySwiper from "@/components/MySwiper";
import { Col, Row } from "react-bootstrap";
import { Box, Slide } from "@mui/material";
import { useState, useEffect } from "react";
import Materialuiline from "@/components/Materialuiline";
import ScrollToTopButton from "@/components/Materialuiscrollbutton";
import Materialuiscrollbutton from "@/components/Materialuiscrollbutton";
import Materialuisignin from "@/components/Materialuisignin";
import Materialuiquicksearch from "@/components/Materialuiquicksearch";

export default function Page() {
    const [open, setOpen] = useState(false);

    

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: "#1c2331",
                minHeight: "100vh",
                color: "white",
                padding: "16px",
            }}
        >
            <Slide direction="right" in={open} mountOnEnter unmountOnExit>
                <Row>
                    <Col>
                        <ResponsiveAppBar />
                    </Col>
                </Row>
            </Slide>

            <Slide direction="left" in={open} mountOnEnter unmountOnExit>
                <Row>
                    <Materialuiinform />
                </Row>
            </Slide>

            <Row>
                <Materialuiline />
            </Row>

            <Slide direction="right" in={open} mountOnEnter unmountOnExit>
                <Row>
                    <Materialuiquicksearch />
                    <MySwiper />
                </Row>
            </Slide>

            <Row>
                <Materialuiline />
            </Row>

            <Slide direction="left" in={open} mountOnEnter unmountOnExit>
                <Row>
                    <MyMap />
                </Row>
            </Slide>

            <Row>
                <Materialuiline />
            </Row>

            <Slide direction="right" in={open} mountOnEnter unmountOnExit>
                <Row>
                    <Materiualuifaq />
                </Row>
            </Slide>


            <Slide direction="left" in={open} mountOnEnter unmountOnExit>
                <Row>
                    <Materialuifooter />
                </Row>
            </Slide>

            <Materialuiscrollbutton />
        </Box>
    );
}
