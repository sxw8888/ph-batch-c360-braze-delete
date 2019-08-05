FROM node:8.10.0

RUN mkdir -p /app /logs
COPY . /app
WORKDIR /app
RUN npm install