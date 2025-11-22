import http from "http";
import fs from "fs";
import url from "url";

const HOSTNAME = "127.0.0.1";
const PORT = 3000;
const FILE = "./commandes.json";

// Lire le fichier JSON
function readData() {
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

// Écrire dans le fichier JSON
function writeData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const id = parsedUrl.query.id;

  // ---------------------------------------------
  // GET /commandes  -> Lire toutes les commandes
  // ---------------------------------------------
  if (req.method === "GET" && parsedUrl.pathname === "/commandes") {
    const commandes = readData();
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(commandes));
  }

  // ----------------------------------------------------
  // GET /commande?id=xx  -> Lire une seule commande
  // ----------------------------------------------------
  if (req.method === "GET" && parsedUrl.pathname === "/commande") {
    const commandes = readData();
    const commande = commandes.find((c) => c.id == id);

    if (!commande) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Commande introuvable" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(commande));
  }

  // ------------------------------------------------
  // POST /commandes  -> Créer une nouvelle commande
  // ------------------------------------------------
  if (req.method === "POST" && parsedUrl.pathname === "/commandes") {
    let body = "";

    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const commande = readData();
      const newCommande = JSON.parse(body);

      newCommande.id = Date.now();

      commandes.push(newCommande);

      writeData(commandes);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Commande ajoutée", commande: newCommande })
      );
    });
    return;
  }

  // -------------------------------------------------------------
  // DELETE /commande?id=xx  -> Supprimer une commande existante
  // -------------------------------------------------------------
  if (req.method === "DELETE" && parsedUrl.pathname === "/commande") {
    const commandes = readData();
    const newList = commandes.filter((c) => c.id != id);

    if (newList.length === commandes.length) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: "Commande introuvable" }));
    }

    writeData(newList);

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Commande supprimée" }));
  }

  // Route inconnue
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route non trouvée" }));
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
