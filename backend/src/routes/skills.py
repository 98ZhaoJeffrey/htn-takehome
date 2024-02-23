from flask import Blueprint, jsonify, request
from ..database import Skill, db_session
from sqlalchemy import func, and_

skill_blueprint = Blueprint('skill', __name__,)

@skill_blueprint.route('/', methods=['GET'])
def number_user_specific_skill():
    """Endpoint for counting how many users have a skill 

        Parameters:
            min_frequency:int The minimum number of users that share this skill
            max_frequency:int The maximum number of users that share this skill

        Returns:
            JSON: pair of skill name and number of users who share the skill
    """

    min_frequency = request.args.get('min_frequency')
    max_frequency = request.args.get('max_frequency')

    # assuming that we may not have either of these

    # query over number of users with a skill
    skills_count = db_session.query(Skill.skill, func.count(Skill.user_id).label('user_count')).group_by(Skill.skill)
    
    if(min_frequency and max_frequency):
        skills_count = skills_count.having(and_(func.count(Skill.user_id).label('user_count') >= min_frequency, func.count(Skill.user_id).label('user_count') <= max_frequency))
    elif(min_frequency):
        skills_count = skills_count.having(func.count(Skill.user_id).label('user_count') >= min_frequency)
    elif(max_frequency):
        skills_count = skills_count.having(func.count(Skill.user_id).label('user_count') <= max_frequency)
    result = skills_count.all()
    result_dictionary = {key: value for key, value in result}
    return jsonify(result_dictionary)






