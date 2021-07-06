import csv
import urllib.request
import os

def main(id):    
    url = "https://thingspeak.com/channels/"+id+"/feeds/last.csv"
    csvfile = "temp.csv"
    urllib.request.urlretrieve(url, csvfile)
    return_arr = []

    with open(csvfile) as f:
        reader = csv.reader(f)
        for row in reader:
            data=row #only 1 row expected
        for i in range(2,5):
            return_arr.append(float(data[i].strip()))
        f.close()
        os.remove(csvfile)
    return return_arr
