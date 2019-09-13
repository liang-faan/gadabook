var faker = require('faker');
var helpers = require('./helpers');

var currentEpochTime = Math.floor(new Date() / 1000);
var secondsInADay = 86400;

var users = {};
var tags = {};
var availabilities = {};
var catalogues = {};
var bookings = {};
var enrollments = {};

function generateUniqueUser() {
  var newUser = {
    "UserID": {
      S: faker.random.uuid()
    },
    "Role": {
      S: 'normal'
    },
    "Name": {
      S: faker.internet.userName()
    },
	"FirstName": {
      S: faker.name.firstName()
    },
    "LastName": {
      S: faker.name.lastName()
    },
    "Email": {
      S: faker.internet.email()
    },
	"Phone": {
      S: faker.phone.phoneNumber()
    },
	"DOB": {
      N: faker.random.number({
        'min': currentEpochTime - secondsInADay * 365 * 40,
        'max': currentEpochTime - secondsInADay * 365 * 18
      }).toString()
    },
	"Gender": {
      S: "Male"
    },
	"Address": {
      S: faker.address.streetAddress()
    },
	"UserStatus": {
      S: "ok"
    },
	"Active": {
      S: "ok"
    }
  };

  users[newUser.UserID.S] = newUser;
  helpers.printPretty(newUser);
  return newUser;
}

function generateUniqueTag() {
  var newTag = {
    "TagID": {
      S: faker.random.uuid()
    },
    "Description": {
      S: faker.lorem.paragraphs(1)
    },
	"Active": {
      S: "ok"
    }
  };

  tags[newTag.TagID.S] = newTag;
  helpers.printPretty(newTag);
  return newTag;
}

function generateUniqueAvailability() {
  var newAvailability = {
    "AvailabilityID": {
      S: faker.random.uuid()
    },
    "Date": {
      N: faker.random.number({
        'min': currentEpochTime,
        'max': currentEpochTime + secondsInADay * 18
      }).toString()
    },
	"Slot": {
      N: faker.random.number({
        'min': 1,
        'max': 5
      }).toString()
    }
  };

  availabilities[newAvailability.AvailabilityID.S] = newAvailability;
  helpers.printPretty(newAvailability);
  return newAvailability;
}

function generateUniqueCatalogue(tag, availability) {
	var variables = {
		Venue: 'Room 2',
		Type: 'Facility',
		City: faker.address.city,
		Address: faker.address.streetAddress
	};
  var newCatalogue = {
    "CatalogueID": {
      S: tag.TagID.S
    },
	"TagID": {
      S: availability.AvailabilityID.S
    },
	"AvailabilityID": {
      S: faker.random.uuid()
    },
    "Name": {
      S: faker.lorem.word(5)
    },
    "Currency": {
      S: "SGD"
    },
    "TermsCondition": {
      S: faker.lorem.paragraphs(1)
    },
    "Rate": {  
      S: faker.random.number({
        'min': 10,
        'max': 100
      }).toString()
    },
    "Variables": {  
      S: JSON.stringify(variables)
    }
  };

  catalogues[newCatalogue.CatalogueID.S] = newCatalogue;
  helpers.printPretty(newCatalogue);
  return newCatalogue;
}

function generateUniqueBooking(user, catalogue) {
  var newBooking = {
    "BookingID": {
      S: faker.random.uuid()
    },
	"CatalogueID": {
      S: catalogue.CatalogueID.S
    },
	"UserID": {
      S: user.UserID.S
    },
	"TransactionID": {
      S: faker.random.uuid()
    },
    "Status": {
      S: "ok"
    },
    "StartTime": {  
      N: faker.random.number({
        'min': currentEpochTime - (secondsInADay * 10),
        'max': currentEpochTime - secondsInADay
      }).toString()
    },
	"EndTime": {  
      N: faker.random.number({
        'min': currentEpochTime + secondsInADay,
        'max': currentEpochTime + (secondsInADay * 10)
      }).toString()
    },
    "Active": {
      S: "ok"
    },
    "Amount": {  
      S: faker.random.number({
        'min': 10,
        'max': 100
      }).toString()
    }
  };

  bookings[newBooking.BookingID.S] = newBooking;
  helpers.printPretty(newBooking);
  return newBooking;
}

function generateUniqueEnrollment(user, catalogue) {
  var newEnrollment = {
    "EnrollmentID": {
      S: faker.random.uuid()
    },
	"CatalogueID": {
      S: catalogue.CatalogueID.S
    },
	"UserID": {
      S: user.UserID.S
    },
	"TransactionID": {
      S: faker.random.uuid()
    },
	"ExpiryDate": {  
      N: faker.random.number({
        'min': currentEpochTime + secondsInADay,
        'max': currentEpochTime + (secondsInADay * 10)
      }).toString()
    },
    "Active": {
      S: "ok"
    },
    "Fee": {  
      S: faker.random.number({
        'min': 10,
        'max': 100
      }).toString()
    }
  };

  enrollments[newEnrollment.EnrollmentID.S] = newEnrollment;
  helpers.printPretty(newEnrollment);
  return newEnrollment;
}

function generateAllData(numberOfCatalogues, numberOfUsers, numberOfTags, numberOfAvailabilties, numberOfBookings, numberOfEnrollments) {
  for (var i=0; i<numberOfUsers; i++) {
    generateUniqueUser();
	console.log('Generated', 'User');
  }
  
  for (var i=0; i<numberOfTags; i++) {
    generateUniqueTag();
	console.log('Generated', 'Tag');
  }
  
  for (var i=0; i<numberOfAvailabilties; i++) {
    generateUniqueAvailability();
	console.log('Generated', 'Availability');
  }
  
  for (var i=0; i<numberOfCatalogues; i++) {
	var tag = faker.random.objectElement(tags);
	var availability = faker.random.objectElement(availabilities);
    generateUniqueCatalogue(tag, availability);
	console.log('Generated', 'Catalogue');
  }
  
  for (var i=0; i<numberOfBookings; i++) {
	var user = faker.random.objectElement(users);
	var catalogue = faker.random.objectElement(catalogues);
    generateUniqueBooking(user, catalogue);
	console.log('Generated', 'Bookings');
  }
  
  for (var i=0; i<numberOfEnrollments; i++) {
	var user = faker.random.objectElement(users);
	var catalogue = faker.random.objectElement(catalogues);
    generateUniqueEnrollment(user, catalogue);
	console.log('Generated', 'Enrollment');
  }

  return {
    'Gardabook.User': users,
    'Gardabook.Tag': tags,
	'Gardabook.Availability': availabilities,
	'Gardabook.Catalogue': catalogues,
	'Gardabook.Bookings': bookings,
	'Gardabook.Enrollment': enrollments
  };
}

module.exports.generateAllData = generateAllData;
