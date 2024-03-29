# Hack the North 2021 Backend Boilerplate

## Installation
Create an virtual env and install all the packages
cd into src and run ```flask--app main run```

## Setup own PostgreSQL instance

Inside of database/database.py, change out the url in create engine to your own PostgresSQL instance

For your convinence, I have included the one that I used during developement, so nothing has to be changed, in a real production, I would store it in an env file and load from there


## Routes
Under Users, we have the following routes:

<ul>
    <li>
        GET /users/
        Gets all user data
    </li>
    <li>
        GET /users/:id
        Gets user with that id
    </li>
    <li>
        PUT /users/:id
        Updates user given a id 
    </li>
</ul>


Under Skills, we have
<ul>
    <li>
        GET /skills/?min_frequency=5&max_frequency=10
        Aggregates the count of skills by name and filters by the count
    </li>
</ul>


Transports is a model for helping hackers get to HTN, assume HTN has bought tickets and wants to give them
out to users for them to be able to travel here. However, there are limited supply of each type of transport

We have these routes

<ul>
    <li>
        GET /transport/
        Returns all transports that is provided
    </li>
    <li>
        GET /remaining/<uuid:transport_id>
        Returns the number of seats remaining for the given transport
    </li>
    <li>
        POST /assign/
        Assigns the transport ticket to a hacker, unless they already have one or if we even have a ticket remaining
    </li>
</ul>


## Utility function

Under utils, there is a uploadDataToDb, which uploads all the data in the json file to PostgreSQL

Run it using ```python -m uploadDataToDb``` in the utils folder

If you need to completely wipe out the database and reupload, uncomment the first line under main
