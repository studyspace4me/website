import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
README = open(os.path.join(here, 'README.txt')).read()
CHANGES = open(os.path.join(here, 'CHANGES.txt')).read()

requires = ['pyramid',
            'pyramid_jinja2',
            'pyramid_chameleon',
            'pyramid_debugtoolbar',
            'pyramid_tm',
            'SQLAlchemy',
            'transaction',
            'zope.sqlalchemy',
            'cornice',
            'waitress']

setup(name='website',
      version='0.3.0',
      description='website',
      long_description=README + '\n\n' + CHANGES,
      classifiers=[
          "Programming Language :: Python",
          "Framework :: Pylons",
          "Topic :: Internet :: WWW/HTTP",
          "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
          ],
      author='',
      author_email='',
      url='',
      keywords='web pyramid pylons',
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      install_requires=requires,
      tests_require=requires,
      test_suite="website",
      entry_points="""\
      [paste.app_factory]
      main = website:main
      [console_scripts]
      initialize_ss4me_db = website.scripts.initializedb:main
      """,
      paster_plugins=['pyramid'],
      )
