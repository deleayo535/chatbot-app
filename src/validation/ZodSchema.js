const { z } = "zod";

const addConversationSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  userId: z.number({ required_error: "User ID is required" }),
});

const deleteConversationSchema = z.object({
  conversationId: z
    .string()
    .regex(/^\d+$/, "Conversation ID must be a numeric string"),
});


const sendMessageSchema = z.object({
  chat_id: z.number({
    required_error: "chat_id is required",
    invalid_type_error: "chat_id must be a number",
  }),
  content: z.string().min(1, "Content cannot be empty"),
  sender: z.enum(["USER", "CHATBOT"], {
    required_error: "sender is required",
    invalid_type_error: "sender must be either USER or CHATBOT",
  }),
  userId: z.number({
    required_error: "userId is required",
    invalid_type_error: "userId must be a number",
  }),
});

module.exports = { 
  addConversationSchema, 
  deleteConversationSchema, 
  sendMessageSchema 
};
