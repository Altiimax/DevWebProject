# TESTS

:warning: Before executing a test, be sure to be in the toolbox_django direcroty! :warning:
```bash
cd .../DevWebProject/toolbox_website/toolbox_django
```
* Run all tests 
    ```bash
    pytest    
    ```
* Run a specific test
    ```bash
    pytest [path/to/test_file.py]

    #example: 
    pytest toolbox_app/tests/test_urls.py   
    ```
* Run all tests and check code coverage of our main app (toolbox_app)
    ```bash
    pytest --cov=toolbox_app 
    # -> a brief overview of the results is givin in de cmd-line.

    pytest --cov-config=.coveragerc --cov-report=html:toolbox_app/tests/coverage --cov=toolbox_app
    # -> a full, very detailed results documents is accessible by opening 
    #    toolbox_app/tests/coverage/index.html in a web-browser!

    !! # Best option :
    ./pytest_cov.sh
    # Executes a custom script that runs all tests and 
    # opens the result in the default web-browser.  
    ```


### Sources: 
https://pytest-django.readthedocs.io/en/latest/
https://pytest-cov.readthedocs.io/en/latest/reporting.html
https://www.youtube.com/watch?v=0MrgsYswT1c

