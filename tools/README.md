# Local DynamoDB

## Run Local DynamoDB 
For convenience, On Mac or Linux:
```bash
bash startDynamo.sh
```

On Windows:
```bash
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

## Access Local DynamoDB Shell
Go to `localhost:8000/shell` in your web browser after running the Local DynamoDB.
### Scan all items
Put this script on the left side and press the play arrow button
```javascript
var dynamodb = new AWS.DynamoDB({
region: 'ap-southeast-1',
endpoint: "http://localhost:8000"
});
var tableName = "gardabook-develop";

var params = {
TableName: tableName,
Select: "ALL_ATTRIBUTES"
};


function doScan(response) {
if (response.error) ppJson(response.error); // an error occurred
else {
    ppJson(response.data); // successful response

    // More data.  Keep calling scan.
    if ('LastEvaluatedKey' in response.data) {
        response.request.params.ExclusiveStartKey = response.data.LastEvaluatedKey;
        dynamodb.scan(response.request.params)
            .on('complete', doScan)
            .send();
    }
}
}
console.log("Starting a Scan of the table");
dynamodb.scan(params)
.on('complete', doScan)
.send();
```
