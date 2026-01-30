<template>
  <div :style="`width: ${width}`" class="inputBox">
    <ValidationProvider
      tag="div"
      :rules="rules"
      :name="name"
      :vid="vid"
      v-slot="{ errors, ariaInput, ariaMsg }"
    >
      <b-form-group
        :id="name"
        :label="label"
        :label-for="name"
        class="text-left font-weight-bold mt-1"
      >
        <p class="text-black-50 font-weight-lighter mb-1 mt-n1">{{ description }}</p>
        <i
          :class="`${prepend} prepend ${prependclass}`"
          style="color: #c5c1c1"
          aria-hidden="true"
        ></i>
        <b-form-input
          :style="
            `
          height: ${height}
        placeholder:${placeholder};
        color:${colorsec};
        box-shadow:${shadow};
        background-color: ${bgcolor};
        border: ${btnOutline};
        font-size: ${textSize};

          `
          "
          :class="[
            prepend ? 'withprepend' : '',
            append ? 'withappend' : '',
            filled ? 'filled' : '',
            'inputField'
          ]"
          :id="name"
          :type="type"
          :placeholder="placeholder"
          v-model="currentValue"
          v-bind="ariaInput"
        ></b-form-input>
        <i
          :class="
            `${append} append position-absolute
        ${appendclass}`
          "
          @click="$emit('append')"
          style="color: #c5c1c1"
          aria-hidden="true"
        ></i>
      </b-form-group>
      <p
        class="text-danger text-left mt-n1 pb-0 mb-0 font-weight-light"
        v-bind="ariaMsg"
        v-if="errors[0]"
      >
        <small> {{ errors[0] }} </small>
      </p>
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'BaseInput',
  components: {
    ValidationProvider,
  },
  props: {
    value: {
      type: [String, Boolean],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    textSize: {
      type: String,
    },
    bgcolor: {
      type: String,
    },
    btnOutline: {
      type: String,
    },
    radius: {
      type: String,
    },
    color: {
      type: String,
    },
    colorsec: {
      type: String,
    },
    placeholder: {
      type: String,
      default: '',
    },
    filled: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: '',
    },
    prependclass: {
      type: String,
      default: '',
    },
    appendclass: {
      type: String,
      default: '',
    },
    prepend: {
      type: String,
      default: '',
    },
    append: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '98%',
    },
    height: {
      type: String,
      default: '2.5rem',
    },
    rules: {
      type: [String, Object],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    vid: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  data: () => ({
    // currentValue: '',
  }),
  // watch: {
  //   /**
  //    * allows us to use v-model on our input
  //    * @param {*} val
  //    */
  //   currentValue(val) {
  //     this.$emit('input', val);
  //   },
  // },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>

<style scoped>
.inputField,
select.form-control {
  background: #ffffff;
  border: none;
  border: 1px solid #707070;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-radius: 0;
}

.inputField:focus,
select.form-control:focus {
  -webkit-box-shadow: none;
  box-shadow: none;
  border: 1px solid #707070;
}

.withappend {
  padding-right: 3rem;
}

.withprepend {
  padding-left: 3rem;
}

.inputBox i {
  position: absolute;
}
/*
.prepend {
  padding: 10px;
  color: green;
  min-width: 50px;
  text-align: center;
}

.append {
  color: green;
  min-width: 1rem;
  text-align: right;
  top: 10.6rem;
  right: 3.4rem;
} */

.filled {
  background: #efe7e74d;
  border: 1px solid #707070;
}

.filled:focus {
  background: #f3f3f3;
  border: 1px solid #c5c1c1;
}

.filled::placeholder {
  color: 1px solid #c5c1c1;
}
</style>
