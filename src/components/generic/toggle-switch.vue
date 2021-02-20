<template>
  <div>
    <label
      :for="id + '_button'"
      :class="{ active: isActive }"
      class="toggle__button flex"
    >
      <input
        type="checkbox"
        :disabled="disabled"
        :id="id + '_button'"
        v-model="checkedValue"
      />

      <span class="toggle__switch">
        <p
          class="toggle-text pt-1"
          :class="{ on: isActive == true, off: isActive == false }"
        >
          {{ isActive ? "ON" : "OFF" }}
        </p>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: 'primary',
    },
    defaultState: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentState: this.defaultState,
    };
  },
  watch: {
    defaultState: function defaultState() {
      this.currentState = Boolean(this.defaultState);
    },
  },
  computed: {
    isActive() {
      return this.currentState;
    },
    enableText() {
      return this.labelEnableText;
    },
    disabledText() {
      return this.labelDisableText;
    },
    checkedValue: {
      get() {
        return this.currentState;
      },
      set(newValue) {
        this.currentState = newValue;
        this.$emit('change', newValue);
      },
    },
  },
};
</script>

<style scoped>
.on {
  padding-left: 5px;
}
.off {
  padding-left: 12px;
}
.toggle-text {
  color: #ffffff;
  font-size: 0.875rem;
  font-family: "Work Sans", sans-serif;
}
.toggle__label {
  color: #bdbdbd;
  font-weight: 400;
}
.active {
  color: var(--quad-black);
  font-weight: 500;
}
.toggle__button {
  vertical-align: middle;
  user-select: none;
  cursor: pointer;
}
.toggle__button input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  width: 1px;
  height: 1px;
}
.toggle__button .toggle__switch {
  display: inline-block;
  height: 28px;
  border-radius: 5px;
  width: 42px;
  background: #95989a 0% 0% no-repeat padding-box;
  position: relative;
  transition: all 0.25s;
}

.toggle__button .toggle__switch::after,
.toggle__button .toggle__switch::before {
  content: "";
  position: absolute;
  display: block;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  left: -16px;
  top: 0px;
  border: 1px solid #00000029;

  transform: translateX(0);
  transition: all 0.25s cubic-bezier(0.5, -0.6, 0.5, 1.6);
}
.toggle__button .toggle__switch::after {
  background: #ffffff 0% 0% no-repeat padding-box;

  border-radius: 5px;
}
.toggle__button .toggle__switch::before {
  background: #4d4d4d;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  opacity: 0;
}
.active .toggle__switch {
  background: #00ac40 0% 0% no-repeat padding-box;
}
.active .toggle__switch::after,
.active .toggle__switch::before {
  transform: translateX(40px - 18px);
}
.active .toggle__switch::after {
  border: 1px solid #00000029;
  left: 30px;
  background: white;
}
</style>
