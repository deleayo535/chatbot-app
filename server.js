// server.js
const express = require('express');
const next = require('next');
const cors = require("cors");
const { PrismaClient } = require('@prisma/client');

const  { 
  addConversationSchema, 
  deleteConversationSchema, 
  sendMessageSchema
} = require('./validation/ZodSchema');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const prisma = new PrismaClient();

// Prepare Next.js app
app.prepare().then(() => {
  const server = express();
  
  server.use(cors()); 
  // Middleware to parse JSON bodies
  server.use(express.json());

  // Custom API route
  server.post('/api/addConversation', async (req, res) => {
    try {
      const validatedData = addConversationSchema.parse(req.body);
      const { title, userId } = validatedData;

      if (!title || !userId) {
        return res.status(400).json({ error: 'Missing title or userId' });
      }

      const newConversation = await prisma.conversation.create({
        data: {
          userId,
          title,
          messages: {
            create: [
              {
                content: "How can I help you?",
                sender: "CHATBOT",
                userId,
              },
            ],
          },
        },
        include: { messages: true },
      });

      res.status(200).json({ success: true, conversation: newConversation });
    } catch (error) {
      console.error('Error in /api/addConversation:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  server.get('/api/conversations', async (req, res) => {
    try {
      const conversations = await prisma.conversation.findMany({
        include: { messages: true },
      });

      return res.status(200).json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  server.delete('/api/deleteConversations', async (req, res) => {
    try {
      // const body = req.query || {};
      const validatedQuery = deleteConversationSchema.parse(req.query);
  
      const parsedConversationId = parseInt(validatedQuery.conversationId, 10);
      // console.log('Received conversationId from query:', conversationId)
      
        const conversation = await prisma.conversation.findUnique({
            where: { id: parsedConversationId },
          });
  
        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
          }
      
          // Optional: If I want to delete related messages
          await prisma.message.deleteMany({
            where: { id: parsedConversationId },
          });
  
      const deletedConversation = await prisma.conversation.delete({
        where: { id: parsedConversationId },
      });
    
        return res.status(200).json({ success: true, deletedConversation });
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: "Validation error", details: error.errors });
        }
        console.error("🔥 Error deleting conversation:", error);
        return res.status(500).json({ error: "Error processing delete", details: error.message});
      }
  });

  server.post('/api/sendMessage', async (req, res) => {
    if (req.method === "POST") {
      const parseData = sendMessageSchema.parse(req.body);
      const { content, sender, chat_id , userId} = parseData;
  
      if ( !content || !sender || !userId || !chat_id) {
        return res.status(400).json({ error: "Chat ID and content are required" });
      }
  
      try {
        // First, check if the conversation exists
        const conversation = await prisma.conversation.findUnique({
          where: { id: chat_id },
        });
        
        console.log('conversation responses:', conversation);
        if (!conversation) {
          return res.status(404).json({ error: "Conversation not found" });
        }
  
        const message = await prisma.message.create({
          data: {
            userId,
            conversationId: chat_id,
            content,
            sender,
          },
        });
  
        res.status(200).json({
          success: true,
          message});
      } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
      }
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  })

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  const port = process.env.APP_PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Server ready on http://localhost:${port}`);
  });
});
