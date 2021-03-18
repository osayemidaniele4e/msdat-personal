## BasePanel Component


## Slots

| Name      | Description                             |
| --------- | --------------------------------------- |
| `default` | Use this slot to set different control panel for the site |


## Props

| Name            | Type            | Description                                                                                                                                                  | Default                      |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `tabs`       | `Array`        |  The Take and array of the Tabs Title |                              |
| `position`   | `String` | Used to set the position of the tabs for the parent.                                                                                 |                              |

## Panels

| Name      | Description                             |
| --------- | --------------------------------------- |
| `Indicator overview` | All Multiselect dropdowns for indicator overview are here |
| `Zonal Analysis` |  All Multiselect dropdowns for Zonal analysis are here  |
| `Indicator Comparison` |  All Multiselect dropdowns for indicator comparison are here|
| `Dataset Comparison` | All Multiselect dropdows for Dataset comparison are here |
| `Multisource comparison` | All Multiselect dropdowns for multisource comparison are here |


**Example**

```js
<BasePanel
      :tabs="[
        'Indicator Overview',
        'Zonal Analysis',
        'Indicator Comparison',
        'Dataset Comparison',
        'Multi-source Indicator Comparison',
      ]"
      :position="position"
    >
      <template v-slot:default="{ currentTab }">
        <indicatorOverviewPanel v-if="currentTab == 0" @data:options="log" />
      </template>
    </BasePanel>
```

**Note**
 when using the currentTab to identify your panel remember that the first index starts from 0 
 
  The generic folder gouses the generic components, such as the toggle bar and custom checkbox. The side menu for the navigation bar is housed here as well.
  
  

**Note**
use `ctrl+shift+v` to preview Md file in vscode
