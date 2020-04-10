#!/bin/bash
echo "входим в папку"
cd /home/cat/web-server/sochirentacar.ru/public_html
rm -f cars.json
rm -f news.json
rm -f static/sitemap.xml
rm -f long.json
rm -f events.json
echo "качаем репо"
git pull origin master
echo "качаем файлы"
wget -O cars.json https://booking.autopilot.rent/api/sun/cars/getSeo/sochi.json
wget -O news.json https://booking.autopilot.rent/api/sun/newsListSeo/sochi.json
wget -O long.json https://booking.autopilot.rent/sun/sun-long-make-seo/sochi
wget -O events.json https://booking.autopilot.rent/sun/sun-events-make-seo/sochi
wget -O static/sitemap.xml https://booking.autopilot.rent/sun/sun-sites-sitemap/sochi
echo "билдим"
yarn
yarn build
echo "рестаритм ПМ2"
pm2 restart 7
