FROM node:14.15.0


RUN git clone --branch feature/test_docker https://github.com/kahilav2/twitter-dashboard-on-akash.git /app
# RUN git clone https://github.com/kahilav2/twitter-dashboard-on-akash.git /app

WORKDIR /app

RUN chmod +x /app/run.sh

RUN npm install

EXPOSE 3000

ENTRYPOINT ["/app/run.sh"]