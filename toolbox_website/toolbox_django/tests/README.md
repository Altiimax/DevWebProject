# TESTS

:warning: Before executing a test, be sure to be in the _tests_ direcroty! :warning:
```bash
cd .../DevWebProject/toolbox_website/toolbox_django/tests
```
* Run all tests 
    ```bash
    pytest    
    ```
* Run a specific test
    ```bash
    pytest [test_file.py]
    ```
* Run all tests and check code coverage
    ```bash
    pytest --cov ../toolbox_app    
    ```



//TODO
sources: 
https://docs.pytest.org/en/latest/getting-started.html
https://github.com/pytest-dev/pytest-cov