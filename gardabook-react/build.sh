rm -rf ../gardabook-cordova/www/*
npm run build
cp -r ./build/* ../gardabook-cordova/www/

cd ..
git add .