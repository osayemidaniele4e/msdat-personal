<template>
  <div class="col p-2 bg-gray">
    <div class="my-4 mx-auto">
      <h6 class="work-sans font-size-small font-weight-bold">
        CONFIDENCE RANGE
      </h6>
      <p style="color: #7e7e7e" class="mb-0">Toggle ON/OFF</p>
      <b-form-checkbox
        switch
        name="confidence range"
        size="lg"
        value="ON"
        v-model="switchValues"
        unchecked-value="OFF"
        @change="$emit('confidence-button', $event)"
      ></b-form-checkbox>
      <template v-if="options.length > 0">
        <div class="my-3">
          <!-- <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              v-model="selected"
              :options="bootstrapFormattedOptions"
              :aria-describedby="ariaDescribedby"
              stacked
              :disabled="switchValues === 'ON' ? false : true"
              @change="$emit('datasources-selected', $event)"
              class="text-uppercase"
            ></b-form-radio-group> -->
             <div
              v-for="(option) in bootstrapFormattedOptions" :key="option.text"
              class="d-flex align-items-baseline my-3"
            >
              <input
                type='radio' :id='option.text' name='datasource'
                @change="switchTo(option, $event)"
                :disabled="switchValues !== 'ON'"
                style="background-color: #007d53; scale: 1.2;"
                :checked="selected.datasource == option.text"
              />
              <label :for='option.text' style="font-size: 13px; padding: 0 10px; transform: translateY(-3px);">{{ option.text }}</label>
            </div>
          <!-- </b-form-group> -->
        </div>
      </template>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      //   options: [
      //     { text: 'Orange', value: 'orange' },
      //     { text: 'Apple', value: 'apple' },
      //     { text: 'Pineapple', value: 'pineapple' },
      //     { text: 'Grape', value: 'grape' },
      //   ],
      switchValues: '',
      bootstrapFormattedOptions: [],
      selecselectedOptionsted: [],
      selected: [],
      // selectedOptions: [],
    };
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    selectedOptions: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    switchTo(option, e) {
      if (e.target.value === 'on') {
        this.$emit('datasources-selected', option.value);
        this.selected = option.value;
      }
    },
  },
  watch: {
    options: {
      handler(newValue) {
        const format = newValue.map((item) => ({
          text: item.datasource,
          value: item,
        }));
        this.bootstrapFormattedOptions = format;
      },
      immediate: true,
    },
    selectedOptions: {
      handler(newValue) {
        this.selected = newValue;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-gray {
  background-color: $MSDAT_COLOR_GRAY !important;
}
.font-size-small {
  font-size: small !important;
}
</style>
