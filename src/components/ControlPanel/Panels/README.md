## Panel Component


**Need to know**

The Base Panel as the name Implies, is the root panel; It houses the different tabs. Tabs are the clickable elements that toggle the view of various control Panels. So an example would be `indicator overview`, This tab when clicked shows the `indicator overview` panel. Likewise, `Zonal analysis` tab displays the `zonal analysis` panel. The panels section of this file, houses a table of the different panels present. All control panels are within the `generic-control panels` folder.

<br>

## Slots

| Name      | Description                             |
| --------- | --------------------------------------- |
| `default` | Use this slot to set different control panel for the site |

<br>

## Props

| Name            | Type            | Description                                                                                                                                                  | Default                      |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `tabs`       | `Array`        |  This Takes and array of the Tabs Title |                              |
| `position`   | `String` | Used to set the position of the tabs for the parent.                                                                                 |                              |

<br>

## Panels

| Name      | Description                             |
| --------- | --------------------------------------- |
| `Indicator overview` | All Multiselect dropdowns for indicator overview are here |
| `Zonal Analysis` |  All Multiselect dropdowns for Zonal analysis are here  |
| `Indicator Comparison` |  All Multiselect dropdowns for indicator comparison are here|
| `Dataset Comparison` | All Multiselect dropdows for Dataset comparison are here |
| `Multisource comparison` | All Multiselect dropdowns for multisource comparison are here |

<br>

**Examples**

This is an overview of what the base panel looks like. Visit the props section to see the accepted props.
<br>

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
