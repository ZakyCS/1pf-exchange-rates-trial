FROM node:18-alpine AS builder

WORKDIR /frontend

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine 

WORKDIR /frontend

COPY --from=builder /frontend/.next/standalone ./
COPY --from=builder /frontend/.next/static ./.next/static
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/package.json ./package.json
COPY --from=builder /frontend/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "server.js"]