FROM node:alpine
copy package.json package.json
RUN npm install

EXPOSE 80

COPY . .
CMD ["npm", "run", "start"]
