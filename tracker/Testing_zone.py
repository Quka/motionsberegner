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

def step_counter():
   
    x, y, z =   sense.get_accelerometer_raw().values()

    x = abs(round(z,2))
    y = abs(round(z,2))
    z = abs(round(z,2))

    step1 = steps

    if x>1.1:
      step1 += 1
      sleep(0.5)
    if y>1.1:
      step1 += 1
      sleep(0.5)
    return step1



while True:
    steps = step_counter()
    print(steps)
    print(get_sense_data())
    
    