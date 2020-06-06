FROM node:12

ENV DB_CONNECTION_STRING=

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 4000

CMD ["node", "dist/index.js"]
