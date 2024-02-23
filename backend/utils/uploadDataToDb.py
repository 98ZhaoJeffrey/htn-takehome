import sys

sys.path.append("../")

import requests
from src.database import db_session, Base, engine
from src.database.models import User, Skill, Transport

JSON_URL = 'https://gist.githubusercontent.com/DanielYu842/607c1ae9c63c4e83e38865797057ff8f/raw/b84b8bce73fadb341258e86265a6091779908344/HTN_2023_BE_Challenge_Data.json'

def get_data():
    """Loads the data from url
    
        Parameters:

        Returns:
            JSON: The json of the data
    
    """
    req = requests.get(JSON_URL)
    return req.json()

def upload_data_to_db(data):
    """Uploads the data to a database

        Parameters:
            data: Dict The data that will be uploaded to the database

        Returns:
            Dict(String, Int): The successrate of uploads for users and skills 
    
    """


    completed_users = 0
    completed_skills = 0
    total_skills = 0
    total_users = len(data)
    for row in data:
        try:
            user = User(name=row['name'], 
                        email=row['email'],
                        company=row['company'],
                        phone=row['phone']
                    )

            skills = []
            for skill in row['skills']:
                s = Skill(skill=skill['skill'], rating=skill['rating'], user_id = user.id)
                skills.append(s)
                total_skills += 1
            user.skils = skills
            db_session.add(user)
            db_session.add_all(skills)

            db_session.commit()
            completed_users += 1
            completed_skills += len(skills)
        except Exception as e:
            db_session.rollback()
            print(e)
    return {"users": completed_users / total_users, "skills": completed_skills/ total_skills}

def add_transport_data():
    """Adds a few tranport methods to the database

        Parameters:
        
        Returns:
    """
    transports = [
        Transport(mode="BUS", total_seats=40, price=20, start_location="Toronto", end_location="Waterloo"),
        Transport(mode="BUS", total_seats=20, price=10, start_location="Kitchener", end_location="Waterloo"),
        Transport(mode="PLANE", total_seats=15, price=350, start_location="Vancouver", end_location="Toronto"),
        Transport(mode="PLANE", total_seats=50, price=210, start_location="Ottawa", end_location="Toronto"),
        Transport(mode="RIDESHARE", total_seats=4, price=12, start_location="Mississauga", end_location="Waterloo"),
        Transport(mode="TAXI", total_seats=2, price=50, start_location="Markham", end_location="Waterloo"),
        Transport(mode="TAXI", total_seats=2, price=55, start_location="North York", end_location="Waterloo"),
    ]

    db_session.add_all(transports)
    db_session.commit()


if __name__ == '__main__':
    Base.metadata.drop_all(bind=engine)  # uncomment this line to refresh the database
    Base.metadata.create_all(bind=engine)
    data = get_data()
    success_rate = upload_data_to_db(data)
    print(f"Successfully uploaded {100 * success_rate['users']}% of user data and {100 * success_rate['skills']}% of skill data to database")
    add_transport_data()
    # 1000 users and around 3000 skills