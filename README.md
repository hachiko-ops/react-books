# React Books

A full-stack web application to create, manage, and browse books, built with React, Node.js, Express, and MongoDB.

> **Status:** Work in progress. The project is being developed incrementally, starting with the backend and database setup.

## Goals

The application aims to provide a simple platform for managing a collection of books, including their details, prices, and available languages.

Planned features:

- Browse books and view their details.
- Create, update, and delete books.
- Manage book information, including title, description, price, currency, and available languages.
- Run the development environment with Docker Compose.

## Tech stack

- **Frontend:** React
- **Backend:** Node.js and Express
- **Database:** MongoDB
- **Containers:** Docker and Docker Compose

## Getting started

### Requirements

Install Docker with Docker Compose. Node.js, npm, and MongoDB do not need to be installed directly on the host machine when the project is configured to run through Docker.

### Run the project

Clone the repository and enter its directory:

```bash
git clone <repository-url>
cd react-books
```

Build the images and start the services:

```bash
docker compose build
docker compose up
```

The backend is expected to be available on port `5174` on the host, provided that this port is configured in `docker-compose.yml`.

Once the Express server and its routes are running, you can test the API at:

```text
http://localhost:5174/api/books
```

To stop the services, press `Ctrl+C`. To stop and remove the containers, run:

```bash
docker compose down
```

MongoDB data should be stored in a named Docker volume so it persists when containers are stopped or recreated. Removing the volume will delete that persisted data.

## Planned API

The following REST endpoints are planned. They may not all be implemented yet.

### Books

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/books` | List books |
| `GET` | `/api/books/:id` | Get a book by ID |

## Data model

Each book will contain common fields such as:

- Title
- Description
- Price and currency
- Available languages

Additional fields may be introduced as the application evolves.

## Development notes

- Keep `package.json` and `package-lock.json` under version control so Docker can install the same dependencies during image builds.
- Do not commit `node_modules` or secrets such as `.env` files.
- The backend should read its MongoDB connection string from an environment variable, for example `MONGO_URI`.
- The MongoDB hostname used by the backend in Docker Compose should be the Compose service name, not `localhost`.

## License

No license has been specified yet.