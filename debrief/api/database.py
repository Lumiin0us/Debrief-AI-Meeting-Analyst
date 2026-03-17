from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker
import json
import os 

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
engine = create_engine(f"sqlite:///{BASE_DIR}/meetings.db")
Base = declarative_base()

class Meeting(Base):
    __tablename__ = "meetings"
    id = Column(Integer, primary_key=True)
    summary = Column(String)
    action_items = Column(String)
    decisions = Column(String)
    follow_up_questions = Column(String)

    def to_dict(self):
        return {
            "id": self.id,
            "summary": self.summary,
            "action_items": json.loads(self.action_items),
            "decisions": json.loads(self.decisions),
            "follow_up_questions": json.loads(self.follow_up_questions)
        }

Base.metadata.create_all(engine)
SessionLocal = sessionmaker(bind=engine)