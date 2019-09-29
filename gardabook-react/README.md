# GARDABOOK REACT

## TODO

- Create mock pages for:

  - Bookings
  - Booking Details
  - List
  - List Payment
  - Listing
  - Listing Details
  - Notifications

- Update navigation links

- Create side menu:

  - Create side menu component
  - About page
  - Settings page (kiv)
  - EULA page (kiv)
  - Privacy page
  - T&C (kiv)

- Add API mocks
- Add oauth (https://github.com/EddyVerbruggen/cordova-plugin-googleplus)

## Description

This is the react part of the gardabook UI. To create the Android app, the accompanying repository, `gardabook-cordova` is required. Placing both repositories in the same parent directory allows you to quickly build and move code to Github.

## Building for Cordova

Ensure `gardabook-react` and `gardabook-cordova` are in the same folder and that your are located in `gardabook-react`.

```bash
gardabook
|-- gardabook-cordova
|-- gardabook-react     # cd to here!
```

To build the react app, move the built contents to `gardabook-cordova` and git commit the new additions in `gardabook-cordova`, run:

```bash
bash build.sh
```

For ease of using Windows Android Studio (vs WSL), the updated `gardabook-cordova` should be pulled from Github and the android apk should built from there.

## Possible Issues

### Android: Deviceready has not fired after 5 seconds

This happened once and was initially debugged by moving the cordova.js source below the react code manually. Subsequent moving of the cordova.js file above the react code in body, and then into the head did not reproduce this problem.
