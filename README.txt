to run server: cd weather_webserver
               python3 manage.py runserver
to run data collection script: python3 manage.py runscript collect_data
to activate virtualenv from root directory: source ~/weather_webserver/bin/activate

as one command:
source /home/pi/Desktop/weather_webserver/weather_webserver/bin/activate ; cd weather_webserver ; python3 manage.py runserver
source /home/pi/Desktop/weather_webserver/weather_webserver/bin/activate ; cd weather_webserver ; python3 manage.py runscript collect_data