FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV NEXT_PRIVATE_LOCAL_WEBPACK=true
RUN npm install webpack && npm run build

EXPOSE 3000

CMD ["npm", "start"]
