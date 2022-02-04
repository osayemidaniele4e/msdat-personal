

# API schema
display a chart diagram

### API endpoints

## /account

#### (GET) /account/contact/

- params: page(integer)

- responses:
id(integer), email(string), profession(string), organization(string), category(string),
feedback(string), created_at(string), updated_at(string).

#### (POST) /account/contact/ 
- params: name(string), email(string), profession(string), organization(string), category(string), feedback(string), newsletter(boolean)

- responses:
name(string), email(string), profession(string), organization(string), category(string),
feedback(string), newsletter(string).

#### (GET) /account/contact/{id}
- params: id(integer)

- repsonses:
id(integer), email(string), profession(string), organization(string), category(string),
feedback(string), created_at(string), updated_at(string).

#### (PUT) /account/contact/{id}
- params: name(string), email(string), profession(string), organization(string), category(string), feedback(string), newsletter(boolean)

- responses:
name(string), email(string), profession(string), organization(string), category(string),
feedback(string), newsletter(string).

#### (PATCH) /account/contact/{id}
- params: name(string), email(string), profession(string), organization(string), category(string), feedback(string), newsletter(boolean) 

- responses:
name(string), email(string), profession(string), organization(string), category(string),
feedback(string), newsletter(string).

#### (DELETE) /account/contact/{id}
- params: id(integer)

#### (POST) /account/login
- params: emai(string), password(string)

- responses: 
is(integer), user_id(string), name(string), username(string), profession(string), organization(string), email(string), email_verified_at(string), password(string), rememmber_token(string), created_at(string), updated_at(string)

## /caches

#### (GET) /caches/data/caches/
none

#### (GET) /caches/man/refresh

none
#### (GET) /caches/man/status
none

## /crud

#### (GET) /crud/dashboard
- params: page(integer)

- responses: 
id(integer), name(string), created_at(string), user(integer), indicators(boolean, integer), datasources(boolean, integer)

#### (POST) /crud/dashboard
- params: name(string), user(integer), indicators(boolean, integer), datasources(boolean, integer)  ---- as an object ----

- responses:
id(integer), name(string), created_at(string), user(integer), indicators(boolean, integer), datasources(boolean, integer)


#### (GET) /crud/dashobard/{id}/
- params: id (integer)

- responses:
id(integer), name(string), created_at(string), user(integer), indicators(boolean, integer), datasources(boolean, integer)

#### (PUT) /crud/dashobard/{id}/
- params: 
1.) name(string), user(integer), indicators(boolean, integer), datasources(boolean, integer)  ---- as an object ----
2.) id (integer)

- responses:
id(integer), name(string), created_at(string), user(integer), indicators(boolean, integer), datasources(boolean, integer)

#### (PATCH) /crud/dashobard/{id}/
- params: 
1.) name(string), user(integer), indicators(boolean, integer), datasources(boolean, integer)  ---- as an object ----
2.) id (integer)

- responses:
id(integer), name(string), created_at(string), user(integer), indicators(boolean, integer), datasources(boolean, integer)

#### (DELETE) /account/contact/{id}
- params: id(integer)

#### (GET) /crud/data
- params: location(string), period(string), datasource(string), datasource_group(string), indicator(string), value_type(string),
page(integer)

- responses: id(integer), period(string), value(string), created_at(string), updated_at(string), indicator(integer), location(integer), datasource(integer), value_type(integer)

#### (POST) /crud/data
- params: ({}) - period(string), value(string), indicator(integer), location(integer), datasource(integer), value_type(integer)

- responses: id(integer), period(string), created_at(string), updated_at(string), value(string), indicator(integer), location(integer), datasource(integer), value_type(integer)

#### (GET) /crud/data/disaggregated
- params: location(string), period(string), datasource(string), datasource_group(string), indicator(string), value_type(string),
page(integer)

- responses: id(integer), period(string), value(string), created_at(string), updated_at(string), indicator(integer), location(integer), datasource(integer), value_type(integer)

#### (POST) /crud/data/disaggregated
- params: period(string), value(string), age(string), gender(string), indicator(integer), location(integer), datasource(integer), valur_type(integer)

- responses: id(integer), period(string), value(string), created_at(string), updated_at(string), indicator(integer), location(integer), datasource(integer), value_type(integer)

#### (GET) /crud/data/indicator_set
- params: location(string), period(string), datasource(string), datasource_group(string), indicator(string), value_type(string),
page(integer))

- responses: id(integer), period(string), value(string), created_at(string), updated_at(string), indicator(integer), location(integer), datasource(integer), value_type(integer)

#### (GET) /crud/data/latest
params: - location(string), period(string), datasource(string), datasource_group(string), indicator(string), value_type(string),
page(integer))

- responses: id(integer), period(string), value(string), created_at(string), updated_at(string), indicator(integer), location(integer), datasource(integer), value_type(integer)

#### (GET) /crud/data/{id}
params: id(integer)

- responses: id(integer), period(string), value(string), created_at(string), updated_at(string), indicator(integer), location(integer), datasource(integer), value_type(integer)

#### (PUT) /crud/data/{id}
- params: 
1.) period(string), value(string), indicators(integer), location(integer), datasources(integer), value_type  ---- as an object ----
2.) id (integer)

- responses: id(integer), period(string), value(string), created_at(string), updated_at(string), indicator(integer), location(integer), datasource(integer), value_type(integer)

#### (PATCH) /crud/data/{id}
- params: 
1.) period(string), value(string), indicators(integer), location(integer), datasources(integer), value_type  ---- as an object ----
2.) id (integer)

- responses: id(integer), period(string), value(string), created_at(string), updated_at(string), indicator(integer), location(integer), datasource(integer), value_type(integer)

#### (DELETE) /crud/data/{id}
- params: 
id (integer)

#### (GET) /crud/datasource_locations/
- params: page(integer)

- responses: id(integer), created_at(string), updated_at(string), location(integer), datasource(integer)

#### (POST) /crud/datasource_locations/
- params: datasource(integer), location(integer)

- responses: id(integer), created_at(string), updated_at(string), datasource(integer), location(integer)

#### (GET) /crud/datasource_locations/{id}
- params: id(integer)

- responses: id(integer), created_at(string), updated_at(string), datasource(integer), location(integer)

#### (PUT) /crud/datasource_locations/{id}
- params: datasource(integer), location(integer)

- responses: id(integer), created_at(string), updated_at(string), datasource(integer), location(integer)

#### (PATCH) /crud/datasource_locations/{id}
- params: 1.) datasource(integer), location(integer)
2.) id(integer)

- responses: id(integer), created_at(string), updated_at(string), datasource(integer), location(integer)

#### (DELETE) /crud/datasource_locations/{id}
- params: id(integer)

#### (GET) /crud/datasource_specific_indicator
- params: page (integer)

- responses: id(integer), datasource_indicator(string), measurement_numberator(string), measurement_denominator(string), frequency(string), methodology_estimation(string), indicator_definition(string), data_level(string), national(boolean), zonal(boolean), state(boolean), senatorial(boolean), lga(boolean), created_at(string), updated_at(string), datasource(integer), indicator(integer)

#### (POST) /crud/datasource_specific_indicator
- params: datasource_indicator(string), measurement_numberator(string), measurement_denominator(string), frequency(string), methodology_estimation(string), indicator_definition(string), data_level(string), national(boolean), zonal(boolean), state(boolean), senatorial(boolean), lga(boolean), created_at(string), updated_at(string), datasource(integer), indicator(integer)

- responses: id(integer), datasource_indicator(string), measurement_numberator(string), measurement_denominator(string), frequency(string), methodology_estimation(string), indicator_definition(string), data_level(string), national(boolean), zonal(boolean), state(boolean), senatorial(boolean), lga(boolean), created_at(string), updated_at(string), datasource(integer), indicator(integer)

#### (GET) /crud/datasource_specific_indicator/{id}
- params: id(integer)

- responses: id(integer), datasource_indicator(string), measurement_numberator(string), measurement_denominator(string), frequency(string), methodology_estimation(string), indicator_definition(string), data_level(string), national(boolean), zonal(boolean), state(boolean), senatorial(boolean), lga(boolean), created_at(string), updated_at(string), datasource(integer), indicator(integer)

#### (PUT) /crud/datasource_specific_indicator/{id}
- params: 1.) datasource_indicator(string), measurement_numberator(string), measurement_denominator(string), frequency(string), methodology_estimation(string), indicator_definition(string), data_level(string), national(boolean), zonal(boolean), state(boolean), senatorial(boolean), lga(boolean), created_at(string), updated_at(string), datasource(integer), indicator(integer)

2.) id(integer)

- responses: id(integer), datasource_indicator(string), measurement_numberator(string), measurement_denominator(string), frequency(string), methodology_estimation(string), indicator_definition(string), data_level(string), national(boolean), zonal(boolean), state(boolean), senatorial(boolean), lga(boolean), created_at(string), updated_at(string), datasource(integer), indicator(integer)

#### (PATCH) /crud/datasource_specific_indicator/{id}
- params: 1.) datasource_indicator(string), measurement_numberator(string), measurement_denominator(string), frequency(string), methodology_estimation(string), indicator_definition(string), data_level(string), national(boolean), zonal(boolean), state(boolean), senatorial(boolean), lga(boolean), created_at(string), updated_at(string), datasource(integer), indicator(integer)

2.) id(integer)

- responses: id(integer), datasource_indicator(string), measurement_numberator(string), measurement_denominator(string), frequency(string), methodology_estimation(string), indicator_definition(string), data_level(string), national(boolean), zonal(boolean), state(boolean), senatorial(boolean), lga(boolean), created_at(string), updated_at(string), datasource(integer), indicator(integer)

#### (DELETE) /crud/datasource_specific_indicator/{id}

- params: id(integer)

#### (GET) /crud/datasource_valuetypes

- params: page(integer)

- responses: id(integer), created_at(string), updated_at(string), datasource(integer), valuetype(integer)

#### (POST) /crud/datasource_valuetypes

- params: datasource(integer), valuetype(integer)

- responses: id(integer), created_at(string), updated_at(string), datasource(integer), valuetype(integer)

#### (GET) /crud/datasource_valuetypes/{id}

- params: id(integer)

- responses: id(integer), created_at(string), updated_at(string), datasource(integer), valuetype(integer)


#### (PUT) /crud/datasource_valuetypes/{id}

- params: 1.) datasource(integer), valuetype(integer)  
2.) id(integer)

- responses: id(integer), created_at(string), updated_at(string), datasource(integer), valuetype(integer)

#### (PATCH) /crud/datasource_valuetypes/{id}

- params: 1.) datasource(integer), valuetype(integer)  
2.) id(integer)

- responses: id(integer), created_at(string), updated_at(string), datasource(integer), valuetype(integer)

#### (DELETE) /crud/datasource_valuetypes/{id}

- params: group(string), page(integer)

#### (GET) /crud/datasource

- params: id(integer), datasource(string), full_name(string), description(string), year_available(string), period_available(string), methodology(string), subnational_data(string), classification(string), created_at(string), updated_at(string), group(boolean, integer) 















