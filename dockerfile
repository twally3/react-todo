FROM node:10-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --only=production
COPY ./backend .
RUN ls -a
EXPOSE 8080
CMD ["npm", "start"]