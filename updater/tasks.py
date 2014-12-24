from __future__ import absolute_import
from agendadisi import otk
from datetime import date
from pymongo import MongoClient

from updater.celery import app

client = MongoClient()
mongodb = client.ss4me


@app.task
def update_rooms():
    collection = mongodb.rooms
    today = date.today()
    dotk = otk.daily_auto_init(today)
    for room in dotk.get_rooms():
        db_room = collection.find_one({'name': room})
        if db_room is None:
            room_id = collection.insert({'name': room, 'occupation': {}})
        else:
            room_id = db_room['_id']
            if not 'occupation' in db_room.keys():
                collection.update({'_id': room_id}, {'$set': {'occupation': {}}})
        time_tuple = ()
        for interval in dotk.get_intervals(room):
            time_tuple += (interval.start.hour, interval.end.hour),
        collection.update({'_id': room_id}, {'$set': {'occupation.{0}'.format(str(today)): time_tuple}})