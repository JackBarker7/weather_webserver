Django webserver that automatically scrapes data from a BBC Weather RSS feed, as well as from an BME280 sensor attached to the device, and stores and displays this data in a webpage.

Note: This is expected to be running on a Raspberry Pi or similar device, using a BME280 pressure, humidity and temperature sensor running over I2C. If a different sensor is used, changes should be made to `collect_data.py` and `bme280.py`.

To run Django development server: `python3 manage.py runserver` <br />
To run data collection script: `python3 manage.py runscript collect_data` <br />
Required packages listed in `requirements.txt` <br />
Server can be accessed, while running, by typing [hostURL]:8000 on any machine connected to the same network (eg. 192.168.0.50:8000)

Setup
1) Add local IP addresses of all machines that will access the webserver to `ALLOWED_HOSTS` in `settings.py` (eg 192.168.0.100) <br />
2) Make sure `bme280.py` in scripts has the correct I2C address for your sensor <br />
3) Change the value of `locationURL` in `config.json` to a correct one for your location (by finding your local BBC weather forecast, and replacing the trailing numbers in the example URL with the ones from your location. Eg. for London, the address is https://www.bbc.co.uk/weather/2643743, so the URL becomes https://weather-broker-cdn.api.bbci.co.uk/en/observation/rss/2643743)

NB: I have modified the JSCharting source file slightly to remove the logo which appeared on every graph. The original file can be found at https://code.jscharting.com/latest/jscharting.js
