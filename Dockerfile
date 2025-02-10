FROM node:21.7.3

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /app

COPY package.json yarn.lock* ./

RUN yarn install
RUN yarn global add prisma
RUN yarn run build
RUN yarn run prisma:generate
EXPOSE 8082

COPY . .
# COPY ./server.js .

CMD ["yarn", " yarn run prisma:push && yarn run start:dev"]