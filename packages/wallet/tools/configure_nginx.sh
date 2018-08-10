PROJPATH=$(pwd)
NGINXPATH=$PROJPATH/tools/nginx
ASSETSPATH=$PROJPATH/public
cd $NGINXPATH

if [ -z $HOSTNAME ]
then
  HOSTNAME='devstage.online'
fi

sudo cp -f ./siphtor.nginx /etc/nginx/conf.d/siphtor.conf
sudo cp -f ./cert.conf ./temp.conf
sudo sed -i s@{pwd}@$PROJPATH@g /etc/nginx/conf.d/siphtor.conf
sudo sed -i s@{hostname}@$HOSTNAME@g /etc/nginx/conf.d/siphtor.conf
sudo sed -i s@{hostname}@$HOSTNAME@g ./temp.conf

sudo openssl req -x509 \
                 -nodes \
                 -days 365 \
                 -newkey rsa:2048 \
                 -keyout "./ssl/$HOSTNAME.key" \
                 -out "./ssl/$HOSTNAME.crt" \
                 -config ./temp.conf
sudo rm temp.conf

sudo cp -R ./ssl /etc/nginx/

if echo "$HOSTNAME" | grep -q "local";
then
  certutil -d sql:$HOME/.pki/nssdb -D -n "$HOSTNAME"
  certutil -d sql:$HOME/.pki/nssdb -A -t "CT,c,c" -n "$HOSTNAME" -i "/etc/nginx/ssl/$HOSTNAME.crt"
fi

sudo service nginx restart
