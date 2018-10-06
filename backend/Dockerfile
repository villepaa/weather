FROM node:8.9.4

WORKDIR /weatherapp-backend

# Copy source and install app dependencies

COPY package.json /weatherapp-backend

RUN npm install

COPY ./src/ /weatherapp-backend/src

EXPOSE 9000

CMD [ "npm", "start" ]
