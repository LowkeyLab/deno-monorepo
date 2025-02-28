FROM denoland/deno:latest AS builder

# Create working directory
WORKDIR /app

COPY deno.json .
COPY website/ ./website/

# Build the app
RUN deno install
RUN deno task -f "website" build

FROM denoland/deno:latest
WORKDIR /app
COPY --from=builder /app .
# Run the app
ENTRYPOINT ["deno", "task", "-f", "website", "preview"]
