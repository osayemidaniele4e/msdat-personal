# Documentation for APISERVICES.JS 


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

Note: Use **ctrl+shift+v** to view MD file in vscode




