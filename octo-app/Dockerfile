FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/
COPY package.json /usr/src/app
RUN npm update
COPY . /usr/src/app
EXPOSE 4200
CMD ["npm", "start"]