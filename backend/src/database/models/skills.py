from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from uuid import uuid4
from ..database import Base

class Skill(Base):
    __tablename__ = 'skills'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    skill = Column(String(100))
    rating = Column(Integer)
    user_id = Column(UUID, ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f"Skill(skill='{self.skill}', rating={self.rating})"
    
    # no idea why __dict__ dies
    def to_dict(self):
        return {"Skill": self.skill, "Rating": self.rating}