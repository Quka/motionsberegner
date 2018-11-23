from sense_hat import SenseHat
import socket
from datetime import datetime
import json

sense = SenseHat() # init sensehat
timestamp = datetime.now() # set timer for use later
delay = 0.01 # delay in seconds (1/10 of a sec)

def setup_udp_socket():
    # Setup UDP socket for broadcasting
    server = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)

    # Set a timeout so the socket does not block
    # indefinitely when trying to receive data.
    server.settimeout(0.2)

    server.bind(("", 44441))
    return server

def get_sense_data():
    accl = sense.get_accelerometer_raw()

    sense_data = {
        'x': round(accl['x'], 2),
        'y': round(accl['y'], 2),
        'z': round(accl['z'], 2),
        'date': datetime.now()
    }
    
    return sense_data

# init server
server = setup_udp_socket()

while True:
    data = get_sense_data()
    time = data["date"] - timestamp # træk timestamp fra datetime i data

    # Sæt et delay for hvor ofte den skal læse data (delay = 1 sekund)
    if time.seconds > delay:
        # Convert dictionary to JSON Object (str) and then to bytes
        dataBytes = (json.dumps(data, default=str)).encode()

        # Broadcast message to port 37020 via UDP Socket
        server.sendto(dataBytes, ('<broadcast>', 37020))

        # Show a message on the display
        sense.show_message( "s", scroll_speed=0.05 )