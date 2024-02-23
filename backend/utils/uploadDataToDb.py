import sys

sys.path.append("../")

import requests
from src.database import db_session, Base, engine
from src.database.models import User, Skill

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


if __name__ == '__main__':
    Base.metadata.drop_all(bind=engine)  # uncomment this line to refresh the database
    Base.metadata.create_all(bind=engine)
    data = get_data()
    success_rate = upload_data_to_db(data)
    print(f"Successfully uploaded {100 * success_rate['users']}% of user data and {100 * success_rate['skills']}% of skill data to database")
    # 1000 users and around 3000 skills