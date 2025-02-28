FROM denoland/deno:latest

WORKDIR /app

# Copy only necessary files
COPY deno.json .
COPY website/ ./website/

WORKDIR /app/website

# Build the app

RUN deno task build

ENTRYPOINT ["deno", "task", "-f", "website", "preview"]