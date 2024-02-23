from ..database import Skill

def update_user(user, update_data):
    """Updates user based on the update_data

        Parameters:
            user: User The user that needs to be updated
            update_date: Dict The information that the user should get updated with

        Returns:
            Skills[]: The newly created skills that the user did not have
    """
    
    add_to_db = [] # if we have to add skills, we need to add them to db later
    for key, value in update_data.items():
        if(key == "name"):
            user.name = value
        elif(key == "email"):
            user.email = value
        elif(key == "company"):
            user.company = value
        elif(key == "phone"):
            user.phone = value
        elif(key == "skills"):
            for skill in value:
                s_skill = skill['Skill']
                s_rating = skill['Rating']
                
                found_skill = False
                for user_skill in user.skills:
                    if(s_skill == user_skill.skill):
                        user_skill.rating = s_rating
                        found_skill = True
                if(not found_skill):
                    add_to_db.append(Skill(skill=s_skill, rating=s_rating, user_id=str(user.id)))
    return add_to_db


# check if the skill name already exists
# if it does, only update the value
# if it doesn't make a new entry and add to array
