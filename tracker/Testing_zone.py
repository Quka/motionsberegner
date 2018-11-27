from sense_hat import SenseHat
import socket
from datetime import datetime
import json
from time import sleep, strftime, time
import csv

#import urllib2

sense = SenseHat() # init sensehat
timestamp = datetime.now() # set timer for use later
delay = 0.2 # delay in seconds (1/10 of a sec)



def get_sense_data():
    acc = sense.get_accelerometer_raw()
    sense_data = []
    sense_data.append(acc["x"])
    sense_data.append(acc["y"])
    sense_data.append(acc["z"])
    
    return sense_data


with open('data.csv', 'w', newline='') as log:
    writer = csv.writer(log)
    while True:
        data = get_sense_data()
        writer.writerow(data)
    