<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

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
- **Docker** – For containerization and simplified deployment.

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

Make sure Docker Desktop is open locally

Apply the Prisma Schema to Your Database
  npx prisma db push
  npx prisma migrate dev --name init  //running migration
  npx prisma generate  //generate prisma client

Running the Application
   yarn dev

Project Structure

├── app/                     # Next.js application code (UI and API routes
├── prisma/                  # Prisma schema and configurations
├── public/                  # Static public assets
├── pages/                   # Pages
├── types/                   # Typescript interface & enum files
├── validation/              # Zod validation schemas
├── Dockerfile               # Docker configuration for development
├── docker-compose.yml       # Docker Compose file for development
├── package.json             # Project metadata and dependencies
├── next.config.ts           # Next.js configuration (TypeScript)
├── tailwind.config.ts       # Tailwind configuration
└── README.md                # Project documentation (this file)


>>>>>>
