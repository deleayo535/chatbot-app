// pages/api/deleteConversations.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../src/lib/prisma';
import { deleteConversationSchema } from '../../../validation/ZodSchema';
import { z } from 'zod';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    // Parse query parameters using Zod
    const validatedQuery = deleteConversationSchema.parse(req.query);
    const parsedConversationId = parseInt(validatedQuery.conversationId, 10);

    const conversation = await prisma.conversation.findUnique({
      where: { id: parsedConversationId },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Optionally, delete related messages if desired:
    await prisma.message.deleteMany({
      where: { conversationId: parsedConversationId },
    });

    const deletedConversation = await prisma.conversation.delete({
      where: { id: parsedConversationId },
    });

    return res.status(200).json({ success: true, deletedConversation });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Validation error", details: error.errors });
    }
    console.error("Error deleting conversation:", error);
    return res
      .status(500)
      .json({ error: "Error processing delete", details: error.message });
  }
}
