from flask import Blueprint, jsonify, request
from sqlalchemy.exc import NoResultFound

from ..utils import update_user
from ..database import User, db_session

user_blueprint = Blueprint('user', __name__,)

@user_blueprint.route('/', methods=['GET'])
def all_users():
    all_users = User.query.all()
    all_users_dict = [user.to_dict() for user in all_users]
    return jsonify(all_users_dict)

@user_blueprint.route('/<uuid:id>', methods=['GET'])
def specific_user(id):
    try:
        user = User.query.filter_by(id=id).one()
        return jsonify(user.to_dict())
    except NoResultFound:
        return f"User not found with ID: {id}", 404


@user_blueprint.route('/<uuid:id>', methods=['PUT'])
def update_specific_user(id):
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
