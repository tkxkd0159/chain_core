FROM node

ADD . /mychain
WORKDIR /mychain

RUN npm install

CMD ["npm", "start"]
