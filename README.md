# React Books

React Books is a work-in-progress full-stack application for exploring books. It is a learning project built with React, TypeScript, Node.js, Express, MongoDB, and Docker.

The current focus is connecting the backend, book-data providers, MongoDB, and the initial React frontend. The frontend UI and its integration with the API are not implemented yet.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Bootstrap 5
- **Backend:** Node.js, TypeScript, Express
- **Database:** MongoDB using the official MongoDB Node.js driver
- **Book data:** Open Library and Google Books APIs
- **Development environment:** Docker and Docker Compose
- **Code quality:** ESLint

## Current Features

- A shared `Book` interface for normalizing book metadata from different providers.
- Separate provider services for Open Library and Google Books, selected through `getBookService()`.
- Category/subject filtering in the provider services.
- A command-line import script (`npm run import-books`) that imports books into MongoDB.
- A centralized MongoDB connection module and a unique index for imported book identifiers.
- A basic `GET /books` Express endpoint that reads the MongoDB collection and returns book records.
- A Docker Compose setup for the frontend, backend, and MongoDB.

## Project Structure

```text
.
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── index.ts
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
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── App.css
│       └── index.css
└── compose.yaml
```

The structure may change as development continues.

## Requirements

- Docker Engine and the Docker Compose plugin
- Git, to clone the repository

For running the applications directly on the host instead of through Docker, install a compatible Node.js version and npm.

## Run Locally with Docker Compose

1. Clone the repository and enter its directory:

   ```bash
   git clone https://github.com/hachiko-ops/react-books.git
   cd react-books
   ```

2. Create a root `.env` file with MongoDB credentials used by Compose:

   ```dotenv
   MONGO_ROOT_USERNAME=your_mongo_username
   MONGO_ROOT_PASSWORD=your_strong_password
   ```

3. Create `backend/.env` because Compose loads this file for the backend service. The MongoDB URI is supplied by the `environment` section in `compose.yaml`; keep any local backend-specific variables in this file as needed.

4. Build and start the services:

   ```bash
   docker compose up --build
   ```

   The Compose configuration exposes these local ports:

   - Frontend (Vite): http://localhost:5173
   - Backend: http://localhost:5174
   - MongoDB: localhost:27017

   The backend endpoint is available at http://localhost:5174/books once the backend has connected to MongoDB. The frontend is still a work in progress and does not yet provide the finished book-browsing interface.

To stop the services, press `Ctrl+C`, or run `docker compose down` in another terminal. MongoDB data is stored in the named `mongodb_data` volume and is retained when containers are removed. To delete that data as well, use `docker compose down -v`.

## Backend Commands

Run these commands from the `backend/` directory when running the backend directly with Node.js/npm:

```bash
npm install
npm start
```

To run the book import command:

```bash
npm run import-books
```

The import command currently selects Open Library and applies a `comedy` category filter in the script. External API availability and rate limits may affect imports.

When using Docker Compose, the backend service is configured to start automatically. To run the import command inside the running backend container, use:

```bash
docker compose exec backend npm run import-books
```

## Frontend Commands

Run these commands from `frontend/` for local Vite development outside Docker:

```bash
npm install
npm run dev
```

Other available scripts:

```bash
npm run build
npm run lint
npm run preview
```

The frontend is currently scaffolding only. The React application, API integration, and book-search interface still need to be implemented.

## API

### `GET /books`

Returns the books currently stored in the MongoDB `books` collection as a JSON array. The endpoint currently has no search, pagination, or filtering parameters.

Example:

```bash
curl http://localhost:5174/books
```

If the collection is empty, the endpoint returns an empty array.

## Roadmap

- [ ] Build the React book-browsing interface with Bootstrap.
- [ ] Connect the frontend to the backend API.
- [ ] Add loading, empty, and error states in the UI.
- [ ] Add search and filtering to the API and frontend.
- [ ] Improve API error responses and validation.
- [ ] Review MongoDB uniqueness rules for multiple providers.
- [ ] Add automated tests and document environment configuration in more detail.

## Project Status

This project is under active development. Features and file structure may change as the application evolves.
