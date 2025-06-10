FROM node:22 as base

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .

FROM base as development
RUN npm install
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

FROM base as production
RUN npm install --only=production
ENV NODE_ENV=production
CMD ["npm", "run", "build-and-start"]
