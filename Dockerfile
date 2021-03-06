FROM node:14.15.0

RUN git clone https://github.com/kahilav2/twitter-dashboard-on-akash.git /app

WORKDIR /app

RUN chmod +x /app/run.sh

RUN npm install

ARG APP_NODE_ENV=production
ARG USES_HTTPS=true

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["/app/run.sh"]