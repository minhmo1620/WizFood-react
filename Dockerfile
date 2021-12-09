FROM node:16.13-alpine

WORKDIR /root/wizfood-react

COPY package*.json /root/wizfood-react/
RUN npm install

COPY . /root/wizfood-react/

CMD ["npm", "start"]
