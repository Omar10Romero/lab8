const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const apiInventory = [
  { id: 1, name: "Yamaha MT-07", brand: "Yamaha", cc: 689, price: 8450, sucursal: "Sede Central", stock: 5 },
  { id: 2, name: "Honda CBR650R", brand: "Honda", cc: 649, price: 10200, sucursal: "Sede Norte", stock: 3 },
  { id: 3, name: "Kawasaki Ninja 400 SE", brand: "Kawasaki", cc: 399, price: 5900, sucursal: "Sede Sur", stock: 8 },
  { id: 4, name: "BMW F 850 GS Triple Black", brand: "BMW", cc: 853, price: 15400, sucursal: "Sede Central", stock: 2 }
];

const server = http.createServer((req, res) => {
  // Endpoints API RESTful
  if (req.url === "/api/v1/health" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "OK", service: "MotoConnect Enterprise API", timestamp: new Date().toISOString() }));
  }

  if (req.url === "/api/v1/motorcycles" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ count: apiInventory.length, data: apiInventory }));
  }

  // Servir Frontend Estático
  let filePath = req.url === "/" ? "/index.html" : req.url;
  const fullPath = path.join(__dirname, filePath);
  const ext = path.extname(fullPath);

  fs.readFile(fullPath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("404 - Recurso no encontrado en MotoConnect");
    }
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 MotoConnect Enterprise ejecutándose en http://localhost:${PORT}`);
  console.log(`📡 API REST disponible en http://localhost:${PORT}/api/v1/motorcycles`);
});