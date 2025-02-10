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
    messages?: string;
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

export interface formattedConversationsProps {
    id: number,
          name: string,
          title?: string,
          displayNumber: number
}

// Define types for the API response
export interface APImessage {
    id: number;
    conversationId: number;
    content: string;
    sender: "USER" | "CHATBOT" | string; // adjust if needed
    timestamp?: string;
    createdAt: string;
  }
  
  export interface APIConversation {
    id: number;
    title: string; // or name, depending on what your API returns
    messages: APImessage[];
  }
  