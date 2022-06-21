**Note**
the scroll functionality uses the intersection observer api, feel free to go through a brief read on using it with vue
[here]( https://medium.com/@sebassegros/using-intersectionobserver-with-vue-js-8d5dd0134606)
<br>
the mixin that contains the various methods used for this functionality is [here](./onscroll.js)

## Events

| Name      | Description                             |
| --------- | --------------------------------------- |
| `showSection` | This event is triggered by clicking one of the panels in the control panel. It takes in the index of the panel. This would in turn run a function 'showSection' which scrolls down to the corresponding component that has the same ref of the index |

<br>

**Example**
```js
  showSection(index) {
      this.changeScroll(index);
    },
      changeScroll(refName) {
      const element = this.$refs[refName];
      const top = element.offsetTop;
      window.scrollTo({
        top: top - 150,
        left: 0,
        behavior: 'smooth',
      });
      element.click();
    },
```

<br>


**intersection observable api and the page**
<br/>
Each element that is being observed has a number for its id attribute, this number is also the same as the index number for its controlling panel. for instance the indicator overview has an index of 0 in the control panel hence the component that renders it's content has an id of 0 and so on.

**Note**

The function that starts observing the page is fired when the component is mounted.
it has a call back function that is fired for each observed element which takes in the id of the element and uses it to changes the active panel in the control panel.

```js
{
   mounted() {
    this.startScroll();
  },
 startScroll() {
      const callback = (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            const newIndex = Number(target.getAttribute('id'));
            this.changeSection(newIndex);
          }
        });
      };

      const observer = new IntersectionObserver(callback, {
        // root: document.querySelector('#observer-root'),
        threshold: 0.6,
      });
      document.querySelectorAll('.observable').forEach((el) => observer.observe(el));
    },
}
```

<br>
**Note**
use `ctrl+shift+v` to preview Md file in vscode
