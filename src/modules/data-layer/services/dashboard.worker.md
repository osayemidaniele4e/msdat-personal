# indexed DB service

The Indexed DB services has a list of methods that interact with the  indexed DB dashboard
more importantly to note the services runs on a web worker.
using the **comlink-loader** package installed. files in the dashboard ending with **.worker.js** are ran on a separate thread outside the main 

please also take time to Learn web Worker and it limitation for better clarity 

USAGE
-----

```js
import DB from "form/the/location/of/the/file/dashboard.worker";
```
INSTALLATION
------------
```js
const db = new DB();
```

METHODS
------------

### constructor()
The constructor method initialize the index the instance and config .


### checkIndicatorsInIdb()
The constructor method initialize the index the instance and config .

**Example**
```js
let value = await db.chcheckIndicatorsInIdb();
```

**Return value**
An array of all the indicator ID in the IndexedDB


### storeDataInDBTable(data,tableName)
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


### storeDataInDB(data)
The method stores the data into the indexed DB  data Table.

**Example**
```js
let value = await db.storeDataInDB(data);
```

**Parameters**

- `data: array`<br/>
  An array of data object to be stored in the indexed DB database.


### storeDataInDB(data)
The method stores the data into the indexed DB  data Table.

**Example**
```js
let value = await db.storeDataInDB(data);
```

**Parameters**

- `data: array`<br/>
  An array of data object to be stored in the indexed DB database.



### initData(indicators)
The Method checks if the exist in the indexed db if not fetches it from the API using the API services


**Example**
```js
let value = await db.initData(indicators);
```

**Parameters**

- `indicators: array`<br/>
  An array of indicator ID's to perform the operation on  .



### queryDB(query = {})
This method is a static method tha return and array of 


**Example**
```js
let value = await DB.queryDB({indicator:5,dashboard:8,period:"2015"});
```

**Parameters**

- `query: object`<br/>
   object for the what need to be queried


**Return value**
An array data object request by the query