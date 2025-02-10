const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // 1. Find the user by their ID (replace `userId` with an actual user ID)
  const userId = 1; // Example: assuming the user has an ID of 1
  
  const newUser = await prisma.user.create({
    data: {
      name: 'John Doe', // You can choose any name here
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  
  
  console.log('Created User:', user);
  
  if (!user) {
    console.log('User not found!');
    return;
  }

  // 2. Create a new conversation linked to the user
  const conversation = await prisma.conversation.create({
    data: {
      userId: user.id,
      messages: {
        create: [
          {
            content: 'How can I help you?', // Example message from the chatbot
            sender: 'CHATBOT', // Use string values of the enum directly
            userId: user.id, // Add userId for the message
        },
        {
            content: 'Hi, I need help with my account.', // Example message from the user
            sender: 'USER', // Use string values of the enum directly
            userId: user.id, // Add userId for the message
        },
        {
          content: 'This is an AI generated response', // Example message from the chatbot
          sender: 'CHATBOT', // Use string values of the enum directly
          userId: user.id, // Add userId for the message
      },
        ],
      },
    },
  });

  console.log('Conversation created:', conversation);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
