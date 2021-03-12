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

**Note**
use `ctrl+shift+v` to preview Md file in vscode
