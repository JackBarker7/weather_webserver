import feedparser

def getBBCdata(url):
    feed = feedparser.parse(url)


    data = (feed["entries"][0]["summary"])

    datList = data.split(",")


    temp = float(((datList[0].strip("Temperature: ")).split("°"))[0])


    humi = float(datList[3].strip("Humidity: ").strip("%"))


    press = float(datList[4].strip("Pressure: ").strip("mb"))
    
    return [temp, humi, press]





