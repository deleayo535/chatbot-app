'use client'

import '../../../app/globals.css';
import React from "react";
import {
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";

const Header = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    backgroundColor: "#fffff",
    height: "10vh",
    textAlign: "start",
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderRadius: "0 0 10px 10px",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(.4),
      height: "8vh",
    },
  }));

const TopHeader = () =>{
    return (
      <>
      <Header className='bg-white'>
        <Typography variant="h4"><IconButton><img src='/chaticon.png'></img></IconButton></Typography>
      </Header>
      </>
      )
}

export default TopHeader;