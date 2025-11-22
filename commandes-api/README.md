# Commandes API

Simple Node.js HTTP API that manages orders stored in `commandes.json`.

**Quick Summary**

- **Project:** `commandes-api`
- **Server file:** `server.js`
- **Data file:** `commandes.json`
- **Default host:** `127.0.0.1:3000`

**Prerequisites**

- Node.js (v14+ recommended)

**Run locally**

1. Open a terminal and change to the `commandes-api` folder:

```powershell
cd commandes-api
```

2. Start the server:

```powershell
node server.js
```

The server logs `Server running at http://127.0.0.1:3000/` when ready.

**Available endpoints**

- GET `/commandes` — Return the full list of commandes (JSON).
- GET `/commande?id=<id>` — Return a single commande by `id` (404 if not found).
- POST `/commandes` — Create a new commande. Send a JSON body; the server will assign an `id`.
- DELETE `/commande?id=<id>` — Delete the commande with the given `id` (404 if not found).

**Examples (curl / PowerShell)**

- Get all commandes:

```powershell
curl http://127.0.0.1:3000/commandes
```

- Get one commande (replace `123` with a real id):

```powershell
curl "http://127.0.0.1:3000/commande?id=123"
```

- Create a new commande (example payload):

```powershell
curl -X POST http://127.0.0.1:3000/commandes -H "Content-Type: application/json" -d '{"client":"Alice","items":[{"product":"Book","qty":1}],"total":19.99}'
```

- Delete a commande:

```powershell
curl -X DELETE "http://127.0.0.1:3000/commande?id=123"
```

**Data file**

- The API reads and writes orders from `commandes.json` in the same folder. The file is a JSON array of objects, each expected to contain an `id` property.

**Troubleshooting**

- If the port `3000` is in use, stop the other process or change the `PORT` constant in `server.js`.
- If you see JSON parse errors, check that `commandes.json` contains valid JSON (an array at the top level).

---

Small, single-file API for learning Node.js HTTP servers and file-backed storage.
