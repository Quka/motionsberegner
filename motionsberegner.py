import importlib
import socket
from datetime import datetime
import json

def find_module(full_module_name):
    """
    Returns module object if module `full_module_name` can be imported. 

    Returns None if module does not exist. 

    Exception is raised if (existing) module raises exception during its import.
    """
    try:
        return importlib.import_module(full_module_name)
    except ImportError as exc:
        if not (full_module_name + '.').startswith(exc.name + '.'):
            raise

find_module("SenseHat")
