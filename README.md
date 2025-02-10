<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# Chatbot App

A modern, full-stack chatbot application built with Next.js, Express.js, Prisma, and Docker. This project delivers an interactive conversational interface with responses and is designed with scalability.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)

## Features

- **Modern UI:** Built with Next.js for a responsive and dynamic user interface.
- **Interactive Chat:** 
- **Database Integration:** Uses Prisma ORM for type-safe interactions with your database.
- **Dockerized Deployment:** Easily run the app in containers for development or production.

## Technologies Used

- **Next.js** – React framework for server-rendered applications.
- **Express.js** 
- **Prisma** – ORM for database access.
- **PostgreSQL** – for persistent storage.
- **Docker & Docker Compose** – For containerization and simplified deployment.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v21 or later)
- [Yarn](https://yarnpkg.com/)
- Docker Desktop
- [PostgreSQL](https://www.postgresql.org/) (if running the database locally)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/chatbot-app.git
   cd chatbot-app
   yarn install
Environment variebles
  create a .env file in root directory with necessary environment variable

Running the Application
   yarn dev

Project Structure

├── app/                     # Next.js application code (UI and API routes
├── prisma/                  # Prisma schema and configurations
├── public/                  # Static public assets
├── server.js                # Server entry point (if applicable)
├── Dockerfile               # Docker configuration for development
├── Dockerfile.prod          # Docker configuration for production
├── docker-compose.yml       # Docker Compose file for development
├── docker-compose.prod.yml  # Docker Compose file for production
├── package.json             # Project metadata and dependencies
├── next.config.ts           # Next.js configuration (if using TypeScript)
└── README.md                # Project documentation (this file)


>>>>>>> 830a7e8ad06cba1f0d1c75f7fd710cddca8a5de8
