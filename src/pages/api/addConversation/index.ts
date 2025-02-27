// pages/api/addConversation.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { addConversationSchema } from '../../../validation/ZodSchema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

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
      // console.log('Request body:', req.body, newConversation);

    return res.status(200).json({ success: true, conversation: newConversation });
  } catch (error) {
    console.error('Error in /api/addConversation:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
