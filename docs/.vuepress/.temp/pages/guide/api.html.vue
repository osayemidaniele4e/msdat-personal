<template><h1 id="api-schema" tabindex="-1"><a class="header-anchor" href="#api-schema" aria-hidden="true">#</a> API schema</h1>
<p>display a chart diagram</p>
<h3 id="api-endpoints" tabindex="-1"><a class="header-anchor" href="#api-endpoints" aria-hidden="true">#</a> API endpoints</h3>
<h2 id="account" tabindex="-1"><a class="header-anchor" href="#account" aria-hidden="true">#</a> /account</h2>
<h4 id="get-account-contact" tabindex="-1"><a class="header-anchor" href="#get-account-contact" aria-hidden="true">#</a> (GET) /account/contact/</h4>
<ul>
<li>
<p>params: page(integer)</p>
</li>
<li>
<p>responses:
id(integer), email(string), profession(string), organization(string), category(string),
feedback(string), created_at(string), updated_at(string).</p>
</li>
</ul>
<h4 id="post-account-contact" tabindex="-1"><a class="header-anchor" href="#post-account-contact" aria-hidden="true">#</a> (POST) /account/contact/</h4>
<ul>
<li>
<p>params: name(string), email(string), profession(string), organization(string), category(string), feedback(string), newsletter(boolean)</p>
</li>
<li>
<p>responses:
name(string), email(string), profession(string), organization(string), category(string),
feedback(string), newsletter(string).</p>
</li>
</ul>
<h4 id="get-account-contact-id" tabindex="-1"><a class="header-anchor" href="#get-account-contact-id" aria-hidden="true">#</a> (GET) /account/contact/{id}</h4>
<ul>
<li>
<p>params: id(integer)</p>
</li>
<li>
<p>repsonses:
id(integer), email(string), profession(string), organization(string), category(string),
feedback(string), created_at(string), updated_at(string).</p>
</li>
</ul>
<h4 id="put-account-contact-id" tabindex="-1"><a class="header-anchor" href="#put-account-contact-id" aria-hidden="true">#</a> (PUT) /account/contact/{id}</h4>
<ul>
<li>
<p>params: name(string), email(string), profession(string), organization(string), category(string), feedback(string), newsletter(boolean)</p>
</li>
<li>
<p>responses:
name(string), email(string), profession(string), organization(string), category(string),
feedback(string), newsletter(string).</p>
</li>
</ul>
<h4 id="patch-account-contact-id" tabindex="-1"><a class="header-anchor" href="#patch-account-contact-id" aria-hidden="true">#</a> (PATCH) /account/contact/{id}</h4>
<ul>
<li>
<p>params: name(string), email(string), profession(string), organization(string), category(string), feedback(string), newsletter(boolean)</p>
</li>
<li>
<p>responses:
name(string), email(string), profession(string), organization(string), category(string),
feedback(string), newsletter(string).</p>
</li>
</ul>
<h4 id="delete-account-contact-id" tabindex="-1"><a class="header-anchor" href="#delete-account-contact-id" aria-hidden="true">#</a> (DELETE) /account/contact/{id}</h4>
<ul>
<li>params: id(integer)</li>
</ul>
<h4 id="post-account-login" tabindex="-1"><a class="header-anchor" href="#post-account-login" aria-hidden="true">#</a> (POST) /account/login</h4>
<ul>
<li>
<p>params: emai(string), password(string)</p>
</li>
<li>
<p>responses:
is(integer), user_id(string), name(string), username(string), profession(string), organization(string), email(string), email_verified_at(string), password(string), rememmber_token(string), created_at(string), updated_at(string)</p>
</li>
</ul>
<h2 id="caches" tabindex="-1"><a class="header-anchor" href="#caches" aria-hidden="true">#</a> /caches</h2>
<h4 id="get-caches-data-caches" tabindex="-1"><a class="header-anchor" href="#get-caches-data-caches" aria-hidden="true">#</a> (GET) /caches/data/caches/</h4>
<p>none</p>
<h4 id="get-caches-man-refresh" tabindex="-1"><a class="header-anchor" href="#get-caches-man-refresh" aria-hidden="true">#</a> (GET) /caches/man/refresh</h4>
<p>none</p>
<h4 id="get-caches-man-status" tabindex="-1"><a class="header-anchor" href="#get-caches-man-status" aria-hidden="true">#</a> (GET) /caches/man/status</h4>
<p>none</p>
<h2 id="crud" tabindex="-1"><a class="header-anchor" href="#crud" aria-hidden="true">#</a> /crud</h2>
<h4 id="get-crud-dashboard" tabindex="-1"><a class="header-anchor" href="#get-crud-dashboard" aria-hidden="true">#</a> (GET) /crud/dashboard</h4>
<ul>
<li>
<p>params: page(integer)</p>
</li>
<li>
<p>responses:
id(integer), name(string), created_at(string), user(integer), indicators(boolean, integer), datasources(boolean, integer)</p>
</li>
</ul>
<h4 id="post-crud-dashboard" tabindex="-1"><a class="header-anchor" href="#post-crud-dashboard" aria-hidden="true">#</a> (POST) /crud/dashboard</h4>
<ul>
<li>
<p>params: name(string), user(integer), indicators(boolean, integer), datasources(boolean, integer)  ---- as an object ----</p>
</li>
<li>
<p>responses:
id(integer), name(string), created_at(string), user(integer), indicators(boolean, integer), datasources(boolean, integer)</p>
</li>
</ul>
<h4 id="get-crud-dashobard-id" tabindex="-1"><a class="header-anchor" href="#get-crud-dashobard-id" aria-hidden="true">#</a> (GET) /crud/dashobard/{id}/</h4>
<ul>
<li>
<p>params: id (integer)</p>
</li>
<li>
<p>responses:
id(integer), name(string), created_at(string), user(integer), indicators(boolean, integer), datasources(boolean, integer)</p>
</li>
</ul>
<h4 id="put-crud-dashobard-id" tabindex="-1"><a class="header-anchor" href="#put-crud-dashobard-id" aria-hidden="true">#</a> (PUT) /crud/dashobard/{id}/</h4>
<ul>
<li>
<p>params:
1.) name(string), user(integer), indicators(boolean, integer), datasources(boolean, integer)  ---- as an object ----
2.) id (integer)</p>
</li>
<li>
<p>responses:
id(integer), name(string), created_at(string), user(integer), indicators(boolean, integer), datasources(boolean, integer)</p>
</li>
</ul>
<h4 id="patch-crud-dashobard-id" tabindex="-1"><a class="header-anchor" href="#patch-crud-dashobard-id" aria-hidden="true">#</a> (PATCH) /crud/dashobard/{id}/</h4>
<ul>
<li>
<p>params:
1.) name(string), user(integer), indicators(boolean, integer), datasources(boolean, integer)  ---- as an object ----
2.) id (integer)</p>
</li>
<li>
<p>responses:
id(integer), name(string), created_at(string), user(integer), indicators(boolean, integer), datasources(boolean, integer)</p>
</li>
</ul>
<h4 id="delete-account-contact-id-1" tabindex="-1"><a class="header-anchor" href="#delete-account-contact-id-1" aria-hidden="true">#</a> (DELETE) /account/contact/{id}</h4>
<ul>
<li>params: id(integer)</li>
</ul>
<h4 id="get-crud-data" tabindex="-1"><a class="header-anchor" href="#get-crud-data" aria-hidden="true">#</a> (GET) /crud/data</h4>
<ul>
<li>
<p>params: location(string), period(string), datasource(string), datasource_group(string), indicator(string), value_type(string),
page(integer)</p>
</li>
<li>
<p>responses: id(integer), period(string), value(string), created_at(string), updated_at(string), indicator(integer), location(integer), datasource(integer), value_type(integer)</p>
</li>
</ul>
<h4 id="post-crud-data" tabindex="-1"><a class="header-anchor" href="#post-crud-data" aria-hidden="true">#</a> (POST) /crud/data</h4>
<ul>
<li>
<p>params: ({}) - period(string), value(string), indicator(integer), location(integer), datasource(integer), value_type(integer)</p>
</li>
<li>
<p>responses: id(integer), period(string), created_at(string), updated_at(string), value(string), indicator(integer), location(integer), datasource(integer), value_type(integer)</p>
</li>
</ul>
<h4 id="get-crud-data-disaggregated" tabindex="-1"><a class="header-anchor" href="#get-crud-data-disaggregated" aria-hidden="true">#</a> (GET) /crud/data/disaggregated</h4>
<ul>
<li>
<p>params: location(string), period(string), datasource(string), datasource_group(string), indicator(string), value_type(string),
page(integer)</p>
</li>
<li>
<p>responses: id(integer), period(string), value(string), created_at(string), updated_at(string), indicator(integer), location(integer), datasource(integer), value_type(integer)</p>
</li>
</ul>
<h4 id="post-crud-data-disaggregated" tabindex="-1"><a class="header-anchor" href="#post-crud-data-disaggregated" aria-hidden="true">#</a> (POST) /crud/data/disaggregated</h4>
<ul>
<li>
<p>params: period(string), value(string), age(string), gender(string), indicator(integer), location(integer), datasource(integer), valur_type(integer)</p>
</li>
<li>
<p>responses: id(integer), period(string), value(string), created_at(string), updated_at(string), indicator(integer), location(integer), datasource(integer), value_type(integer)</p>
</li>
</ul>
<h4 id="get-crud-data-indicator-set" tabindex="-1"><a class="header-anchor" href="#get-crud-data-indicator-set" aria-hidden="true">#</a> (GET) /crud/data/indicator_set</h4>
<ul>
<li>
<p>params: location(string), period(string), datasource(string), datasource_group(string), indicator(string), value_type(string),
page(integer))</p>
</li>
<li>
<p>responses: id(integer), period(string), value(string), created_at(string), updated_at(string), indicator(integer), location(integer), datasource(integer), value_type(integer)</p>
</li>
</ul>
<h4 id="get-crud-data-latest" tabindex="-1"><a class="header-anchor" href="#get-crud-data-latest" aria-hidden="true">#</a> (GET) /crud/data/latest</h4>
<p>params: - location(string), period(string), datasource(string), datasource_group(string), indicator(string), value_type(string),
page(integer))</p>
<ul>
<li>responses: id(integer), period(string), value(string), created_at(string), updated_at(string), indicator(integer), location(integer), datasource(integer), value_type(integer)</li>
</ul>
<h4 id="get-crud-data-id" tabindex="-1"><a class="header-anchor" href="#get-crud-data-id" aria-hidden="true">#</a> (GET) /crud/data/{id}</h4>
<p>params: id(integer)</p>
<ul>
<li>responses: id(integer), period(string), value(string), created_at(string), updated_at(string), indicator(integer), location(integer), datasource(integer), value_type(integer)</li>
</ul>
<h4 id="put-crud-data-id" tabindex="-1"><a class="header-anchor" href="#put-crud-data-id" aria-hidden="true">#</a> (PUT) /crud/data/{id}</h4>
<ul>
<li>
<p>params:
1.) period(string), value(string), indicators(integer), location(integer), datasources(integer), value_type  ---- as an object ----
2.) id (integer)</p>
</li>
<li>
<p>responses: id(integer), period(string), value(string), created_at(string), updated_at(string), indicator(integer), location(integer), datasource(integer), value_type(integer)</p>
</li>
</ul>
<h4 id="patch-crud-data-id" tabindex="-1"><a class="header-anchor" href="#patch-crud-data-id" aria-hidden="true">#</a> (PATCH) /crud/data/{id}</h4>
<ul>
<li>
<p>params:
1.) period(string), value(string), indicators(integer), location(integer), datasources(integer), value_type  ---- as an object ----
2.) id (integer)</p>
</li>
<li>
<p>responses: id(integer), period(string), value(string), created_at(string), updated_at(string), indicator(integer), location(integer), datasource(integer), value_type(integer)</p>
</li>
</ul>
<h4 id="delete-crud-data-id" tabindex="-1"><a class="header-anchor" href="#delete-crud-data-id" aria-hidden="true">#</a> (DELETE) /crud/data/{id}</h4>
<ul>
<li>params:
id (integer)</li>
</ul>
<h4 id="get-crud-datasource-locations" tabindex="-1"><a class="header-anchor" href="#get-crud-datasource-locations" aria-hidden="true">#</a> (GET) /crud/datasource_locations/</h4>
<ul>
<li>
<p>params: page(integer)</p>
</li>
<li>
<p>responses: id(integer), created_at(string), updated_at(string), location(integer), datasource(integer)</p>
</li>
</ul>
<h4 id="post-crud-datasource-locations" tabindex="-1"><a class="header-anchor" href="#post-crud-datasource-locations" aria-hidden="true">#</a> (POST) /crud/datasource_locations/</h4>
<ul>
<li>
<p>params: datasource(integer), location(integer)</p>
</li>
<li>
<p>responses: id(integer), created_at(string), updated_at(string), datasource(integer), location(integer)</p>
</li>
</ul>
<h4 id="get-crud-datasource-locations-id" tabindex="-1"><a class="header-anchor" href="#get-crud-datasource-locations-id" aria-hidden="true">#</a> (GET) /crud/datasource_locations/{id}</h4>
<ul>
<li>
<p>params: id(integer)</p>
</li>
<li>
<p>responses: id(integer), created_at(string), updated_at(string), datasource(integer), location(integer)</p>
</li>
</ul>
<h4 id="put-crud-datasource-locations-id" tabindex="-1"><a class="header-anchor" href="#put-crud-datasource-locations-id" aria-hidden="true">#</a> (PUT) /crud/datasource_locations/{id}</h4>
<ul>
<li>
<p>params: datasource(integer), location(integer)</p>
</li>
<li>
<p>responses: id(integer), created_at(string), updated_at(string), datasource(integer), location(integer)</p>
</li>
</ul>
<h4 id="patch-crud-datasource-locations-id" tabindex="-1"><a class="header-anchor" href="#patch-crud-datasource-locations-id" aria-hidden="true">#</a> (PATCH) /crud/datasource_locations/{id}</h4>
<ul>
<li>
<p>params: 1.) datasource(integer), location(integer)
2.) id(integer)</p>
</li>
<li>
<p>responses: id(integer), created_at(string), updated_at(string), datasource(integer), location(integer)</p>
</li>
</ul>
<h4 id="delete-crud-datasource-locations-id" tabindex="-1"><a class="header-anchor" href="#delete-crud-datasource-locations-id" aria-hidden="true">#</a> (DELETE) /crud/datasource_locations/{id}</h4>
<ul>
<li>params: id(integer)</li>
</ul>
<h4 id="get-crud-datasource-specific-indicator" tabindex="-1"><a class="header-anchor" href="#get-crud-datasource-specific-indicator" aria-hidden="true">#</a> (GET) /crud/datasource_specific_indicator</h4>
<ul>
<li>
<p>params: page (integer)</p>
</li>
<li>
<p>responses: id(integer), datasource_indicator(string), measurement_numberator(string), measurement_denominator(string), frequency(string), methodology_estimation(string), indicator_definition(string), data_level(string), national(boolean), zonal(boolean), state(boolean), senatorial(boolean), lga(boolean), created_at(string), updated_at(string), datasource(integer), indicator(integer)</p>
</li>
</ul>
<h4 id="post-crud-datasource-specific-indicator" tabindex="-1"><a class="header-anchor" href="#post-crud-datasource-specific-indicator" aria-hidden="true">#</a> (POST) /crud/datasource_specific_indicator</h4>
<ul>
<li>
<p>params: datasource_indicator(string), measurement_numberator(string), measurement_denominator(string), frequency(string), methodology_estimation(string), indicator_definition(string), data_level(string), national(boolean), zonal(boolean), state(boolean), senatorial(boolean), lga(boolean), created_at(string), updated_at(string), datasource(integer), indicator(integer)</p>
</li>
<li>
<p>responses: id(integer), datasource_indicator(string), measurement_numberator(string), measurement_denominator(string), frequency(string), methodology_estimation(string), indicator_definition(string), data_level(string), national(boolean), zonal(boolean), state(boolean), senatorial(boolean), lga(boolean), created_at(string), updated_at(string), datasource(integer), indicator(integer)</p>
</li>
</ul>
<h4 id="get-crud-datasource-specific-indicator-id" tabindex="-1"><a class="header-anchor" href="#get-crud-datasource-specific-indicator-id" aria-hidden="true">#</a> (GET) /crud/datasource_specific_indicator/{id}</h4>
<ul>
<li>
<p>params: id(integer)</p>
</li>
<li>
<p>responses: id(integer), datasource_indicator(string), measurement_numberator(string), measurement_denominator(string), frequency(string), methodology_estimation(string), indicator_definition(string), data_level(string), national(boolean), zonal(boolean), state(boolean), senatorial(boolean), lga(boolean), created_at(string), updated_at(string), datasource(integer), indicator(integer)</p>
</li>
</ul>
<h4 id="put-crud-datasource-specific-indicator-id" tabindex="-1"><a class="header-anchor" href="#put-crud-datasource-specific-indicator-id" aria-hidden="true">#</a> (PUT) /crud/datasource_specific_indicator/{id}</h4>
<ul>
<li>params: 1.) datasource_indicator(string), measurement_numberator(string), measurement_denominator(string), frequency(string), methodology_estimation(string), indicator_definition(string), data_level(string), national(boolean), zonal(boolean), state(boolean), senatorial(boolean), lga(boolean), created_at(string), updated_at(string), datasource(integer), indicator(integer)</li>
</ul>
<p>2.) id(integer)</p>
<ul>
<li>responses: id(integer), datasource_indicator(string), measurement_numberator(string), measurement_denominator(string), frequency(string), methodology_estimation(string), indicator_definition(string), data_level(string), national(boolean), zonal(boolean), state(boolean), senatorial(boolean), lga(boolean), created_at(string), updated_at(string), datasource(integer), indicator(integer)</li>
</ul>
<h4 id="patch-crud-datasource-specific-indicator-id" tabindex="-1"><a class="header-anchor" href="#patch-crud-datasource-specific-indicator-id" aria-hidden="true">#</a> (PATCH) /crud/datasource_specific_indicator/{id}</h4>
<ul>
<li>params: 1.) datasource_indicator(string), measurement_numberator(string), measurement_denominator(string), frequency(string), methodology_estimation(string), indicator_definition(string), data_level(string), national(boolean), zonal(boolean), state(boolean), senatorial(boolean), lga(boolean), created_at(string), updated_at(string), datasource(integer), indicator(integer)</li>
</ul>
<p>2.) id(integer)</p>
<ul>
<li>responses: id(integer), datasource_indicator(string), measurement_numberator(string), measurement_denominator(string), frequency(string), methodology_estimation(string), indicator_definition(string), data_level(string), national(boolean), zonal(boolean), state(boolean), senatorial(boolean), lga(boolean), created_at(string), updated_at(string), datasource(integer), indicator(integer)</li>
</ul>
<h4 id="delete-crud-datasource-specific-indicator-id" tabindex="-1"><a class="header-anchor" href="#delete-crud-datasource-specific-indicator-id" aria-hidden="true">#</a> (DELETE) /crud/datasource_specific_indicator/{id}</h4>
<ul>
<li>params: id(integer)</li>
</ul>
<h4 id="get-crud-datasource-valuetypes" tabindex="-1"><a class="header-anchor" href="#get-crud-datasource-valuetypes" aria-hidden="true">#</a> (GET) /crud/datasource_valuetypes</h4>
<ul>
<li>
<p>params: page(integer)</p>
</li>
<li>
<p>responses: id(integer), created_at(string), updated_at(string), datasource(integer), valuetype(integer)</p>
</li>
</ul>
<h4 id="post-crud-datasource-valuetypes" tabindex="-1"><a class="header-anchor" href="#post-crud-datasource-valuetypes" aria-hidden="true">#</a> (POST) /crud/datasource_valuetypes</h4>
<ul>
<li>
<p>params: datasource(integer), valuetype(integer)</p>
</li>
<li>
<p>responses: id(integer), created_at(string), updated_at(string), datasource(integer), valuetype(integer)</p>
</li>
</ul>
<h4 id="get-crud-datasource-valuetypes-id" tabindex="-1"><a class="header-anchor" href="#get-crud-datasource-valuetypes-id" aria-hidden="true">#</a> (GET) /crud/datasource_valuetypes/{id}</h4>
<ul>
<li>
<p>params: id(integer)</p>
</li>
<li>
<p>responses: id(integer), created_at(string), updated_at(string), datasource(integer), valuetype(integer)</p>
</li>
</ul>
<h4 id="put-crud-datasource-valuetypes-id" tabindex="-1"><a class="header-anchor" href="#put-crud-datasource-valuetypes-id" aria-hidden="true">#</a> (PUT) /crud/datasource_valuetypes/{id}</h4>
<ul>
<li>
<p>params: 1.) datasource(integer), valuetype(integer)<br>
2.) id(integer)</p>
</li>
<li>
<p>responses: id(integer), created_at(string), updated_at(string), datasource(integer), valuetype(integer)</p>
</li>
</ul>
<h4 id="patch-crud-datasource-valuetypes-id" tabindex="-1"><a class="header-anchor" href="#patch-crud-datasource-valuetypes-id" aria-hidden="true">#</a> (PATCH) /crud/datasource_valuetypes/{id}</h4>
<ul>
<li>
<p>params: 1.) datasource(integer), valuetype(integer)<br>
2.) id(integer)</p>
</li>
<li>
<p>responses: id(integer), created_at(string), updated_at(string), datasource(integer), valuetype(integer)</p>
</li>
</ul>
<h4 id="delete-crud-datasource-valuetypes-id" tabindex="-1"><a class="header-anchor" href="#delete-crud-datasource-valuetypes-id" aria-hidden="true">#</a> (DELETE) /crud/datasource_valuetypes/{id}</h4>
<ul>
<li>params: group(string), page(integer)</li>
</ul>
<h4 id="get-crud-datasource" tabindex="-1"><a class="header-anchor" href="#get-crud-datasource" aria-hidden="true">#</a> (GET) /crud/datasource</h4>
<ul>
<li>params: id(integer), datasource(string), full_name(string), description(string), year_available(string), period_available(string), methodology(string), subnational_data(string), classification(string), created_at(string), updated_at(string), group(boolean, integer)</li>
</ul>
</template>
