FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 8080

CMD ["sh", "-c", "node server.js & npx --yes wait-on tcp:localhost:8080 -t 30000 && npm test"]
