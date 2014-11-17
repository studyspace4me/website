from pyramid.i18n import TranslationStringFactory

_ = TranslationStringFactory('website')


def dashboard(request):
    return {'full_name': 'User'}


def login(request):
    return {}


def register(request):
    return {}


def settings(request):
    return {}
