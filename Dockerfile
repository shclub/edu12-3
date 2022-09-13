#
# Build stage
#
FROM node:14.19.3-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_API_URL localhost:8080 
COPY package.json ./
COPY package-lock.json ./
COPY nginx.conf ./
RUN ls
RUN pwd
RUN cat nginx.conf
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

#
# Package stage
#
# production environment
FROM nginx:stable-alpine

ENV TZ Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=build /app/build /usr/share/nginx/html
RUN pwd
RUN ls
RUN ls /etc/nginx/conf.d
COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default2.conf

RUN ls /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
