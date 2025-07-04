FROM node:18-alpine AS builder

WORKDIR /frontend

COPY package*.json ./

RUN npm ci

COPY . .

ARG WEB_API_KEY
ENV WEB_API_KEY=$WEB_API_KEY

RUN npm run build

FROM node:18-alpine 

WORKDIR /frontend

COPY --from=builder /frontend/.next/standalone ./
COPY --from=builder /frontend/.next/static ./.next/static
COPY --from=builder /frontend/public ./public

EXPOSE 3000

CMD ["node", "server.js"]