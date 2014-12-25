import json
import os

MONGODB = {
    'url': None,
    'db': 'ss4me'
}

REDIS = {
    'url': ''
}

VCAP_SERVICES = os.getenv('VCAP_SERVICES')
if VCAP_SERVICES is not None:
    VCAP_SERVICES = json.loads(VCAP_SERVICES)
    MONGODB['url'] = '/'.join(VCAP_SERVICES['mongodb-2.4']['credentials']['url'].split('/')[:-1]) + '/'
    MONGODB['db'] = VCAP_SERVICES['mongodb-2.4']['credentials']['db']