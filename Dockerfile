FROM node:18.2.0

WORKDIR /app
COPY ./package.json ./
RUN yarn install && yarn cache clean --force
ENV PATH=/app/node_modules/.bin:$PATH
COPY ./wait-for-it.sh /
COPY ./entrypoint.sh /
WORKDIR /app/src
COPY . .
CMD [ "/entrypoint.sh" ]
