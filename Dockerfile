FROM node:18-slim as build

RUN apt-get update || : && apt-get install -y \
    python \
    curl \
    build-essential

RUN npm install --global npm@8.15.0
    
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install --no-audit --no-update-notifier --no-fund --omit=dev
COPY . .

## Release image
FROM node:14-slim

COPY --from=build /app /app/

WORKDIR /app

ENV NODE_ENV=production
ENV PORT 1880
EXPOSE 1880

CMD ["npm", "start"]