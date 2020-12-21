FROM node:8

RUN apt-get update
RUN apt-get install -y libav-tools

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm install

RUN npm install @types/googlemaps

RUN npm install @agm/core
# Install PhantomJs dependencies
RUN apt-get install -y libfreetype6 libfreetype6-dev libfontconfig1 libfontconfig1-dev

# Force PhantomJs to use the global installed version instead of the one placed in node_modules
ENV PHANTOMJS_BIN /usr/local/bin/phantomjs


# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
