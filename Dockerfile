FROM node:16

WORKDIR /usr

COPY . .

EXPOSE 5000

RUN npm i
ENV NODE_ENV=development 
RUN npm run build

CMD [ "npm", "start" ]