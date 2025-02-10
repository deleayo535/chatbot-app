export interface StyledMessageProps {
    isOwn: boolean;
}

export interface MessageProps {
    isOwn?: boolean;
}

export interface ChatMessageProps {
    id: number;
    chat_id: number ;
    content: string;
    sender: "You" | "CHATBOT";
    timestamp?: string;
    isOwn: boolean;
    avatar: string;
    created_at: string;
}
  
export interface ChatbotProps {
    id: number;
    name: string;
    avatar: string;
    online: boolean;
}

export interface ConversationProps {
    id: number;
    name: string;
    displayNumber?: number;
    created_at?: string;
}