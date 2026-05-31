FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 3000

CMD ["/start.sh"]