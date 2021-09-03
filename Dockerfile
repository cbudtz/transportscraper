FROM node:14-alpine as REACT
WORKDIR /tmp/
COPY /web/public/ ./public/
COPY /web/package.json ./
COPY /web/src/ ./src/
RUN yarn install
RUN yarn build


FROM node:14-alpine as MAIN
COPY /api/package.json ./api/
COPY /api/* ./api/
COPY --from=REACT /tmp/build/ ./api/static/
WORKDIR /tmp/api/
RUN yarn install
CMD ["yarn", "prod"]