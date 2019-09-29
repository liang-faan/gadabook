rm -rf ../gardabook-cordova/www/*
npm run build
cp -r ./build/* ../gardabook-cordova/www/

cd ../gardabook-cordova
git add .
git commit -m 'update'
git push