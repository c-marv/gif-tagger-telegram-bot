FROM node:18-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --production
COPY --chown=node:node ./src ./src
USER node
EXPOSE 3000
CMD ["node", "./src/index.js"]