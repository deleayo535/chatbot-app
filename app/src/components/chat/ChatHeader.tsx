import React from 'react'
import { styled } from "@mui/system";
import { Avatar, Box } from '@mui/material';

const Header = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: 'transparent',
    textAlign: "center",
    alignItems: "center",
    // borderBottom: `1px solid ${theme.palette.divider}`,
    borderRadius: "12px 12px 0 0",
}));
  
const ChatHeader = () => {
  return (
    <div>
        <Header className='border-b-2 flex align-center gap-4'>
            <Avatar
            src={`/bot-avatar.jpg`}
            alt='bot-avatar'
            sx={{ mx: 1 }}
            className='w-[50px] h-[50px]'
        />
        <span className='font-bold text-xl'>Chatbot</span>
        </Header>
    </div>
  )
}

export default ChatHeader