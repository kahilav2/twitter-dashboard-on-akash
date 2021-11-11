FROM node:14.15.0

LABEL author freeirc.cloud@gmail.chmod

ENV DATABASE_URL=<insert url>
ENV TWITTER_KEY=<insert key>

COPY . /app
# Create app directory
WORKDIR /app

# RUN node retrieve-follower-snapshot.js

RUN ls -l /app/api/ 

RUN chmod +x /app/run.sh
RUN /app/run.sh

# RUN apt update && apt install -y apt-transport-https ca-certificates sqlite3
# RUN sqlite3 --version

RUN npm install

ARG APP_NODE_ENV=production

# Bundle app source (server.js)
# COPY retrieve-follower-snapshot.js ./

RUN npm run build

# RUN node --version
# RUN npm --version

# RUN node retrieve-follower-snapshot.js

EXPOSE 3000

CMD ["npm", "run", "start"]