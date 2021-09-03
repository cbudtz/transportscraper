FROM node:14-alpine
WORKDIR /tmp/
COPY /api/package.json ./api/
COPY /api/* ./api/
COPY /api/static/ ./api/static/
WORKDIR /tmp/api/
CMD ["yarn", "prod"]