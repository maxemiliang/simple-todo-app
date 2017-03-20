FROM node:alpine
copy package.json package.json
RUN npm install

EXPOSE 1337

COPY . .
CMD ["npm", "run", "start"]
