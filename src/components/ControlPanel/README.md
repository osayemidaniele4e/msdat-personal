
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
## Events

| Name      | Description                             |
| --------- | --------------------------------------- |
| `data:options` | This event is triggered by the watcher in the panels. It houses the data payload from each panel. This would give us access to the various payload housed by the  panels |

<br>

**Example**
```js
  watch: {
    payload: {
      handler(newValue) {
        this.$emit('data:options', newValue);
      },

      immediate: true,
      deep: false,
    },
  },
```

<br>

**Note**
The returned payload is in of type `Object` and has these Keys: 

```js
{
indicator:'....,
dataSource:'....'
year:'....'.
.....
}
```

<br>

**Note**

The generic folder houses the generic components, such as the toggle bar and custom checkbox. The side menu for the navigation bar is housed here as well.
  
  

**Note**
use `ctrl+shift+v` to preview Md file in vscode
