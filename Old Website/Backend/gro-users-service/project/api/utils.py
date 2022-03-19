import os
import random
import string
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = set(['mp4'])



def getUniquePath(folder, filename):    
    path = os.path.join(folder, filename)
    while os.path.exists(path):
        filename = filename.split('.')[0] + ''.join(random.choice(string.ascii_lowercase) for i in range(10)) + '.' + filename.split('.')[1]
        path = os.path.join(folder, filename)
    return filename


def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_file(key,request,upload_directory,allowed_file_types):
    stored = False
    filename = None
    message = None
    
    if key not in request.files:
        message =  'No file part in the request'
        return stored, filename, message

    file = request.files[key]
    if file.filename == '':
        message = 'No file selected for uploading'
        return stored, filename, message

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filename = getUniquePath(upload_directory, filename)
        file.save(os.path.join(upload_directory, filename))
        message = 'File successfully uploaded'
        stored = True
        return stored, filename, message
    else:
        message = 'Allowed file types are mp4'
        return stored, filename, message


