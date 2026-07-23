# Build Phase
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json .
RUN npm install

COPY . .
#  Generates static production files ( binary code -- for react which is built by creat-react module---> binary stored in build folder(for vite/vue -- dist))
RUN npm run build

#RUNTIME Phase
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]

# FROM node:22-alpine
# WORKDIR /app

# COPY --from=builder /app/package*.json /app/
# COPY --from=builder /app/node_modules /app/node_modules
# COPY --from=builder /app/build ./build

# EXPOSE 3000
# CMD [ "npm", "start" ]