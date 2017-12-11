# Create image based on Node.js 9
FROM node

RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm update && npm install

COPY . /usr/src/app

EXPOSE 4200

CMD ["npm", "start"]