FROM node:12.4.0

ENV PORT 8080
EXPOSE 8080

WORKDIR app
COPY . .
RUN npm install

CMD ["npm", "run", "start-dev"]