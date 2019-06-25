FROM node:12.4.0

ENV PORT 8080
EXPOSE 8080

COPY . app/
WORKDIR app

COPY package.json package.json
RUN npm install

CMD ["npm", "run", "start-dev"]