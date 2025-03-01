import { serveDir } from "@std/http/file-server";

// Get port from environment variable or use default
const port = parseInt(Deno.env.get("PORT") || "8000");

// Create a simple HTTP server
Deno.serve({ port }, (req) => {
  // Log each request
  const url = new URL(req.url);
  console.log(`${req.method} ${url.pathname}`);

  // Serve files from the dist directory
  return serveDir(req, {
    fsRoot: "dist",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
    quiet: false,
  });
});

// Note: We don't need console.log after Deno.serve as it won't be reached
// Deno.serve blocks until the server is closed
