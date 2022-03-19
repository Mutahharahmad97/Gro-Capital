# gro-react-client

### Deploy changes:

Change access level to Pem Key. Key must not be publicly viewable for SSH to work.
```
$ chmod 400 Growth-cap.pem
```

Then SSH into AWS Instance
```
$ ssh -i "Growth-cap.pem" ubuntu@ec2-54-226-211-232.compute-1.amazonaws.com
```

Then CD into the html directory inside instance that contain the frontend app. 
```
$ cd /var/www/html
```

Install any new packages and build the dist.
```
$ yarn 
$ yarn build
```

