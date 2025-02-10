'use client';

import '../../../../app/globals.css';

import { Box, Typography, IconButton,Drawer, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface Conversation {
    id: number;
    name: string;
}

interface SidebarProps {
open: boolean;
title: string;
conversations: Conversation[];
onClose: () => void;
handleAddConversation: () => void;
onSelectConversation: (id: number) => void;
handleOpenModal: (id: number) => void;
width?: string | number;
}

export default function SidebarDrawer({
    open,
    title,
    conversations,
    onClose,
    onSelectConversation,
    handleOpenModal,
    handleAddConversation,
    width = '80%',
  }: SidebarProps) {

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width } }}
      sx={{display: "flex"}}
    >
      <IconButton
        className="bg-[#EADDFF] w-auto rounded-xl flex justify-center mt-10 mb-3 mx-4"
        onClick={
          // onClose();
          handleAddConversation
        }
        >
        <AddCircleOutlineIcon className="text-purple-800" />
        <span className="ml-1 text-lg p-3 font-bold text-">{title}</span>
      </IconButton>
      <Box sx={{ p: 2 }}>
        <List>
          {conversations.map((conversation, index) => (
            <ListItem
              key={conversation.id}
              onClick={() => {
                onSelectConversation(conversation.id);
                onClose();
              }}
              sx={{}}
              className="bg-[#E8DEF8] my-2 p-3  rounded-lg flex justify-between items-center px-4 cursor-pointer"
            >
              <ListItemText primary={`${conversation.name} ${index + 1}`} className='text-3xl font-bold' />
              <IconButton 
                onClick={() => handleOpenModal(conversation.id)}
              >
                <DeleteIcon className="text-purple-800" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
  
  