FROM docker.io/node:23.4-alpine

WORKDIR /app

COPY dist/apps/server/package.json dist/apps/server/package-lock.json ./
RUN npm install

COPY dist/apps/server .

EXPOSE 3333
CMD ["node", "main.js"]
