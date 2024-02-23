from sqlalchemy import *
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('postgresql://98ZhaoJeffrey:c4EQd2AFPvCN@ep-winter-resonance-a514qkzq.us-east-2.aws.neon.tech/htn-backend?sslmode=require', convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))

Base = declarative_base()
# We will need this for querying
Base.query = db_session.query_property()