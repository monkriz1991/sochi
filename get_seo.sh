#!/bin/bash
cd /home/cat/web-server/sochirentacar.ru/public_html
rm -f cars.json
wget -O cars.json https://booking.autopilot.rent/api/sun/cars/getSeo/sochi.json
rm -f news.json
wget -O news.json https://booking.autopilot.rent/api/sun/newsListSeo/sochi.json
rm -f static/sitemap.xml
wget -O static/sitemap.xml https://booking.autopilot.rent/sun/sun-sites-sitemap/sochi
yarn build
pm2 restart 7
