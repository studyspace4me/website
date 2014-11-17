from pyramid.config import Configurator
from website.models import get_root

def main(global_config, **settings):
    """ This function returns a WSGI application.
    
    It is usually called by the PasteDeploy framework during 
    ``paster serve``.
    """
    settings = dict(settings)
    settings.setdefault('jinja2.i18n.domain', 'website')

    config = Configurator(root_factory=get_root, settings=settings)
    config.add_translation_dirs('locale/')
    config.include('pyramid_jinja2')

    config.add_static_view(name='static', path='static')
    config.add_route('dashboard', '/')
    config.add_route('login', '/login/')
    config.add_route('logout', '/logout/')
    config.add_route('register', '/register/')
    config.add_route('settings', '/settings/')
    config.add_view('website.views.dashboard', renderer="templates/dashboard.jinja2", route_name='dashboard')
    config.add_view('website.views.login', renderer="templates/login.jinja2", route_name='login')
    config.add_view('website.views.register', renderer="templates/register.jinja2", route_name='register')
    config.add_view('website.views.settings', renderer="templates/settings.jinja2", route_name='settings')

    return config.make_wsgi_app()
