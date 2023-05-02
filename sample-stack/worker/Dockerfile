FROM node:19-alpine
WORKDIR /app

COPY ["index.mjs", "package.json", "package-lock.json", "./"]
RUN npm install --production

CMD ["node", "index.mjs"]