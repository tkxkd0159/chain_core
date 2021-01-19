FROM node

ADD . /onechain
WORKDIR /onechain

RUN npm install

CMD ["npm", "start"]
