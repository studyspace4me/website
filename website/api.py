from datetime import datetime, timedelta
import random
from cornice import Service
from sqlalchemy.exc import DBAPIError
from website import DBSession
from website.models import Room
from website.utils import format_time_momentjs

rooms = Service(name='rooms', path='/api/rooms/', description='Room status')
preferences = Service(name='preferences', path='/api/prefs/', description='User preferences')

feedback = ["Empty", "Half", "Full"]


@rooms.get()
def get_rooms(request):
    try:
        rooms = DBSession.query(Room)
    except DBAPIError:
        return {'status': 'error', 'error': 'dbconn'}
    rl = []
    for room in rooms:
        r = {'name': room.id, 'location': room.location, 'favorite': False, 'type': room.type_str, 'feedback': feedback[random.randint(0, 2)],
             'lastUpdate': format_time_momentjs(datetime.now()-timedelta(hours=random.randint(1, 5)))}
        status = {'busy': False, 'until': format_time_momentjs(datetime.now() + timedelta(hours=random.randint(1, 6)))}
        r['status'] = status
        rl.append(r)
    return {'status': 'ok', 'rooms': rl}


# def my_view(request):
#     try:
#         one = DBSession.query(Room).filter(Room.name == 'one').first()
#     except DBAPIError:
#         return Response(conn_err_msg, content_type='text/plain', status_int=500)
#     return {'one': one, 'project': 'test02'}
