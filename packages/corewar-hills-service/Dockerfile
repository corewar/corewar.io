FROM node:12 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:12

ENV DB_CONNECTION_STRING=
ENV BUS_CONNECTION_STRING=

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json /usr/src/app/

RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist /usr/src/app

EXPOSE 4000

CMD ["node", "index.js"]
