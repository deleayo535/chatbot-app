'use client'

import '../app/globals.css';
import React from "react";
import Image from 'next/image';

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
      <Header className='bg-white flex justify-start items-center'>
        <Typography variant="h4"><IconButton>
          <Image 
            src='/chaticon.png'  
            alt="Company Logo"
            width={40}
            height={35}
        />
          </IconButton>
        </Typography>
      </Header>
      </>
      )
}

export default TopHeader;