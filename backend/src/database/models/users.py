from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from uuid import uuid4
from ..database import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(String(80), nullable=False)
    email = Column(String(120), nullable=False)
    company =  Column(String(120), nullable=False)
    phone = Column(String(120), nullable=False)
    skills = relationship('Skill', backref='user', lazy=True)
    transport = Column(UUID, ForeignKey('transport.id'), nullable=True)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.id = str(uuid4())        

    def __repr__(self):
        return f"<User(name='{self.name}', email='{self.email}', company='{self.company}', phone='{self.phone})>"
    
    # i have no idea why __dict__ doesn't work
    def to_dict (self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "company" : self.company,
            "phone": self.phone,
            "skills" : [skill.to_dict() for skill in self.skills],
            "transport": self.transport.id
        }
    