from sense_hat import SenseHat
import socket
from datetime import datetime
import json
from time import sleep
#import urllib2

sense = SenseHat() # init sensehat
timestamp = datetime.now() # set timer for use later
delay = 0.2 # delay in seconds (1/10 of a sec)


def setup_udp_socket():
    # Setup UDP socket for broadcasting
    server = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)

    # Set a timeout so the socket does not block
    # indefinitely when trying to receive data.
    server.settimeout(0.2)

    # Bind randomly
    #server.bind(("", 44441))
    return server
 
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

# init server
server = setup_udp_socket()

# send the data with udp
while True:
    data = get_sense_data()
    time = data["date"] - timestamp # træk timestamp fra datetime i data

    # Sæt et delay for hvor ofte den skal læse data (delay = 1 sekund)
    if time.seconds > delay:

        
        print(data["x"], data["y"], data["z"])

        # Convert dictionary to JSON Object (str) and then to bytes
        dataBytes = (json.dumps(data, default=str)).encode()

        # Broadcast message to port 37020 via UDP Socket
        server.sendto(dataBytes, ('<broadcast>', 37020))

        # Show a message on the display
        #sense.show_message( "s", scroll_speed=0.05 )
    sleep(0.5)