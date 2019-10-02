var AWS = require("aws-sdk")

var dynamodb = new AWS.DynamoDB({
  region: "ap-southeast-1",
  apiVersion: "2012-08-10"
})

var tableName = "gardabook-develop"

var pKey = "Availability_926883be-a742-41c5-ba13-1c21541c23ea"
var sKey = "Availability_926883be-a742-41c5-ba13-1c21541c23ea"

var params = {
  AttributeUpdates: {
    active: {
      Action: "PUT",
      Value: {
        BOOL: true
      }
    }
  },
  Key: {
    pKey: {
      S: pKey
    },
    sKey: {
      S: sKey
    }
  },
  ReturnValues: "ALL_NEW",
  TableName: tableName
}

dynamodb.updateItem(params, function(err, data) {
  if (err) console.log(err, err.stack)
  else console.log(data)
})

/* BEFORE
{ Attributes:
   { date: { N: '1570578229' },
     active: { BOOL: false },
     pKey: { S: 'Availability_926883be-a742-41c5-ba13-1c21541c23ea' },
     createdAt: { N: '1570731606' },
     time: { N: '1571068079' },
     catalogueId: { S: 'Catalogue_10831d48-38fd-4413-8199-f6850dc43bc9' },
     slot: { N: '5' },
     sKey: { S: 'Availability_926883be-a742-41c5-ba13-1c21541c23ea' } } }
*/

/* AFTER
{ Attributes:
   { date: { N: '1570578229' },
     active: { BOOL: true },
     pKey: { S: 'Availability_926883be-a742-41c5-ba13-1c21541c23ea' },
     createdAt: { N: '1570731606' },
     time: { N: '1571068079' },
     catalogueId: { S: 'Catalogue_10831d48-38fd-4413-8199-f6850dc43bc9' },
     slot: { N: '5' },
     sKey: { S: 'Availability_926883be-a742-41c5-ba13-1c21541c23ea' } } }
*/

// PUT updates and retains attributes not specified in params.
