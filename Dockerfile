# Dockerfile for Express API server
FROM node:20-slim
WORKDIR /app/Backend
COPY Backend/package.json /app/Backend
RUN npm install
COPY . /app
CMD ["node", "app.js"]