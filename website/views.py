from pyramid.i18n import TranslationStringFactory

_ = TranslationStringFactory('website')

def my_view(request):
    return {'project':'website'}
