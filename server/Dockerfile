# Étape de construction
FROM node:18-alpine AS build

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances et reconstruire bcrypt
RUN npm install && npm rebuild bcrypt --update-binary

# Copier le reste des fichiers
COPY . .

# Étape d'exécution
FROM node:18-alpine

WORKDIR /app

# Copier depuis l'étape de construction
COPY --from=build /app .

# Exposer le port
EXPOSE 4000

# Commande de démarrage
CMD ["npm", "start"]