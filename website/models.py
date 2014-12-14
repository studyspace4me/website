from sqlalchemy import (
    Column,
    Index,
    Integer,
    Text,
    )

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.hybrid import hybrid_property

from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
    )

from zope.sqlalchemy import ZopeTransactionExtension

DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base()


# class MyModel(Base):
#     __tablename__ = 'models'
#     id = Column(Integer, primary_key=True)
#     name = Column(Text)
#     value = Column(Integer)
#
# Index('my_index', MyModel.name, unique=True, mysql_length=255)

room_type = {
    0: 'lecture',
    1: 'computer',
    2: 'library',
    3: 'study'
}


class Room(Base):
    __tablename__ = 'rooms'
    id = Column(Text, primary_key=True)
    type = Column(Integer)
    seats = Column(Integer)
    location = Column(Text)

    @hybrid_property
    def type_str(self):
        return room_type[int(self.type)]

    @type_str.setter
    def type_str(self, s):
        for k, v in room_type.items():
            if v == s:
                self.type = k
                return
        raise ValueError('Couldn\'t find a value mapped to {}'.format(repr(s)))