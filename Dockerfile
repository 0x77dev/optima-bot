FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY . .
RUN yarn installed
CMD yarn start
