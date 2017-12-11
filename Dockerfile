FROM nginx:stable-alpine
ADD dist /usr/share/nginx/html
ADD default.conf /etc/nginx/conf.d/

# Create image based on Node.js 9
#FROM node:9

#RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
#WORKDIR /usr/src/app

#COPY octo-app/package.json /usr/src/app

#RUN npm update && npm install

#COPY octo-app /usr/src/app

#EXPOSE 4200

#CMD ["npm", "start"]