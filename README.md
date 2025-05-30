Appli qui permet de communiquer en temps réel avec d'autres utilisateurs sous forme de messages privés (on ne peut pas faire des messages de groupes)

pour lancer nest :
cd backend-nest
docker compose -up --build

.env :
DB_HOST=postgres
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=chatdb
JWT_SECRET=super-secret-key

adminer sur : 
http://localhost:8085/
Systeme: postgreSQL
Serveur: postgres
Utilisateur: postgres
Mot de passe: postgres
BDD: chatdb

lancer react : 
cd frontend
npm run dev
react écoute sur http://localhost:5173/
inscription sur /register
connexion sur /login
permet de voir les discussions commencées sur /conversations
permet de voir les utilisateurs connectés sur /online
ouvrir une discussion dans /conversations/userId1/userId2

pour se déconnecter : on clique sur le logo dans le header à droite puis sur "se déconnecter" dans le dropdown
on change sa couleur préférée dans le logo du header puis sur "couleur préférée" dans le dropdown : les messages de l'utilisateur changent de couleur, qu'ils soit passés ou futurs et la couleur se change en temps réel que ce soit du coté de l'utilisateur ou du coté de la personne qui a ouvert une discussion avec nous
