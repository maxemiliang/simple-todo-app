FROM node:alpine
COPY package.json package.json
RUN npm install

COPY . .
COPY CHECKS /app/CHECKS
RUN npm run build

CMD ["npm", "run", "start"]
