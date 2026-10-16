# Spliit Gemini OCR Gateway

Private backend adapter for Telegram Mini App. API key and bearer token are stored in Render environment, never in this repo. Only POST /v1/analyze with a server-held bearer token is accepted. Images are ephemeral in-memory; no raw OCR documents are logged or stored. GET /health returns public readiness. The model is gemini-3.5-flash-lite.

Render Free cold-start may exceed Telegram Serverless request deadlines. Set strict quotas in the Telegram endpoint.
