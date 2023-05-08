FROM node:18-alpine AS base

RUN npm i -g pnpm

FROM base AS dependencies

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build

COPY . .
COPY --from=dependencies /node_modules ./node_modules
RUN pnpm build
RUN pnpm prune --prod

FROM base AS deploy

COPY --from=build /dist ./dist
COPY --from=build /package*.json ./
COPY --from=build /node_modules ./node_modules
RUN apk --no-cache add curl

CMD sh -c "node ./node_modules/typeorm/cli.js migration:run -d ./dist/typeOrm.config.js && node dist/main.js"