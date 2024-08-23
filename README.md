# Raudi

Ce projet se compose de deux parties principales : le back-end et le front-end. Le back-end fournit les API pour gérer les utilisateurs, les voitures et les paiements, tandis que le front-end est l'interface utilisateur qui interagit avec ces API.


## Prérequis

Assurez-vous que Node.js et npm sont installés sur votre machine. Vous pouvez les télécharger depuis [nodejs.org](https://nodejs.org/).

## Installation

1. **Installer les dépendances**

Vous devez installer les dépendances pour le back-end et le front-end.

```bash
# Installer les dépendances du back
cd back
npm install

# Installer les dépendances du front
cd ../front
npm install
```

2. **Créer le model et importer les données**
```bash
cd ..
# Appliquer le model de donnée
node back/src/create.js
# Import des données
node back/src/import.js
```


3. **Lancer les applicatifs**
```bash
# Lancer le backend
node back/src/main.js
```

```bash
# Lancer le frontend
cd front/
npm run start
```