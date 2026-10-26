# React Books

A personal project to practice **React, Node.js, TypeScript, MongoDB, and Docker** by building an application for searching and managing books.

> **Status: Work in progress.** Development currently focuses on the backend, the shared book model, services for querying external providers, and importing results into MongoDB. The REST API for managing books and the React frontend are still to be completed.

## Goals

- Search for books through external providers.
- Normalize results into a common `Book` model.
- Import books into MongoDB.
- Develop features for browsing and managing the collection through an API and web interface.
- Run the database and backend in a Docker Compose environment.

## Technologies

- **Backend:** Node.js, TypeScript, Express
- **Database:** MongoDB and the official `mongodb` driver
- **Book providers:** Open Library and Google Books API
- **Containerization:** Docker and Docker Compose
- **Frontend:** React (application features still to be developed)

## Current Project Structure

```text
.
├── backend/
│   ├── index.js
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── commands/
│       │   └── importBooks.ts
│       ├── config/
│       │   ├── mongo.ts
│       │   └── settings.ts
│       ├── interfaces/
│       │   ├── googleBooks.ts
│       │   ├── main.ts
│       │   └── openLibraryBooks.ts
│       └── services/
│           ├── bookService.ts
│           ├── googleBookService.ts
│           └── openLibraryBookService.ts
└── compose.yaml
```

File names and the project structure may change during development.

## Implemented Features

- **Shared `Book` model** to normalize data from different providers.
- **Provider-specific services** for Google Books and Open Library.
- **`getBookService()` factory** to select which service to use.
- **Category/topic filtering** through the `subject` parameter.
- **Command-line import script** using the `import-books` command.
- **MongoDB connection** through the official driver, using `MONGO_URI`.
- **Unique index** on `service