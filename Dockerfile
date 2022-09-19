#
# Build stage
#
FROM ghcr.io/shclub/node:14.19.3-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_API_URL http://localhost:8080 
COPY package.json ./
COPY package-lock.json ./
COPY nginx.conf ./
RUN sed -i "s|backend_host|$REACT_APP_API_URL|g" -i ./nginx.conf
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
# CORS
RUN npm install http-proxy-middleware
RUN npm install cors

COPY . ./
RUN npm run build

#
# Package stage
#
# production environment
FROM ghcr.io/shclub/nginx:stable-alpine

ENV TZ Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=build /app/build /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
