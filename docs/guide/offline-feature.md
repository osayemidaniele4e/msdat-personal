# Offline Feature

IndexDB was adopted as a method for users to persistently store data inside their browser. IndexDB achieves this by providing rich query abilities regardless of network availability, enabling the MSDAT application to work both online and offline. This is an explanation of the offline feature which is done in the datalayer folder. The data layer consist of two major folders, the config folder and services folder which will be explained in this section.

# Config Folder

>This folder holds files for configuration settings for IndexxedDB (Dexie) and Axios. See config folder for more information

# Services Folder

## Files in this folder

1. ApiServices.js
2. database.worker.js
3. helper.js
4. LayerService.js

### ApiServices.js

>This component file uses the axios instance to provide 
or expose the various API endpoints for the various
methods needed by the dashboards.

>The two needed imports in this file are the *axios instance* 
gotten from the *api.js* file (`src/modules/DataLayer/config/api.js`),
where the axios instance is initialized and the *apiEndpoints.js* file 
(`src/modules/DataLayer/config/endpoint.js`) where the route names 
are stored in an object for easy referencing

>All the methods exported by this component file returns data directly as 
>provided by the API Server. Additionally, methods such as `getUpdatedData`, `getSingleIndicator`
>and `getRequiredEndpoint` **require** arguments in order to work but others do not as shown in 
>the table below.

| Method | Argument(s) | Data Returned |
| ----------- | ----------- | ----------- |
| getSingleIndicator | ID of required Indicator | All Data for the required indicator as collated from the main data sheet |
| getRequiredEndpoint | required DataRoute/endpoint | Data from the required endpoint | 
| getMainData |  | The whole data master sheet | 
| getUpdatedData | theDate | All main data on the server that was created or updated after the given date | 
| getOtherEndpoint |  | Data for all peripheral endpoints, i.e; location, indicators, location_hierarchy_level,  value_types, links, factors, datasources, datasource_specific_indicators,  | 
| getLatestDate |  | The date the data on the server was last updated | 
| getIndicatorsWithAvailable | ID of required Indicator | All the years for the required indicator is returned |
| getDashboard |  | The data for each dashboard |
| getIndicatorsWithPeriod | ID of required Indicator and period | The indicators with the period is returned |

### database.worker.js


### Methods
------------

#### constructor()
The constructor method initialize the index the instance and config .

#### listLocations()
 This method returns a unique array of all the location objects available in iDB.
#### checkIndicatorsInIdb()
The method return an array of all the indicator ID in the IndexedDB.

**Example**
```js
let value = await db.checkIndicatorsInIdb();
```

#### listAllIndicators()
This method returns an array containing a list of all indicator ids available to the api

#### storeDataForOtherEndPointToDB(data)
The method stores the data for other endpoints into the indexed DB data Table.

**Example**
```js
let value = await db.storeDataForOtherEndPointToDB(data);
```

**Parameters**

- `data: array`<br/>
  An array of data object to be stored in the indexed DB database.

#### storeDataInDBTable(data,tableName)
The method stores the data into the indexed DB .

**Example**
```js
let value = await db.storeDataInDBTable(data,tableName);
```

**Parameters**

- `data: array`<br/>
  An array of data object to be stored in the indexed DB database.

- `tableName: string`<br/>
  The name of the database table to to store the data

#### storeDataInDB(data)
The method stores the data into the indexed DB  data Table.

**Example**
```js
let value = await db.storeDataInDB(data);
```

**Parameters**

- `data: array`<br/>
  An array of data object to be stored in the indexed DB database.

#### getIndicatorDataThatExistInDB(arrayOfIndicatorIds)
The method returns data from the database related to the given ids.

**Example**
```js
let value = await db.getIndicatorDataThatExistInDB(arrayOfIndicatorIds);
```

**Parameters**

- `arrayOfIndicatorIds: array`<br/>
  An array of indicator object to be retrieve from the indexed DB database.

#### getIndicatorFromDB(id)
The method returns an array of data objects for the indicator.

**Example**
```js
let value = await db.getIndicatorFromDB(id);
```

**Parameters**

- `id: number`<br/>
  A single indicator object to be retrieve from the indexed DB database.

#### getAvailableSoucesForIndicator(id)
This method is a static method that return an array of available datasource for an indicator

**Example**
```js
let value = await DB.getAvailableSoucesForIndicator(id);
```

**Parameters**

- `id: number`<br/>
   indicator id

#### getAvailableIndicatorByDataSource(id)
This method is a static method that return an array of available indicator for a datasource

**Example**
```js
let value = await DB.getAvailableIndicatorByDataSource(id);
```

**Parameters**

- `id: number`<br/>
   datasource id

#### initData(indicators)
The Method checks if the exist in the indexed db if not fetches it from the API using the API services


**Example**
```js
let value = await db.initData(indicators);
```

**Parameters**

- `indicators: array`<br/>
  An array of indicator ID's to perform the operation on  .



#### queryDB(query = {})
This method is a static method that return an array of data object request by the query


**Example**
```js
let value = await DB.queryDB({indicator:5,dashboard:8,period:"2015"});
```

**Parameters**

- `query: object`<br/>
   object for the what need to be queried


### LayerService.js
See Data Layer for more information