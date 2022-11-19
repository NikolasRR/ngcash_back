FROM node:16

WORKDIR /usr

COPY . .

EXPOSE 5000

RUN npm i
ENV NODE_ENV=production 
RUN npm run build

CMD [ "npm", "start" ]