# Catatin - Notes & Project Management

![Catatin](/public/images/demo.png)

Catatin is a comprehensive note-taking and project management application built with Next.js, Prisma, and Tailwind CSS.

## Features

- Authentication: Register and login to your account.
- Notes: Create, edit, and organize your notes.
- To-Do List: Manage your tasks and deadlines.
- Board: Visualize projects.
- Kanban: Use the Kanban methodology for efficient workflow.
- Archives and Favorites: Save and access important notes and tasks easily.

## Technologies Used

- Frontend: Next.js, Tailwind CSS, Shadcn
- Backend: Prisma ORM, MongoDB Atlas
- Authentication: Next-Auth
- Whiteboard: Tldraw

## Demo
[Catatin Demo Preview](https://catatin-notes-app.vercel.app)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/rezakurniawan88/catatin.git
```

2. Install dependencies:
```bash
cd catatin
npm install
```

3. Set up environment variables :
```bash
cp .env.example .env
```
After that, edit the .env file according to the environment variables.

4. Set up MongoDB Atlas:
- Register an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
- Create a MongoDB Atlas cluster.
- Create a database and a user.

5. Run prisma generate:
```bash
npx prisma generate
```

6. Start the development server:
```bash
npm run dev
```
