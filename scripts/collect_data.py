import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "weather_webserver.settings")
from random import randint
from dashboard.models import Data
from time import sleep, time
import json
import scripts.bme280 as bme280
import scripts.RSSreader as RSSreader
import scripts.thingspeak_reader as thingspeak

lastData = []
#Open config.yml and get data polling rate
with open(os.path.abspath(os.path.join(os.getcwd(), os.pardir))+"/weather_webserver/config.json") as file:
    jsondata = json.load(file)["settings"]
    frequency = jsondata["dataFrequency"]
    url = jsondata["locationURL"]
    use_arduino = jsondata["useESP"]
    thing_speak_id = jsondata["thingSpeakID"]
    

def run():
    '''data collection, frequerncy in seconds'''
    
    
    while True:
        if use_arduino:
            bmeData = thingspeak.main(thing_speak_id)
            
        else:
            bmeData = bme280.main()

        try:
            BBCdata = RSSreader.getBBCdata(url)
        except Exception as e:
            print("Exception in accessing RSS feed: " + str(e))
            BBCdata = lastData

        dat = Data(temperature = round(bmeData[0], 1), 
                   humidity = round(bmeData[1], 1), 
                   pressure = round(bmeData[2], 1), 
                   BBCtemperature = round(BBCdata[0], 1), 
                   BBChumidity = round(BBCdata[1], 1),
                   BBCpressure = round(BBCdata[2], 1)
                   )
        lastData = [
            round(BBCdata[0], 1),
            round(BBCdata[1], 1),
            round(BBCdata[2], 1),
            ]          
        dat.save()
        print("Data collected: ")
        print(dat)
        sleep(frequency)
