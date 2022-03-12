<template><h1 id="overview-of-dashboard" tabindex="-1"><a class="header-anchor" href="#overview-of-dashboard" aria-hidden="true">#</a> Overview of Dashboard</h1>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>The MSDAT 2.0 was developed to provide a straightforward, user friendly and functional way for performing integrated analysis, viewing and comparing key health indicators from
different data sources. This section aims at giving a detailed explanation of the different compartments at which MSDAT 2.0 houses to achieve its core objectives.</p>
<h2 id="mode-of-use" tabindex="-1"><a class="header-anchor" href="#mode-of-use" aria-hidden="true">#</a> Mode of Use</h2>
<p>There are 5 sections in the MSDAT dashboard i.e; Indicator Overview, Zonal analysis, Indicator Comparison, Dataset Comparison and Multi-Source Comparison.
For each section listed, there is a dedicated control panel displaying fields that filters the data displayed when applied.</p>
<h4 id="controls" tabindex="-1"><a class="header-anchor" href="#controls" aria-hidden="true">#</a> controls:</h4>
<ul>
<li>Expand chart:</li>
</ul>
<p>In every section,there is an expansion icon that expands the chart in view.</p>
<p><img src="@source/guide/assets/expand-icon.png" alt="An image"></p>
<p>Exapnded Modal example:
<img src="@source/guide/assets/expand-modal.png" alt="An image"></p>
<ul>
<li>Dropdown :</li>
</ul>
<p>Presenting each section, is a dropdown menu. This provides the functionality for data to be downloaded in different file formats.</p>
<p><img src="@source/guide/assets/option-dropdown.png" alt="An image"></p>
<ul>
<li>Hovering on data points:</li>
</ul>
<p>When each data point is hovered on all charts, a graphical representation of the data source and value is shown.
<img src="@source/guide/assets/hover-example.png" alt="An image"></p>
<h1 id="sections" tabindex="-1"><a class="header-anchor" href="#sections" aria-hidden="true">#</a> Sections</h1>
<h2 id="indicator-overview" tabindex="-1"><a class="header-anchor" href="#indicator-overview" aria-hidden="true">#</a> Indicator overview</h2>
<p>This tab on the dashboard houses the Indicator table, Statechart &amp; TrendAnalysis Chart.</p>
<h4 id="indicator-overview-filter" tabindex="-1"><a class="header-anchor" href="#indicator-overview-filter" aria-hidden="true">#</a> Indicator overview filter:</h4>
<p><img src="@source/guide/assets/indicator-overview-header.png" alt="An image"></p>
<p>The indicator filter is a core functionality located just below the menu bar that pulls up dynamic data when prompted by the user. It comprises of 6 fields thus; INDICATOR, DATA SOURCE, LOCATION, YEAR, TARGET and NUM/DENUM.</p>
<ul>
<li>When a user clicks on the filter displays a drop-down menu of program areas which includes indicators classified under each of them (Program areas)</li>
<li>Users can click an indicators’ program area to expand it in order to view corresponding indicators.</li>
<li>Users can also search the indicator of choice by typing indicator name in the filter bar. It comes with a predictive text function.</li>
<li>Any of the functions performed above, automatically triggers the system to display Selected indicators that will reflect on all the tabs (charts) of the dashboard.</li>
</ul>
<h3 id="sub-section-indicator-overview" tabindex="-1"><a class="header-anchor" href="#sub-section-indicator-overview" aria-hidden="true">#</a> Sub Section (Indicator Overview)</h3>
<h4 id="indicator-table-top-left" tabindex="-1"><a class="header-anchor" href="#indicator-table-top-left" aria-hidden="true">#</a> Indicator table (Top left)</h4>
<p>This table shows the values of the selected indicator (selected from the indicator filter) across data sources.The table also shows two related indicators with their values across the data sources. Data sources are classified under three categories: i) Routine, ii) National Surveys and iii) Other Estimates</p>
<p><img src="@source/guide/assets/indicator-overview-top-left.png" alt="An image"></p>
<h4 id="state-chart-right" tabindex="-1"><a class="header-anchor" href="#state-chart-right" aria-hidden="true">#</a> State chart (Right)</h4>
<p>This chart shows indicator data for the selected indicator across the states in Nigeria. The National target line is drawn to easily identify what states fall below or above the National target.</p>
<p><img src="@source/guide/assets/indicator-overview-right.png" alt="An image"></p>
<h4 id="trend-analysis-bottom-left" tabindex="-1"><a class="header-anchor" href="#trend-analysis-bottom-left" aria-hidden="true">#</a> Trend analysis (Bottom left)</h4>
<p>This is a chart for multiple data sources showing the trend of an indicator over time.The target line can also be seen on this chart. The data sources are differentiated by colors which can be identified using the legends displayed above the lines.</p>
<p><img src="@source/guide/assets/indicator-overview-bottom-left.png" alt="An image"></p>
<h2 id="zonal-analysis" tabindex="-1"><a class="header-anchor" href="#zonal-analysis" aria-hidden="true">#</a> Zonal Analysis</h2>
<p>The Zonal analysis section is built to compare data gotten from various sources across the different states. This tab is made up of two subtabs.</p>
<h4 id="zonal-analysis-filter" tabindex="-1"><a class="header-anchor" href="#zonal-analysis-filter" aria-hidden="true">#</a> Zonal Analysis filter</h4>
<p><img src="@source/guide/assets/zonal-analysis-header.png" alt="An image"></p>
<p>The control panel for the Zonal analysis section, comprises of 5 fields thus;
INDICATOR, LOCATION, DATA SOURCE, YEAR and TARGET. Data displayed is filtered upon a change on any of the fields.</p>
<h3 id="sub-section-zonal-analysis" tabindex="-1"><a class="header-anchor" href="#sub-section-zonal-analysis" aria-hidden="true">#</a> Sub Section (Zonal Analysis)</h3>
<h4 id="geopolitical-zonal-chart" tabindex="-1"><a class="header-anchor" href="#geopolitical-zonal-chart" aria-hidden="true">#</a> Geopolitical zonal chart</h4>
<p>The geopolitical zones with their states are sorted in descending order of the indicator data value; from left to right i.e. From the highest zone to the lowest zone. The legends below show what color represents a particular geopolitical zone.</p>
<p><img src="@source/guide/assets/zonal-analysis-left.png" alt="An image"></p>
<h4 id="thematic-map" tabindex="-1"><a class="header-anchor" href="#thematic-map" aria-hidden="true">#</a> Thematic Map</h4>
<p>The map is located next to the zonal chart and it helps to visualize the data from the chart according to geographical locations. Each state within a geopolitical zone is identified by a dedicated color to that zone on the map. The legends below show what color represents a state to a particular geopolitical zone.</p>
<p><img src="@source/guide/assets/zonal-analysis-right.png" alt="An image"></p>
<h2 id="indicator-comparison" tabindex="-1"><a class="header-anchor" href="#indicator-comparison" aria-hidden="true">#</a> Indicator comparison</h2>
<p>This tab is designed to allow users to compare indicator data from the different data sources across state/period. The National target line is drawn to easily identify what indicators across data sources fall below or above the National target.</p>
<h4 id="indicator-comparison-filter" tabindex="-1"><a class="header-anchor" href="#indicator-comparison-filter" aria-hidden="true">#</a> Indicator comparison filter</h4>
<p>The control panel for the Indicator comparison section, comprises of 5 fields thus;
COMPARE BY, DATA SOURCE, LOCATION, INDICATOR and TARGET. Data displayed is filtered upon a change on any of the fields.</p>
<p><img src="@source/guide/assets/indicator-comparison-header.png" alt="An image"></p>
<ul>
<li>The Compare By filter
From the drop down menu, select either to compare by ‘Period’ or ‘States’</li>
<li>The datasource filter
This filter is located beside the indicator filter. In this filter you can select up to four (4) different data sources. You can also deselect previously selected data-sources by clicking on the “x” beside the data-source name.</li>
<li>The Indicator filter
Navigate to the indicator filter located below the tab. From the dropdown menu, select the preferred indicator to compare.
The chart has legends at the bottom to help identify an entity on the chart.
Data sources without the indicator’s state data will only reflect the national values on the chart.</li>
</ul>
<h4 id="outcome" tabindex="-1"><a class="header-anchor" href="#outcome" aria-hidden="true">#</a> Outcome:</h4>
<p><img src="@source/guide/assets/indicator-comparison.png" alt="An image"></p>
<h2 id="dataset-comparison" tabindex="-1"><a class="header-anchor" href="#dataset-comparison" aria-hidden="true">#</a> Dataset Comparison</h2>
<p>This tab is designed to compare indicator data from the different sources across states in Nigeria.</p>
<h3 id="dataset-comparison-filter" tabindex="-1"><a class="header-anchor" href="#dataset-comparison-filter" aria-hidden="true">#</a> Dataset Comparison filter</h3>
<ul>
<li>The Indicator filter:</li>
</ul>
<p>The control panel for the Data comparison section, comprises of 2 fields thus;
INDICATOR and DATA SOURCE(S). Data displayed is filtered upon a change on any of the fields.</p>
<p><img src="@source/guide/assets/dataset-comparison-header.png" alt="An image"></p>
<p>Navigate to the indicator filter located below the tab. From the dropdown menu, select the preferred indicator to compare
The datasource filter
This filter is located beside the indicator filter. In this filter you can select up to four (4) different data sources. You can also deselect previously selected data-sources by clicking on the “x” beside the data-source name.</p>
<p>The chart has legends at the bottom to help identify an entity on the chart.</p>
<p>Data sources without the indicator’s state data will only reflect the national values on the chart.</p>
<h4 id="outcome-1" tabindex="-1"><a class="header-anchor" href="#outcome-1" aria-hidden="true">#</a> Outcome:</h4>
<p>Comparison across different data sources by states
<img src="@source/guide/assets/dataset-comparison.png" alt="An image"></p>
<h2 id="multi-source-indicator-comparison" tabindex="-1"><a class="header-anchor" href="#multi-source-indicator-comparison" aria-hidden="true">#</a> Multi source Indicator comparison</h2>
<p>This tab allows to compare and analyze the data of up to three indicators.</p>
<h4 id="multi-source-indicator-comparison-filter" tabindex="-1"><a class="header-anchor" href="#multi-source-indicator-comparison-filter" aria-hidden="true">#</a> Multi source Indicator comparison filter</h4>
<p><img src="@source/guide/assets/multi-source-indicator-header.png" alt="An image"></p>
<p>By default, the selected indicator and two related indicators are shown on the charts.</p>
<ul>
<li>Each chart has 4 visualizations accessible at the top of each  to aid comparisons between 3 different indicator data sets.</li>
<li>Each chart can be expanded for a clearer view by clicking on the “Expand” button located on the top left corner of each chart in the tab.</li>
<li>On the map visualisations, you can zoom in and out by clicking on the “+” and “-” icons respectively, located on the left top corner of the map.</li>
</ul>
<p>The 4 fields for each section includes; INDICATOR, SELECT VISUALIZATIONS, DATA SOURCE and YEAR. Upon any change of the input fields, it directly affects the data shown in for the Multi source Indicator comparison section.</p>
<h4 id="outcome-2" tabindex="-1"><a class="header-anchor" href="#outcome-2" aria-hidden="true">#</a> Outcome:</h4>
<p>Comparison across different indicators/ data source/ year in 3 different sections.
<img src="@source/guide/assets/multi-source-indicator.png" alt="An image"></p>
<ul>
<li>To change Indicator for each chart:
Click the indicator filter for the chart and select the desired indicator.</li>
<li>To change the mode of visualization
Navigate to the visualization bar below the indicator drop down. From the menu, select the preferred visualization mode (Zones map, States Map, Line, Column)</li>
<li>To change datasource for each chart:
Click the datasource filter and select the preferred datasource.</li>
<li>To change Period (Year) for each chart:
Click the period filter and select the year of interest.</li>
</ul>
</template>
