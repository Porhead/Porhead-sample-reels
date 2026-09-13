const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { exec } = require("node:child_process");

const root = path.join(__dirname, "dist");
const host = "127.0.0.1";
const preferredPort = Number(process.env.PORT || 8787);
const savedEditsPath = path.join(__dirname, "src", "saved-edits.json");

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

function handleApiRequest(request, response) {
  const url = new URL(request.url, `http://${host}`);
  const pathname = decodeURIComponent(url.pathname);

  if (request.method === "POST" && pathname === "/api/save-edits") {
    let body = "";
    let tooLarge = false;

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 12 * 1024 * 1024) {
        tooLarge = true;
        request.destroy();
      }
    });

    request.on("end", () => {
      if (tooLarge) return;

      try {
        const edits = JSON.parse(body || "{}");
        fs.writeFileSync(savedEditsPath, JSON.stringify(edits, null, 2));
        response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        response.end(JSON.stringify({ ok: true, saved: Object.keys(edits).length }));
      } catch (error) {
        response.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
        response.end(JSON.stringify({ ok: false, error: String(error) }));
      }
    });

    return;
  }

  sendFile(request, response);
}

function sendFile(request, response) {
  const url = new URL(request.url, `http://${host}`);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === "/") pathname = "/index.html";

  const filePath = path.normalize(path.join(root, pathname));
  if (!filePath.startsWith(root + path.sep) && filePath !== root) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": pathname.includes("/assets/") ? "public, max-age=31536000, immutable" : "no-cache",
    });
    response.end(data);
  });
}

function start(port) {
  const server = http.createServer(handleApiRequest);

  server.once("error", (error) => {
    if (error.code === "EADDRINUSE" && port < preferredPort + 9) {
      start(port + 1);
      return;
    }

    console.error(`\nStart failed: ${error.message}`);
    process.exit(1);
  });

  server.listen(port, host, () => {
    const url = `http://${host}:${port}/`;
    console.log(`\nPorhead portfolio is running: ${url}`);
    console.log("Close this window to stop the site.\n");

    if (process.env.OPEN_BROWSER !== "0") {
      const command = process.platform === "win32" ? `start "" "${url}"` : `open "${url}"`;
      exec(command, () => {});
    }
  });

  process.on("SIGINT", () => {
    server.close(() => process.exit(0));
  });
}

if (!fs.existsSync(path.join(root, "index.html"))) {
  console.error("dist/index.html was not found. Build the site first.");
  process.exit(1);
}

start(preferredPort);
