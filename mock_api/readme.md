# MSDAT Mock API

so during the development and maintenance of the MSDAT project we have run into issues of where the MSDAT API 
seem not to be working.so then to ------ this we have decieded to mock an MSDAT API instance that one can use when this happens

## dependencies
- json-server

## usage

``` 

yarn run mock:api
```

This will run an MSDAT mock api server on your local machine.
you should be able to access the MSDAT API endpoint from your local machine
such as

``` 

  http://localhost:3000/api/crud/datasources
  http://localhost:3000/api/crud/indicators
```

### Note

* you will also need updated you env variable with the Local API server an re-run 

``` 

yarn run serve
```

ENV variable to update

``` 

VUE_APP_API_BASE_URL
```
