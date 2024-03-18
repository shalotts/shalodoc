FROM nginx:1.25.4-alpine

WORKDIR /src
RUN wget https://github.com/francyfox/cinny/releases/download/deploy/sha_cinny_320.zip && unzip sha_cinny_320.zip
RUN cp -r /src/dist /app

RUN rm -rf /usr/share/nginx/html \
  && ln -s /app /usr/share/nginx/html
