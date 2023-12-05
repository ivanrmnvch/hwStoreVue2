# Используем образ Node.js
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /front

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем файлы проекта внутрь контейнера
COPY . .

# Собираем приложение
RUN npm run build

# Команда для запуска приложения в режиме production
#CMD ["npm", "run", "build"]
CMD ["npm", "run", "dev"]