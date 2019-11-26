FROM mhart/alpine-node:12.4.0

WORKDIR /home/app

COPY . /home/app

RUN rm -rf dist

RUN apk add --no-cache git

RUN npm i

RUN npm run build

CMD ["npm", "start"]
