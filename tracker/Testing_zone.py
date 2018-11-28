from sense_hat import SenseHat
from datetime import datetime
import json
from time import sleep, strftime, time


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
    step1 = steps

    if x>1.1:
      step1 += 1
    if y>1.1:
      step1 += 1
    return step1



while True:
    steps = step_counter()
    print(steps)
    sleep(0.5)