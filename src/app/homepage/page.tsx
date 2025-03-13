"use client";

import Materialuiinform from "@/components/Materialuiinform";
import ResponsiveAppBar from "@/components/Materialuinavbar";
import Materiualuifaq from "@/components/Materiualuifaq";
import Materialuifooter from "@/components/Materiualuifooter";
import MyMap from "@/components/Mymap";
import MySwiper from "@/components/MySwiper";
import { Col, Row } from "react-bootstrap";
import { Box, Slide, CircularProgress, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Materialuiline from "@/components/Materialuiline";
import Materialuiscrollbutton from "@/components/Materialuiscrollbutton";
import Materialuiquicksearch from "@/components/Materialuiquicksearch";
import MaterialuiCookie from "@/components/MaterialuiCookie";

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
            setOpen(true);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#1c2331",
                    color: "white",
                }}
            >
                <CircularProgress color="primary" />
                <Typography sx={{ marginTop: 2, fontSize: "18px" }}>
                    Jelenleg az oldal betölt, kérem várjon...
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <title>PLÁZAÁSZ Főoldal</title>

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

                <MaterialuiCookie />

                <Materialuiscrollbutton />
            </Box>
        </>
    );
}
