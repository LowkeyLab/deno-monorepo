FROM denoland/deno:latest AS builder

# Create working directory
WORKDIR /app

COPY . .

# Build the app
RUN deno install --allow-scripts=npm:sharp@0.33.5

RUN deno task -f "website" build

FROM denoland/deno:latest

WORKDIR /app/website

COPY --from=builder /app/website .

# Run the app
ENTRYPOINT ["deno", "run", "--allow-read", "--allow-net", "--allow-env", "src/server.ts"]
