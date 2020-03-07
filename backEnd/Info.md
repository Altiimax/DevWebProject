# Informations

Ce document reprend les informations et commandes utiles pour les collaborateurs du projet.

## Python et pip 

Afin de tous travailler avec les mêmes modules python, on travaillera exclusivement dans le venv. Pour travailler dans celui-ci il faut l'activer dans le terminal depuis lequel on souhaite exécuter les commandes pytho3 et pip3. 
```bash
# se placer dans le dossier parent du venv 
cd .../DevWebProject/backEnd
ls
-> DB   README.md   geotools_root   venv
# activer le venv 
source venv/bin/activate
```

## Django
> tuto : https://docs.djangoproject.com/en/3.0/intro/tutorial01

Commandes utiles :
```bash 
#Démarrer le serveur de developement de Django 
python3 manage.py runserver

#Créer une nouvelle web-app 
python3 manage.py startapp 'web-app name' 

# Récupérer tous les Modèles de la DB
python3 manage.py inspectdb  
```

## PostgreSQL
Pour que le projet fonctionne sur votre pc, il faut que la DB postgreSQL y soit configurée comme suit :
> prérequis: avoir installé postgreSQL (de préférence avec un gui pour pouvoir facilement démarrer/arrêter le serveur)

1. Démarrer votre serveur postgreSQL 
2. Ouvrez un terminal et connectez vous au serveur postgresql
   ```bash
   psql postgres 
   ```
3. Créer un nouvel utilisateur (rôle) avec comme nom : 'admin' et comme mdp : 'devweb2'
   ```bash
   create role admin with login password 'devweb2'; 
   ```
4. Vérifier que l'utilisateur a bien été créé 
   ```bash
   \du 
   ```
5. Ajouter des permissions à l'utilisateur
   ```bash 
   alter role admin superuser;
   alter role admin createdb;
   ```
6. Vérifier que les permissions ont été ajoutées 
   ```bash
   \du
   ```
7. Quitter 
   ```bash
   \q
   ```
8. Se connecter en tant que l'utilisateur admin 
   ```bash
   psql postgres -U admin;
   ```
9. Créer la base de donnée 'toolbox_db'
   ```bash
   create database toolbox_db;
   ```
10. Donner tous les accès à l'admin pour cette db
    ```bash
    grant all privileges on database toolbox_db to admin;
    \connect toolbox_db
    ```
11. Vérifier que la db à été crée et que l'admin y a accès.
    ```bash
    \list
    ```
12. Quitter
    ```bash
    \q
    ```
13. Générer les tables de la db:
    * ouvrez dataGrip
    * File -> new -> Data Source -> PostgreSQL
    * Remplir les champs avec les données (voir plus haut)
    * Tester la connexion : si ok => Apply -> ok 
    * Ouvrir "toolbox_db@localhost" -> databases -> toolbox_db
      >(si vous avez laissé le nom de la connexion par défault)
    * Click-droit sur toolbox_db -> jump to console
    * coller le contenu du fichier "backend/DB/doc/tables"
    * Sélectionner l'entièreté 
    * RUN
    * Fini, en principe touts vos tables ont été créées  
  
   Pour plus d'info sur comment gérer la db avec dataGrip -> voir Martin



