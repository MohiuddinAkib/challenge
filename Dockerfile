FROM node

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

# for typescript
RUN yarn build

RUN ls ./dist

CMD ["yarn", "start"]