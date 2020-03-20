#!/bin/bash
echo "входим в папку"
cd /home/cat/web-server/sochirentacar.ru/public_html
rm -f cars.json
rm -f news.json
echo "качаем репо"
git pull origin master
echo "качаем файлы"
wget -O cars.json https://booking.autopilot.rent/api/sun/cars/getSeo/sochi.json
wget -O news.json https://booking.autopilot.rent/api/sun/newsListSeo/sochi.json
echo "билдим"
yarn
yarn build
echo "рестаритм ПМ2"
pm2 restart 7
