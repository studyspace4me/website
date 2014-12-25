from datetime import datetime, timedelta, date, time
import random
from cornice import Service
from website import settings
from website.utils import format_time_momentjs
from pymongo import MongoClient
from bson.json_util import dumps, loads

client = MongoClient(settings.MONGODB['url'])
mongodb = client[settings.MONGODB['db']]

rooms = Service(name='rooms', path='/api/rooms/', description='Room status')
# preferences = Service(name='preferences', path='/api/prefs/', description='User preferences')

feedback = ["Empty", "Half", "Full"]


@rooms.get()
def get_rooms(request):
    rl = []
    for room in mongodb.rooms.find():
        r = {'name': room['name'], 'type': room.get('type', 'lecture'), 'lastUpdate': None,
             'feedback': 'Empty', 'favorite': False}
        status = None
        status_known = False
        # if "2014-12-09" in room['occupation'].keys():
        if str(date.today()) in room['occupation'].keys():
            curr_time = datetime.now().time()
            occupations = room['occupation'][str(date.today())]
            # occupations = room['occupation']["2014-12-09"]
            for s, e in occupations:
                st = time(s, 0)
                et = time(e, 0)
                if st <= curr_time < et:
                    status = {'busy': True, 'reason': 'lecture', 'until': format_time_momentjs(datetime.combine(datetime.today(), et))}
                    status_known = True
                    break
                elif curr_time < st:
                    status = {'busy': False, 'until': format_time_momentjs(datetime.combine(datetime.today(), st))}
                    status_known = True
                    break
        if status_known is False:
            status = {'busy': False, 'until': 'close'}
        r['status'] = status
        rl.append(r)
    return {'status': 'ok', 'rooms': rl}


# def my_view(request):
# try:
#         one = DBSession.query(Room).filter(Room.name == 'one').first()
#     except DBAPIError:
#         return Response(conn_err_msg, content_type='text/plain', status_int=500)
#     return {'one': one, 'project': 'test02'}
