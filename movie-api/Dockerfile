# Temel Node.js imajını kullan
FROM node:18

# Çalışma dizinini ayarla
WORKDIR /app

# package.json ve package-lock.json dosyaları
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Ortam değişkenleri
COPY .env .env

# Uygulama dosyalarını kopya
COPY . .

# başlat
CMD ["npm", "run", "start:dev"]

# Uygulamanın çalışacağı port
EXPOSE 3000
