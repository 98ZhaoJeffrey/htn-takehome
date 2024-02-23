from sqlalchemy import Column, String, Enum, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from uuid import uuid4
from ..database import Base

class Transport(Base):
    __tablename__ = 'transport'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    mode = Column(Enum('BUS', 'RIDESHARE', 'PLANE', 'TAXI', name='transportation_modes_enum'))
    total_seats = Column(Integer, nullable=False)
    price = Column(Integer, nullable=False)
    start_location = Column(String(80), nullable=False)
    end_location = Column(String(80), nullable=False)
    user_id = Column(UUID, ForeignKey('users.id'), nullable=True)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.id = str(uuid4())        

    def __repr__(self):
        return f"<Transport(mode='{self.mode}', total_seats='{self.total_seats}', price='{self.price}', start_location='{self.start_location}, end_location='{self.end_location}')>"
    
    # i have no idea why __dict__ doesn't work
    def to_dict (self):
        return {
            "id": self.id,
            "total_seats": self.total_seats,
            "price": self.price,
            "start_location" : self.start_location,
            "end_location": self.end_location,
        }
    