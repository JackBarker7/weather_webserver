Django webserver that automatically scrapes data from BBC Weather RSS feed, as well as from an BME280 sensor attached to the device, and stores and displays this data in a webpage.

To run Django development server: `python3 manage.py runserver` <br />
To run data collection script: `python3 manage.py runscript collect_data` <br />
Required packages listed in `requirements/txt`

Setup: add local IP addresses of all machines that will access the webserver to `ALLOWED_HOSTS` in `settings.py` (eg 192.168.0.100)
