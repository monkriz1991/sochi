#!/bin/bash
cd /home/cat/web-server/Sochicarbooking.ru/public_html
rm -f cars.json
wget -O cars.json https://booking.autopilot.rent/api/sun/cars/getSeo/sochi.json
rm -f news.json
wget -O news.json https://booking.autopilot.rent/api/sun/newsListSeo/sochi.json
yarn build
pm2 restart 7
