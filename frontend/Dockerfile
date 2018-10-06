FROM node:8.9.4

WORKDIR /weatherapp-frontend

# Copy source and install app dependencies

COPY package.json /weatherapp-frontend

RUN npm install

COPY ./src/ /weatherapp-frontend/src
COPY webpack.config.js /weatherapp-frontend

EXPOSE 8000

CMD [ "npm", "start" ]
