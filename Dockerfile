FROM    centos:6

# Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
RUN     yum install -y npm

# App
ADD . /src
WORKDIR /src
RUN npm install

# For Dev
RUN npm install -g nodemon

EXPOSE  8080
CMD ["node", "/src/server.js"]