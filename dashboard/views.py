from django.shortcuts import render
from .models import Data
from django.core import serializers
import json
import os



def main(request):
    
    with open(os.path.abspath(os.path.join(os.getcwd(), os.pardir))+"/weather_webserver/config.json") as file:
        frequency = json.load(file)["settings"]["dataFrequency"]
        entries_required = int(604800/frequency) #the number of entries required for a week of data
    

    data_json = json.loads(serializers.serialize("json", Data.objects.all()))[-entries_required:]
    

    context = {
        "frequency": frequency, 
        "data" : data_json
    }
    print("Data request received")
    return render(request, "dashboard/dashboard.html", context)