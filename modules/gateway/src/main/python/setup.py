from setuptools import setup, find_packages

setup(
      setup_requires=['pytest-runner'],
      install_requires=[ 'wheel','bitio', 'paho-mqtt==1.5.1', 'RxPy3', 'Homie4', 'python-dotenv', "homieclient"],
      extras_require={
         'test':['pytest','pytest-cov','hbmqtt']
      },
      dependency_links=[
         'git+https://github.com/whaleygeek/bitio.git#egg=bitio'
      ],
      tests_require=['pytest'],
      name = 'microsquad-gateway',
      python_requires= '>=3.4.0',
      version="0.1",  # version = '${VERSION}',
      description="Remote control a squad of microbit via radio",
      long_description="""A framework to orchestrate easily a squad of microbits via radio""",
      url="https://github.com/bcopy/microsquad",
      classifiers=[
        "Environment :: MacOS X",
        "Environment :: Win32 (MS Windows)",
        "Environment :: X11 Applications",
        "Intended Audience :: Developers",
        "Intended Audience :: Education",
        "Intended Audience :: End Users/Desktop",
        "License :: OSI Approved :: GPLv3",
        "Natural Language :: English",
        "Operating System :: MacOS",
        "Operating System :: Microsoft :: Windows",
        "Operating System :: POSIX",
        "Operating System :: POSIX :: Linux",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3 :: Only",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Topic :: Education",
        "Topic :: Software Development",
      ],
      keywords="IDE education programming microbit",
      packages =  find_packages('.')
)

