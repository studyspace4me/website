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
    mongodb = VCAP_SERVICES['mongodb-2.4'][0]
    MONGODB['url'] =mongodb['credentials']['url']
    # MONGODB['url'] = '/'.join(VCAP_SERVICES['mongodb-2.4'][0]['credentials']['url'].split('/')[:-1]) + '/'
    MONGODB['db'] = mongodb['credentials']['db']