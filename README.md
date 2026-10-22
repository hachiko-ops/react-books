# React Books

Progetto personale per esercitarmi con **React, Node.js, TypeScript, MongoDB e Docker** costruendo un'applicazione per cercare e gestire libri.

> **Stato: work in progress.** Al momento il lavoro si concentra sul backend, sul modello condiviso dei libri, sui servizi per interrogare provider esterni e sull'importazione dei risultati in MongoDB. L'API REST per la gestione dei libri e l'interfaccia React sono ancora da completare.

## Obiettivi

- Cercare libri tramite provider esterni.
- Normalizzare i risultati in un modello `Book` comune.
- Importare i libri in MongoDB.
- Sviluppare in seguito le funzionalità per consultare e gestire la raccolta tramite API e interfaccia web.
- Eseguire database e backend in un ambiente Docker Compose.

## Tecnologie

- **Backend:** Node.js, TypeScript, Express
- **Database:** MongoDB e driver ufficiale `mongodb`
- **Provider di libri:** Open Library e Google Books API
- **Container:** Docker e Docker Compose
- **Frontend:** React (parte applicativa ancora da sviluppare)

## Struttura attuale

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

I nomi e i file potranno cambiare durante lo sviluppo.

## Funzionalità implementate

- **Modello comune `Book`** per uniformare i dati provenienti da provider diversi.
- **Servizi provider-specifici** per Google Books e Open Library.
- **Factory `getBookService()`** per selezionare il servizio da utilizzare.
- **Filtri per categoria/argomento** tramite il parametro `subject`.
- **Importazione da riga di comando** con lo script `import-books`.
- **Connessione MongoDB** tramite il driver ufficiale, usando `MONGO_URI`.
- **Indice univoco** su `service_id` per evitare identificativi duplicati nella collection.
- **Ambiente Docker Compose** con backend e MongoDB, con volume nominato per la persistenza dei dati.

## Requisiti

- Docker Engine e Docker Compose
- Una copia del repository
- Una chiave Google Books API solo se si sceglie il provider Google

Node.js e MongoDB non devono necessariamente essere installati direttamente sul computer se si lavora attraverso Docker.

## Configurazione

Il progetto usa variabili d'ambiente. **Non committare file `.env`, chiavi API o password.**

### 1. Variabili per Docker Compose

Crea un file `.env` nella root del repository con le credenziali usate da MongoDB e dalla URI del backend:

```dotenv
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=change_me
```

Sostituisci il valore di esempio con una password locale adeguata. La password deve essere compatibile con la URI MongoDB; caratteri speciali possono richiedere URL encoding.

### 2. Variabili del backend

Crea `backend/.env`:

```dotenv
GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

La chiave è necessaria solo per Google Books. Non è necessaria per le richieste a Open Library.

## Avvio

Dalla cartella principale del repository:

```bash
docker compose up --build -d
```

Il backend viene esposto sulla porta `5174` e MongoDB sulla porta `27017`.

L'endpoint attualmente presente nel server Express è:

```text
http://localhost:5174/
```

Al momento questo endpoint restituisce un semplice messaggio di stato. Gli endpoint REST per cercare e gestire i libri non sono ancora implementati.

Per vedere i log:

```bash
docker compose logs -f backend
docker compose logs -f mongodb
```

Per arrestare i container:

```bash
docker compose down
```

I dati MongoDB sono conservati nel volume nominato `mongodb_data`, quindi normalmente persistono quando i container vengono arrestati o ricreati. **Non usare `docker compose down -v` se vuoi conservare i dati**, perché rimuove anche i volumi.

## Importare libri

Lo script disponibile importa i risultati del provider selezionato nel database MongoDB. Attualmente il comando sceglie Open Library e applica il filtro di categoria configurato nello script.

Esegui:

```bash
docker compose exec backend npm run import-books
```

Il comando presuppone che i servizi siano già avviati e che MongoDB sia raggiungibile. Le richieste ai provider esterni dipendono dalla disponibilità dei rispettivi servizi e dalla connettività di rete.

> **Nota:** l'importazione usa attualmente `insertMany`. Se si esegue più volte la stessa importazione, l'indice univoco su `service_id` può causare errori per i libri già presenti. La gestione idempotente degli aggiornamenti è un miglioramento futuro.

## Modello dati

Il modello condiviso `Book` contiene attualmente:

- `service_id`: identificativo del libro presso il provider
- `title`: titolo
- `subtitle`: sottotitolo, se disponibile
- `authors`: autori, se disponibili
- `description`: descrizione, se disponibile
- `languages`: lingue, se disponibili
- `imageLinks.thumbnail`: URL della copertina, se disponibile

MongoDB genera inoltre il proprio campo `_id` per i documenti salvati.

## Prossimi passi

- Rendere coerente la gestione degli errori nei servizi provider e distinguere gli errori di rete dalle ricerche senza risultati.
- Gestire in modo robusto campi opzionali e formati diversi nelle risposte esterne.
- Rendere l'importazione ripetibile senza duplicati, ad esempio con operazioni `upsert`.
- Implementare gli endpoint REST per consultare e gestire i libri.
- Collegare il frontend React al backend.
- Aggiungere test automatici e documentare gli endpoint quando saranno disponibili.

## Sicurezza e manutenzione

- Non aggiungere `.env`, credenziali o chiavi API al repository.
- Mantenere sotto controllo versione `package.json` e `package-lock.json`.
- Non committare `node_modules`.
- In Docker Compose il backend deve usare il nome del servizio MongoDB come host, non `localhost`.

## Licenza

Non è ancora stata definita una licenza per il progetto.
