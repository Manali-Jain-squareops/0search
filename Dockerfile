# [TODO] update to alpine
FROM node:12

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# install dependencies first, in a different location for easier app bind mounting for local development
WORKDIR /opt

COPY package.json Makefile ./
RUN npm i
# copy in our source code last, as it changes the most
COPY . /opt

# RUN make build

CMD make dev-server
