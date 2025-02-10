/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import axios from 'axios';
import "../../app/globals.css";
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { styled } from "@mui/system";
import { ChatMessageProps, StyledMessageProps, ConversationProps, MessageProps, formattedConversationsProps } from "./chatbot.types";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import TopHeader from '../../app/src/components/TopHeader';
import ConfirmationModal from '../../app/src/components/Modal';
import SidebarDrawer from '../../app/src/components/sidebar/SidebarDrawer';
import ChatHeader from '../../app/src/components/chat/ChatHeader';
import MessageInput from '../../app/src/components/chat/Input';

const ChatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "90vh",
  flexDirection: "row",
  backgroundColor: "#FBF7FF",
  gap: 30,
  padding: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    height: "92vh",
    padding: theme.spacing(2),
  },
}));

const MessageArea = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
});

const MessageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isOwn",
})<MessageProps>(( {theme} )=> ({
  flex: 1,
  padding: "0px",
  paddingLeft: "16px",
  paddingRight: "16px",
  maxWidth: "100%",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));

const Message = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isOwn",
})<StyledMessageProps>(({ theme, isOwn }) => ({
  marginLeft: isOwn ?  "400px" : "0",
  padding: theme.spacing(0.8),
  paddingLeft: theme.spacing(2.6),
  paddingRight: theme.spacing(2.6),
  marginBottom: theme.spacing(0.4),
  // display: "flex",
  maxWidth: "100%",
  borderRadius: "24px",
  borderBottomLeftRadius: isOwn ? "24px" : "4px",
  borderBottomRightRadius: isOwn ? "4px" : "24px",
  alignSelf: isOwn ? "flex-end" : "flex-start",
  backgroundColor: isOwn ? "#625B71" : "#ECE6F0",
  color: isOwn ? "white" : "#49454F", 
  [theme.breakpoints.down("md")]: {
    marginLeft: isOwn ?  "0px" : "0",
  },
}));

const ChatUI: React.FC = () => {
  const [conversations, setConversations ] = useState<ConversationProps[]>([
  ]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isTypingSpinner, setIsTypingSpinner] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [messagesByConversation, setMessagesByConversation] =useState<{ [key: number]: ChatMessageProps[]}>({});
  const [isLoadingConversation, setIsLoadingConversation] = useState<boolean>(false)
  
  const handleOpenModal = (conversationId: number) => {
    setSelectedConversationId(conversationId);
    setOpenModal(true);
  }
  const handleCloseModal = () => setOpenModal(false);

  const formatDate = (timestamp?: string) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',  
      day: 'numeric',  
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  const createdFormatDate = (timestamp?: string) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleString('en-US', {
      // month: 'short',  
      day: 'numeric',  
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleAddConversation = async () => {
    setIsTypingSpinner(true);

    try {
      
      const response = await fetch("/api/addConversation", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title: "Conversation",
        userId: 1,})
      });
  
      const data = await response.json();
   if (response.ok && data.success && data.conversation) {
    const newConvo = {
      id: data.conversation.id, // Use backend-generated ID
      name: data.conversation.title,
    };

    setConversations((prev) => [...prev, newConvo]);
    setMessagesByConversation((prev) => ({ ...prev, [newConvo.id]: [] }));
    setSelectedConversationId(newConvo.id); 
    
    // Wait 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const chatbotResponse: ChatMessageProps = {
      id: Date.now() + 1,
      content: "How can I help you?",
        sender: "CHATBOT",
        timestamp: new Date().toISOString(),
        isOwn: false,
        avatar: "/bot-avatar.jpg",
        chat_id: newConvo.id,
        created_at: createdFormatDate(),
      };
      
      setMessagesByConversation(prev => ({
        ...prev,
        [newConvo.id]: [chatbotResponse], 
      }));
    } else {
      console.error("Error creating conversation:", data.error);
    }
  } catch (error) {
    console.error("Error creating conversation:", error);
  }
    setIsTypingSpinner(false);
  };

  const handleDeleteConversation = async (conversationId: number) => {
    try{
      const response = await axios.delete(`/api/deleteConversations?conversationId=${conversationId}`, {
        data: { conversationId: selectedConversationId },
      })

      const updateDisplayNumbers = (conversationsArray: ConversationProps[]) =>
        conversationsArray.map((conv, index) => ({ ...conv, displayNumber: index + 1 }));
      
      // When updating the conversations state after a deletion:
      const newConversations = conversations.filter(conv => conv.id !== conversationId);
      setConversations(updateDisplayNumbers(newConversations));

      // console.log('response:', response);
      // console.log('selectedConversationId:', selectedConversationId)
      const selectedConvIndex = conversations.findIndex((conv) => conv.id === conversationId);
      if(response.data.success) {

        const newConversations = conversations.filter((conv) => conv.id !== conversationId);

        setConversations(updateDisplayNumbers(newConversations));
        setMessagesByConversation(prev => { 
          const newMessage = {...prev};
          delete newMessage[conversationId];
          return newMessage;
        });
        setSelectedConversationId(null);
      }

    if (selectedConvIndex > 0) {
      setSelectedConversationId(conversations[selectedConvIndex - 1].id);
      } else if (conversations.length > 1) {
        setSelectedConversationId(conversations[1].id);
      } else {
        setSelectedConversationId(null);
      }
      
      setOpenModal(false);
    } catch{
      console.error("Error deleting conversation");
    } 
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      console.error("Message content is empty!");
      return;
    }
    
    if (selectedConversationId === null) {
      console.error("No conversation selected!");
      return;
    }
    // if (newMessage.trim() && selectedConversationId !== null) {
      try {
        const response = await axios.post('/api/sendMessage', {
          chat_id: selectedConversationId,
          content : newMessage,
          sender: "USER",
          userId: 1,
        });
        console.log('Response from API:',response.data);

        if (response.data.success) {
      setMessagesByConversation((prev) => ({
        ...prev,
        [selectedConversationId as number]: [
        ...(prev[selectedConversationId as number] || []), 
        {
          // id: Date.now() + 1,
          id: response.data.id,
          chat_id: selectedConversationId,
          isOwn: true,
          sender: "You",
          content: newMessage,
          timestamp: new Date().toISOString(),
          created_at: response.data.created_at,
          avatar: "/user-avatar.jpg",
        } as ChatMessageProps,
      ],
      }));
    } else {
      console.error("Error sending message:", response.data.error);
    }
  
      setNewMessage("");
      setIsTyping(true);

      // try {
        // const botResponse = await axios.get('/api/getchatresponse')
        // console.log('Bot Response:',botResponse)
        const chatresponse = await axios.post('/api/sendMessage', {
          chat_id: selectedConversationId,
          content: "This is an AI generated response",
          sender: "CHATBOT",
          userId: 1,
        });

        setTimeout(() => {
        const chatbotResponse: ChatMessageProps = {
          id: Date.now() + 1,
          content: 'This is an AI generated response',
          sender: "CHATBOT",
          timestamp: new Date().toISOString(),
          isOwn: false,
          avatar: "/bot-avatar.jpg",
          chat_id: selectedConversationId,
          created_at: createdFormatDate(),
        };
      
        console.log('Response from API:',chatresponse.data);

        if (chatresponse.data.success) {
      
        setMessagesByConversation((prev) => ({...prev, 
          [selectedConversationId]: [...(prev[selectedConversationId] || []), chatbotResponse],
      }));
          setIsTyping(false);
    }
  }, 2000);
      } catch (error) {
        console.error('Error',error);
    }
  };

  const handleSelectConversation = async (id: number) => {
    setSelectedConversationId(id);
  };
  
  useEffect(() => {
    setIsLoadingConversation(true);
    const fetchConversations = async () => {
      try {
        const response = await axios.get("/api/conversations");
        console.log("Conversation:", response)
        if (response.data.length === 0) {
          console.warn("No conversation found.")
        }

        const formattedConversations = response.data.map((conv: formattedConversationsProps, index: number) => ({
          id: conv.id,
          name: conv.title,
          displayNumber: index + 1
        }));

        setConversations(formattedConversations);

         // Populate messages for each conversation
          const messagesData: { [key: number]: ChatMessageProps[] } = {};
          response.data.forEach((conv: any) => {
            messagesData[conv.id] = conv.messages.map((msg: any) => ({
              id: msg.id,
              chat_id: msg.conversationId,
              content: msg.content,
              sender: msg.sender === "USER" ? "You" : "Chatbot",
              timestamp: msg.timestamp,
              created_at: formatDate(msg.createdAt),
              isOwn: msg.sender === "USER",
              avatar: msg.sender === "USER" ? "/user-avatar.jpg" : "/bot-avatar.jpg",
            }));
          });
          setMessagesByConversation(messagesData);

          setTimeout(() => {
            setIsLoadingConversation(false);
          }, 2000);
        } catch (error) {
          console.error('Error fetching conversations:',error);
        }
    };
    fetchConversations();
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  
  const selectedConversation = conversations.find(conv => conv.id === selectedConversationId);

  return (
    <div className='bg-[#FBF7FF]'>
      <TopHeader />
      <ChatContainer>
        <ConfirmationModal 
          open={openModal} 
          title={selectedConversation ? `Are you sure you want to delete Conversation ?` : "Are you sure you want to delete Conversation ?"} 
          onClose={handleCloseModal} 
          onConfirm={() => selectedConversationId && handleDeleteConversation(selectedConversationId)} />
        {/* Hamburger Icon for mobile */}
        {isMobile && (
          <IconButton
            onClick={() => setIsSidebarOpen(true)}
            sx={{ position: "absolute", top: 16, right: 16, zIndex: 1000 }}
            >
              <MenuRoundedIcon fontSize="large"/>
          </IconButton>
        )}

    {!isMobile && (
          <div className='flex-col'>
          <IconButton
            className="bg-[#EADDFF] w-full rounded-xl flex justify-center mb-4"
            onClick={handleAddConversation}
          >
            <AddCircleOutlineIcon className="text-purple-800" />
            <span className="ml-1 text-xl p-3 font-bold text-">Conversations</span>
          </IconButton>
          <Paper elevation={0} sx={{ width: 340, p: 0, backgroundColor: "#FBF7FF" }} >
            
            {isLoadingConversation ? (
              <Box sx={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",  
                height: "100%"
                }}>
                <CircularProgress sx={{ color: "#A594F9" }} />
              </Box>
            ):(
                
            <List>
              {conversations.map((conversation, index) => (
                <ListItem
                  key={conversation.id}
                  onClick={() => handleSelectConversation(conversation.id)}
                  className={`my-2 p-3 rounded-lg flex justify-between text-lg items-center px-4 cursor-pointer
                  ${selectedConversationId === conversation.id ? "!bg-purple-300" :"bg-[#E8DEF8] hover:bg-purple-200" }
                  `}
                >
                <div className='flex justify-center items-center px-4 gap-4 '>
                  <ListItemText primary={`${conversation.name} ${index + 1}`}/>
                </div>
                  
                <IconButton 
                  onClick={() => handleOpenModal(conversation.id)}
                  >
                    <DeleteIcon className="text-purple-800" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </div>
    )}

    <SidebarDrawer 
      title={'Conversation'}
      open={isSidebarOpen}
      conversations={conversations}
      onClose={() => setIsSidebarOpen(false)}
      handleOpenModal={handleOpenModal}
      onSelectConversation={handleSelectConversation}
      handleAddConversation={handleAddConversation}
    />
      <MessageArea className='chat scroll'>
          <Paper 
            elevation={0} 
            className='rounded-3xl'
            sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: 'space-between' }}
          >
          <ChatHeader />
            {selectedConversationId !== null ? (
              <Box sx={{ display: "flex", flexDirection: 'column', overflowY: 'auto', flex: 1 }}>
                {isTypingSpinner ? (
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
                      <CircularProgress sx={{ color: "#A594F9" }} />
                  </Box> 
                ) : (
                  messagesByConversation[selectedConversationId]?.map((message: ChatMessageProps, index: number) => (
                   <Box 
                      key={message.id || `message-${index}`} 
                      sx={{ display: "flex",  flexDirection: message.sender === "You" ? "row-reverse" : "row", mb: 2}}
                    >
                    <MessageContainer>
                    {index === 0 && 
                      message.timestamp &&(
                      <Typography
                        variant="caption"
                        sx={{ textAlign: 'center', fontSize: 16, fontWeight: 600, display: 'block', color: 'black', mt: 1, mb: 2 }}
                        >
                      {formatDate(message.timestamp)}
                    </Typography>
                    )}
                    <Box
                      // key={message.id}
                      sx={{ 
                        display: "flex",
                        flexDirection: message.sender === "You" ? "row-reverse" : "row", 
                        mb: 0,
                       }}
                    >
                      <Avatar
                        src={message.avatar}
                        alt={message.sender}
                        sx={{ mx: 1 }}
                      />
                      <Box>
                        <Message isOwn={message.isOwn} className=''>
                          <Typography variant="body2" className="text-lg">{message.content}</Typography>
                        </Message>
                        <Typography
                          variant="caption"
                          sx={{ ml: 1, color: "text.secondary" }}
                        >
                          {message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : ""}
                        </Typography>
                      </Box>
                    </Box>
                  </MessageContainer>
                </Box> 
              ))
            )}
            </Box> 
            ) : null}
          {isTyping && (
            <Box sx={{ display: "flex", justifyItems: 'center', alignItems: "flex-start", marginBottom: 2, mx: 3 }}>
            <Avatar 
            sx={{ mx: 1 }}
            src={'/bot-avatar.jpg'}
            alt={'bot avatar'}
            />
            <Message isOwn={false}  sx={{ display: "flex", alignItems: "center"}}>

            <Typography 
              variant="caption" 
              sx={{ ml: 1, color: "text.secondary", fontSize: "16px", display: "flex", alignItems: "center" }}
              className="text-gray-500 text-lg"
            >
              <span className="typing font-bold text-xl"></span>
            </Typography>
            </Message>
            </Box>
          )}

          <div ref={messageEndRef} />
        <MessageInput 
          newMessage={newMessage} 
          setNewMessage={setNewMessage} 
          handleSendMessage={handleSendMessage} 
          isTyping={false}
        />
      </Paper>

      </MessageArea>
    </ChatContainer>
  </div>
  );
};

export default ChatUI;
