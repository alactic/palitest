# Pali test

This project was generated with Nodejs and deploy-able using docker.

## how to run and deploy the service

Using computer with docked installed

 #open your command prompt

 cd to this project

 #run this following

  docker build -t palitest .

  docker run -p 9600:3000 palitest

 # Open your browser of your choice to test whether it's successful
 # by entering the url

   http://localhost:9600
 #(if "http://localhost:9600" do not work) use
   http://192.168.99.100:9600
