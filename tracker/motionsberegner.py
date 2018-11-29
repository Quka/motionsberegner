from sense_hat import SenseHat
import socket
from datetime import datetime
import csv
import json
#import urllib2

sense = SenseHat() # init sensehat
timestamp = datetime.now() # set timer for use later
delay = 0.2 # delay in seconds (1/5 of a sec) how often should it read data


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

def is_connected(hostname):
  try:
    # see if we can resolve the host name -- tells us if there is
    # a DNS listening
    host = socket.gethostbyname(hostname)
    # connect to the host -- tells us if the host is actually
    # reachable
    s = socket.create_connection((host, 80), 2)
    return True
  except:
     pass
  return False
 
#json formattet objects
def get_sense_data_json():
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

# array formatted data (for csv use)
def get_sense_data_array():
    accl = sense.get_accelerometer_raw()

    # round() round to 2 nearest digits and get absolute value
    # abs() turns negative to positive - because we don't care about the direction (backwards/forward), only that it moves
    sense_data = []
    sense_data.append( abs(round(accl['x'], 2)) )
    sense_data.append( abs(round(accl['y'], 2)) )
    sense_data.append( abs(round(accl['z'], 2)) )
    sense_data.append( datetime.now() )

    return sense_data

# init server
server = setup_udp_socket()
datalog = []

# Save data with file
with open('data.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['x', 'y', 'z', 'date'])

    while True:
        data = get_sense_data_array()
        dt = data[-1] - timestamp   # -1 means last element of array (which is date)

        writer.writerow(data)
        print(data)

        '''

        # waits a certain amount before it reads and writes the data
        if dt.seconds > delay:
            writer.writerow(data)
            print(data)
            timestamp = datetime.now()
        '''

'''
# Save data with array
while True:

    data = get_sense_data_json()
    time = data["date"] - timestamp # træk timestamp fra datetime i data
    datalog.append(data)
    
    # Check if online, don't check all the time
    # If online then try to upload
    if(is_connected("www.google.dk")):

        # Prøv at UDP Broadcaste 5 gange til en modtager (for at sikre at den sender)
        # Kan potentielt fejlsende 5 gange (5 gange packet loss) så ikke 100% pålidelig
        for i in range(5):
            # Convert dictionary to JSON Object (str) and then to bytes
            dataBytes = (json.dumps(datalog, default=str)).encode()

            # Broadcast message to port 37020 via UDP Socket
            server.sendto(dataBytes, ('<broadcast>', 37020))

    # Sæt et delay for hvor ofte den skal læse data (delay = 1 sekund)
    #if time > delay:
'''
        