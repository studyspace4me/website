from pyramid.i18n import TranslationStringFactory

_ = TranslationStringFactory('website')


def dashboard(request):
    return {'full_name': 'User'}


def login(request):
    return {}


def register(request):
    return {}


def preferences(request):
    return {}


def contribute(request):
    return {}


def terms(request):
    return {}
