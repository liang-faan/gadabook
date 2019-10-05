# Local DynamoDB for Testing

## Install

https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html

## Run DynamoDB Local

In directory with java file

```
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

## Create Table and GSI

Table

```bash
aws dynamodb --endpoint-url http://localhost:8000 create-table \
  --table-name gardabook-develop \
  --attribute-definitions \
      AttributeName=pKey,AttributeType=S \
      AttributeName=sKey,AttributeType=S \
  --key-schema \
      AttributeName=pKey,KeyType=HASH \
      AttributeName=sKey,KeyType=RANGE \
  --provisioned-throughput \
      ReadCapacityUnits=10,WriteCapacityUnits=5
```

GSI

```
aws dynamodb --endpoint-url http://localhost:8000 update-table \
  --table-name gardabook-develop \
  --attribute-definitions AttributeName=sKey,AttributeType=S AttributeName=pKey,AttributeType=S \
  --global-secondary-index-updates \
  "[{\"Create\":{\"IndexName\": \"gsi\",\"KeySchema\":[{\"AttributeName\":\"sKey\",\"KeyType\":\"HASH\"},{\"AttributeName\":\"pKey\",\"KeyType\":\"RANGE\"}], \
  \"ProvisionedThroughput\": {\"ReadCapacityUnits\": 10, \"WriteCapacityUnits\": 5      },\"Projection\":{\"ProjectionType\":\"KEYS_ONLY\"}}}]"

```

## Insert Test Data

From `TestDataGenerator` folder

```
node generateData.js
```

## Check If It Worked

Go to `http://localhost:8000/shell/`

Type this on the left column and press the play arrow

```javascript
var dynamodb = new AWS.DynamoDB({
  region: "us-east-1",
  endpoint: "http://localhost:8000"
})
var tableName = "gardabook-develop"

var params = {
  TableName: tableName,
  Select: "ALL_ATTRIBUTES"
}

function doScan(response) {
  if (response.error) ppJson(response.error)
  // an error occurred
  else {
    ppJson(response.data) // successful response

    // More data.  Keep calling scan.
    if ("LastEvaluatedKey" in response.data) {
      response.request.params.ExclusiveStartKey = response.data.LastEvaluatedKey
      dynamodb
        .scan(response.request.params)
        .on("complete", doScan)
        .send()
    }
  }
}
console.log("Starting a Scan of the table")
dynamodb
  .scan(params)
  .on("complete", doScan)
  .send()
```
