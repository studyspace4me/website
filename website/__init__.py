from pyramid.config import Configurator
#from website.models import get_root

from pyramid.config import Configurator
from sqlalchemy import engine_from_config

from .models import (
    DBSession,
    Base,
    )


def main(global_config, **settings):
    """ This function returns a WSGI application.
    
    It is usually called by the PasteDeploy framework during 
    ``paster serve``.
    """

    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    settings = dict(settings)
    settings.setdefault('jinja2.i18n.domain', 'website')

    config = Configurator(settings=settings)
    config.add_translation_dirs('locale/')
    config.include('pyramid_jinja2')
    config.include('cornice')
    config.scan('website.api')
    config.add_static_view(name='static', path='static')
    config.add_route('dashboard', '/')
    config.add_route('preferences', '/preferences/')
    config.add_route('contribute', '/contribute/')
    config.add_route('terms', '/terms/')
    config.add_view('website.views.dashboard', renderer="templates/dashboard.jinja2", route_name='dashboard')
    config.add_view('website.views.preferences', renderer="templates/preferences.jinja2", route_name='preferences')
    config.add_view('website.views.contribute', renderer="templates/contribute.jinja2", route_name='contribute')
    config.add_view('website.views.terms', renderer="templates/terms.jinja2", route_name='terms')
    return config.make_wsgi_app()
