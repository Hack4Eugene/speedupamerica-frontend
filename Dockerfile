FROM node:12.4.0-alpine

RUN apk add ca-certificates
ENV PORT 8080
EXPOSE 8080

WORKDIR app
COPY . .
RUN npm install

CMD ["npm", "run", "start-dev"]
