Django webserver that automatically scrapes data from BBC Weather RSS feed, as well as from an BME280 sensor attached to the device, and stores and displays this data in a webpage.

Note: This is expected to be running on a Raspberry Pi or similar device

To run Django development server: `python3 manage.py runserver` <br />
To run data collection script: `python3 manage.py runscript collect_data` <br />
Required packages listed in `requirements/txt`

Setup
1) add local IP addresses of all machines that will access the webserver to `ALLOWED_HOSTS` in `settings.py` (eg 192.168.0.100) <br />
2) Make sure `bme280.py` in scripts has the correct I2C address for your sensor <br />
3) Change the value of `locationURL` in `config.json` to a correct one (by finding your local BBC weather forecast, and replacing the trailing numbers in the example URL with the ones from your location. Eg. for London, the address is https://www.bbc.co.uk/weather/2643743, so the URL becomes https://weather-broker-cdn.api.bbci.co.uk/en/observation/rss/2643743)
