var AWS = require('aws-sdk');
var gen = require('./dataGenerator');
var async = require('async');

AWS.config.loadFromPath('./../../config.json');

var dynamodb = new AWS.DynamoDB();

//numberOfCatalogues, numberOfUsers, numberOfTags, numberOfAvailabilties, numberOfBookings, numberOfEnrollments
var allData = gen.generateAllData(5, 10, 2, 3, 5, 3);

// SETUP WORKLOADS
var work = [].concat(
	function(done) { 
        var tableName = 'Gardabook.User';
        console.log('Generated',Object.keys(allData[tableName]).length, 'User');
        processDataset(done, allData, tableName);
    },
	function(done) { 
        var tableName = 'Gardabook.Tag';
        console.log('Generated',Object.keys(allData[tableName]).length, 'Tag');
        processDataset(done, allData, tableName);
    },
	function(done) { 
        var tableName = 'Gardabook.Availability';
        console.log('Generated',Object.keys(allData[tableName]).length, 'Availability');
        processDataset(done, allData, tableName);
    },
    function(done) { 
        var tableName = 'Gardabook.Catalogue';
        console.log('Generated',Object.keys(allData[tableName]).length, 'Catalogue');
        processDataset(done, allData, tableName);
    },
    function(done) { 
        var tableName = 'Gardabook.Bookings';
        console.log('Generated',Object.keys(allData[tableName]).length, 'Bookings');
        processDataset(done, allData, tableName);
    },
	function(done) { 
        var tableName = 'Gardabook.Enrollment';
        console.log('Generated',Object.keys(allData[tableName]).length, 'Enrollment');
        processDataset(done, allData, tableName);
    }
);
// END SETUP WORKLOADS

function startProcessingDataParallel() {
    async.parallel(work, function(err, data) {
        if (err)
            console.log('Unexpected Error: ', err, err.stack);
    });
}

function startProcessingDataSeries() {
    async.series(work, function(err, data) {
        if (err)
            console.log('Unexpected Error: ', err, err.stack);
    });
}

// startProcessingDataParallel();
startProcessingDataSeries();

function executeBatchPut(params) {
    var request = dynamodb.batchWriteItem(params);
    return request.promise();
}

function processDataset(done, allData, tableName, UnprocessedItems) {
    var params = buildParams();
    var requestItemCount = params.RequestItems[tableName].length;
    if (requestItemCount === 0) {
        done();
        return;
    }

    executeBatchPut(params)        
        .then(processBatchPutResponse)
        .catch(handleError)

    function processBatchPutResponse(response) {
        var request;

        if (!response.UnprocessedItems || !response.UnprocessedItems.length) {
            console.log('   Wrote', requestItemCount, 'items to table', tableName);
            processDataset(done, allData, tableName);            
            return;
        }
        
        var unprocessedCount = Object.keys(response.UnprocessedItems[tableName]).length;
        if (unprocessedCount > 0) {
            console.log('   Wrote', (requestItemCount - unprocessedCount), 'items to table', tableName, '(Unable to process',unprocessedCount,'items)');
            processDataset(done, allData, tableName, response.UnprocessedItems);
        }
    }

    function buildParams() {
        var dataSet = allData[tableName];
        var params = {
            RequestItems: {},
            "ReturnConsumedCapacity": "TOTAL"
        };
        params.RequestItems[tableName] = [];

        if (UnprocessedItems) {
            params.RequestItems = UnprocessedItems;
        }

        for (var id in dataSet) {
            if (params.RequestItems[tableName].length === 25)
                break;

            var request = {
                "PutRequest": {
                    "Item": dataSet[id]
                }
            };

            params.RequestItems[tableName].push(request);
            delete dataSet[id];
        }
        return params;
    }
    
    function handleError(err) {
        console.log('   Error:', err, err.stack);
        if (params.RequestItems[tableName].length !== 0) {
            processDataset(done, allData, tableName, params.RequestItems);
        }
    }

}


