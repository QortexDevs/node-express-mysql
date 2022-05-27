FROM node:18.2.0

WORKDIR /app
COPY ./package.json ./
RUN yarn install && yarn cache clean --force
ENV PATH=/app/node_modules/.bin:$PATH

WORKDIR /app/src
COPY . .
CMD [ "node", "server.js" ]
