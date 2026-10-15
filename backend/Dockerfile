FROM node:22-alpine as build

WORKDIR /backend
COPY package*.json ./
RUN npm ci 

COPY . .

EXPOSE 5174

CMD ["npm","start"]

