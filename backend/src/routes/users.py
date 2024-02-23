from flask import Blueprint, jsonify, request
from sqlalchemy.exc import NoResultFound

from ..utils import update_user
from ..database import User, db_session

user_blueprint = Blueprint('user', __name__,)

@user_blueprint.route('/', methods=['GET'])
def all_users():
    """Endpoint for all users

        Parameters:

        Returns:
            JSON: JSON of all users in database
    
    """
    all_users = User.query.all()
    all_users_dict = [user.to_dict() for user in all_users]
    return jsonify(all_users_dict)

@user_blueprint.route('/<uuid:id>', methods=['GET'])
def specific_user(id):
    """Endpoint for a specific user

        Parameters:
            id: UUID The id of the user we want to see

        Returns:
            JSON: JSON of the specificied user
            String: Error message
    """
    try:
        user = User.query.filter_by(id=id).one()
        return jsonify(user.to_dict())
    except NoResultFound:
        return f"User not found with ID: {id}", 404


@user_blueprint.route('/<uuid:id>', methods=['PUT'])
def update_specific_user(id):
    """Endpoint for updating a specific user

        Parameters:
            id: UUID The id of the user we want to update
            body: JSON The updates that we want to make on the user

        Returns:
            JSON: JSON of the updated user
            String: Error message
    """
    try:
        update_data = request.json
        user = User.query.filter_by(id=id).one()

        updates = update_user(user, update_data)
        if(updates):
            db_session.add_all(updates)
        db_session.commit()
        return jsonify(user.to_dict())
    except NoResultFound:
        return f"User not found with ID: {id}", 404
