# Data Layer

This is an explanation of the layerservice.md file. The main function is the *init* function. The *init* function calls the *setup* function which assigns *defaultIndicators* and *dashboardIndicators* to the object class.



## init

The *init* function itself handles data fetching for both new and returning users. 
*  clear data  other table in the db so they can be fetched again to aviod error with indexedDB db
* indicator ID are gotten from iDB and stored in vuex to keep track of the available indicators, reason is to avoid making multiple queries in the database
* The apiServices returns all the and array of response for the axios call of all other apiEndpoints.getOtherEndpoint it uses and {Promise.all()}
* It generally also handles the first three indicator logic as well as fetching the remaining indicators either from iDB or server as needed



## isDataUpToDate

returns {true or false} based on if the data on the dashboard is up to date or not



## formatDate

This takes in one argument, *theDate* , a date string in JSON format and returns a date object formatted to fit the API requirements



## updateData

This does the actual updating of the data, using the timestamp gotten from local storage as an argument to the api



## checkIndicatorsInIdb

This returns a unique array of all the indicator available in iDB by their indexes. This is considerably less cpu-intensive than toArray()



## listAllIndicators

This method returns an array containing a list of all indicator ids available to the api



## storeDataForOtherEndPointToDB

 This has one parameter, a  {Promise}. Let be cautions with this function so cause it follows the same other as it follow the id of the return time anyways i will suggest a refactoring  of this function.

 What the function basically does is to store the data for peripheral data endpoints gotten from the server to iDB



## addDataToStore

Its purpose is to store the data to vuex.
This takes in two parameter, the first is the data to be stored while the second is the name of the table where it should be stored. If the second argument is not given, it stores directly to the main data table.


## getIndicatorsAndRelatedIndicators

It takess one parameter which could be an array of indicators or a number, representing selecting indicator.

