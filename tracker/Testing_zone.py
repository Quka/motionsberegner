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

steps = 0

def get_sense_data():
    acc = sense.get_accelerometer_raw()
    sense_data = []
    sense_data.append(acc["x"])
    sense_data.append(acc["y"])
    sense_data.append(acc["z"])
    
    return sense_data

def step_counter():
    x, y, z = sense.get_accelerometer_raw().values()

    if x>1.1:
        steps = steps + 1
    if y>1.1:
        steps = steps + 1
return steps


while True:
    step_count = step_counter()
    print(step_count)
    sleep(0.5)