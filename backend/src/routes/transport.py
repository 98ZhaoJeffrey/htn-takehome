from flask import Blueprint, jsonify, request
from ..database import Transport, db_session, User
from sqlalchemy.exc import NoResultFound
from sqlalchemy import func, and_

transport_blueprint = Blueprint('transport', __name__,)

@transport_blueprint.route('/', methods=['GET'])
def all_transports():
    """Endpoint returns all transports

        Parameters:

        Returns:
            JSON: Dictionary of all transports avaliable

    """
    all_transports = Transport.query.all()
    all_transports_dict = [transport.to_dict() for transport in all_transports]
    return jsonify(all_transports_dict)


@transport_blueprint.route('/remaining/<uuid:id>', methods=['GET'])
def remaining_seats(id):
    """Endpoint returns how many seats are left

        Parameters:
            id: UUID The transport we want to access

        Returns:
            JSON: Number of seats remanining

    """
    try:
        transport = Transport.query.filter_by(id=id).one()
        issued_ticket_count = db_session.query(func.count(User.id)).filter(User.transport == str(id)).scalar()
        return {"remaining_tickets": transport.total_seats - issued_ticket_count}
    except NoResultFound:
        return f"Transport not found with ID: {id}", 404
    
@transport_blueprint.route('/assign/', methods=["POST"])
def assign_transport():
    """Endpoint assigns the ticket to the user if avaliable and user doesn't already have a ticket
        
        Parameters:
            ticket_id: UUID The transport we want to access
            user_id: UUID The User we want to assign a ticket to

        Returns:
            JSON: The updated user
    
    """
    try:
        data = request.json
        if(not data or 'user_id' not in data or 'transport_id' not in data):
            return jsonify({"error": "Malformed data"}), 400
        user_id = data['user_id']
        transport_id = data['transport_id']

        transport = Transport.query.filter_by(id=transport_id).one()
        user = User.query.filter_by(id=user_id).one()

        if(user.transport is not None):
            return f"User f{user_id} already has ticket for transport {user.transport}", 200

        issued_ticket_count = db_session.query(func.count(User.id)).filter(User.transport == str(transport_id)).scalar()

        if(issued_ticket_count < 0):
            return f"Could not assign ticket for transport {transport_id} since there are no more seats", 200
        
        user.transport = transport_id
        db_session.commit()
        return jsonify(user.to_dict())

    except NoResultFound:
        data = request.json
        user_id = data['user_id']
        transport_id = data['transport_id']
        return f"Transport not found with ID: {transport_id} or User not found with ID: {user_id}", 404