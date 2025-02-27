// pages/api/sendMessage.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { sendMessageSchema } from '../../../validation/ZodSchema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const parseData = sendMessageSchema.parse(req.body);
    const { content, sender, chat_id, userId } = parseData;

    if (!content || !sender || !userId || !chat_id) {
      return res.status(400).json({ error: "Chat ID and content are required" });
    }

    // Check if the conversation exists
    const conversation = await prisma.conversation.findUnique({
      where: { id: chat_id },
    });

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

    return res.status(200).json({ success: true, message });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
