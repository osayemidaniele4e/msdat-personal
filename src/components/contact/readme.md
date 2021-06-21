## Contact Component
The Contact component is the view for the contact us page

The Contact component is a user form. As the name implies, it houses our base component. It is however subject to using a pop-up modal `modal.vue`; as highlighted above. `modal.vue` on its end, basically houses the elements and styles for a reuseable modal including :
- the modal box
- header title
- 2 sections of the body/content
- and a footer.
 The modal also has 3 buttons:
- the close button which is in the header title
- the send button which is in the first section of the modal body
- and the close button which is in the second section of the modal body and also performs the same   fuction as the close button



## Dependencies
- axios
- bootstrap
- bootstrap-vue

## install

```js 
import contact from '../path/to/the/component/'
 components: {
    contact,
  },


```
## Usage
```js
<template>          
  <div>
        button to show modal
     <button @click="contactbtn = true" > Contact</button>  
    
    <MODAL v-show="contactbtn" v-on:closeContact="closeContactform"
    v-on:submitContact="conformSend"
    >
    
  </div>
</template>

<script>
export default {
  components: {
    MODAL,
  },  
  data() {
    return { 
      contactFormFields: {
        name: '',
        email: '',
        feedback: '',
      },
    };
  },
};
</script>
```
 
<br /><br />
## Props



| Name            | Type      | Description                                         |
| --------------- | --------- | -------------------------------------- |
| nofields        | Boolean   | show message when there are no user inputs          |
| successmessage  | Boolean   | shows success message on succesful submition to api |
---------------------------------------------------------------------------------

<br /><br />
## slots
| Name            | location              |             
| --------------- | ----------------------| 
|title            |  modal header
|  body_msg       |  modal body           |
|  top1           |  first body section   |
|  top2           |  first body section   |
|  top3           |  first body section   |
|  bottom1        |  second body section  |
|  bottom2        |  second body section  |


---------------------------------------------------------------------------------

## Need to Know
To change anything in the contact component simply make the changes in comtact.vue and pass it in as a slot.

<br /><br />



**Example**

```js
<template>          
  <div>
     <button @click="contactbtn = true" > Contact</button>  
    
    <MODAL v-show="contactbtn" v-on:closeContact="closeContactform"
    v-on:submitContact="conformSend"
    >
    
  </div>
</template>


<script>
import MODAL from '../ui-components/modal/modal.vue';
import axios from "axios";

export default {
  components: {
    MODAL,
  },  
  data() {
    return { 
      contactFormFields: {
        name: '',
        email: '',
        feedback: '',
      },
    };
  },
};
</script>

```
    

**Note**
use `ctrl+shift+v` to preview Md file in vscode
