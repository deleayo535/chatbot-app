import React from "react";
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { Send } from "@mui/icons-material";

interface MessageInputProps {
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: () => void;
    isTyping: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
    newMessage, 
    setNewMessage, 
    handleSendMessage, 
    isTyping
}) => {
  return (
    <div> 
        <Stack
            direction="row"
            spacing={4}
            sx={{ p: 3, borderTop: 1, borderColor: "divider" }}
            >
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Reply to Chatbot"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={isTyping}
                InputProps={{
                style: {
                    borderRadius: 28,
                    backgroundColor: '#ECE6F0',
                    paddingLeft: '12px',
                },
                endAdornment: (
                <InputAdornment position="end">

                    <IconButton
                        color="primary"
                        onClick={handleSendMessage}
                        aria-label="send message"
                    >
                        <Send />
                    </IconButton>
                </InputAdornment>
                )
            }}
            />
  </Stack></div>
  )
}

export default MessageInput