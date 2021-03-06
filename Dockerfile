FROM node:12.4.0-alpine

RUN apk add --no-cache ca-certificates
ENV PORT 8080
EXPOSE 8080

WORKDIR /app
COPY . .
RUN npm install

CMD ["node", "../dist/main.js"]
