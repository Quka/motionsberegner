from sense_hat import SenseHat
import socket
from datetime import datetime
import json
from time import sleep, strftime, time
from csv import writer

#import urllib2

sense = SenseHat() # init sensehat
timestamp = datetime.now() # set timer for use later
delay = 0.2 # delay in seconds (1/10 of a sec)



def get_sense_data():
    accl = sense.get_accelerometer_raw()

    # round() round to 2 nearest digits and get absolute value
    # abs() turns negative to positive - because we don't care about the direction (backwards/forward), only that it moves
    sense_data = {
        'x': abs(round(accl['x'], 2)),
        'y': abs(round(accl['y'], 2)),
        'z': abs(round(accl['z'], 2)),
        'date': datetime.now()
    }

    return sense_data


with open("Accl_data.csv", "w", newline='') as log:
    data_writer = writer(log)

    while True:
        data = get_sense_data()
        data_writer.writerow(data)
    