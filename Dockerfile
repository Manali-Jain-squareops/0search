FROM node:12

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# install dependencies first, in a different location for easier app bind mounting for local development
WORKDIR /opt

COPY package.json Makefile ./
RUN npm install --unsafe-perm --no-package-lock

# copy in our source code last, as it changes the most
COPY . /opt

RUN make build
