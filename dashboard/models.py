from django.db import models



class Data(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)

    temperature = models.DecimalField(max_digits=3, decimal_places=1)
    pressure = models.DecimalField(max_digits=5, decimal_places=1)
    humidity = models.DecimalField(max_digits=3, decimal_places=1)

    BBCtemperature = models.DecimalField(max_digits=3, decimal_places=1)
    BBCpressure = models.DecimalField(max_digits=5, decimal_places=1)
    BBChumidity = models.DecimalField(max_digits=3, decimal_places=1)

    def __str__(self):
        return (" Time: "+ str(self.timestamp) + 
                " Temperature: "+ str(self.temperature) + 
                " Presure: "+ str(self.pressure) +
                " Humidity: "+ str(self.humidity) + 
                " BBC Temperature: "+ str(self.BBCtemperature) + 
                " BBC Presure: "+ str(self.BBCpressure) +
                " BBC Humidity: "+ str(self.BBChumidity)
                )