**Note**
the scroll functionality uses the intersection observer api, feel free to go through a brief read on using it with vue
[here]( https://medium.com/@sebassegros/using-intersectionobserver-with-vue-js-8d5dd0134606)
<br>

## slots

| Name      | Description                             |
| --------- | --------------------------------------- |
| the default slot | The component that will be rendered once its 50% visible is passed in through here |

<br>

**Example**
```js
  handleIntersect(entries, observer) {
      entries.forEach((entry) => {
        console.log('entry', entry);
        if (entry.isIntersecting) {
          this.showComp = entry.isIntersecting;
          this.loader = 'load';
          observer.unobserve(this.$refs.lazy);
        }
      });
    },
  },
```

<br>


**intersection observable api and the page**
<br/>

The function that starts observing the page is fired when the component is mounted.
it has a call back function that is fired for each observed element which changes the class of the div wrapping the component as well as conditionally show the slot wrapping the component

```js
{
   mounted() {
   const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    this.observer = new IntersectionObserver(this.handleIntersect, options);
    this.observer.observe(this.$refs.lazy);
}
```

<br>
**Note**
use `ctrl+shift+v` to preview Md file in vscode
