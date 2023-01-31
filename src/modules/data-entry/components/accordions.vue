<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="primary">Program Area</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <div class="list_entry">
            <div class="row">
              <div class="col-md-6">
                <label class="font-weight-bold text-uppercase">indicator</label>
              </div>
              <div class="col-md-3">
                <label class="font-weight-bold text-uppercase">Value</label>
              </div>
            </div>
          </div>
          <div class="">
            <div class="row d-flex align-items-center">
              <div class="col-md-6 mb-sm-3">
                <p>chisom</p>
              </div>
              <div class="col-md-6 mb-sm-3">
                <div class="form-group">
                  <label class="font-weight-bold text-uppercase sr-only" for="value">Value</label>
                  <input type="text" name="value" id="" class="form-control" placeholder="Value" />
                </div>
              </div>
            </div>
          </div>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="primary">Program Area</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <div class="list_entry">
            <div class="row">
              <div class="col-md-6">
                <label class="font-weight-bold text-uppercase">indicator</label>
              </div>
              <div class="col-md-3">
                <label class="font-weight-bold text-uppercase">Value</label>
              </div>
            </div>
          </div>
          <div class="">
            <div class="row d-flex align-items-center">
              <div class="col-md-6 mb-sm-3">
                <p>chisom</p>
              </div>
              <div class="col-md-6 mb-sm-3">
                <div class="form-group">
                  <label class="font-weight-bold text-uppercase sr-only" for="value">Value</label>
                  <input type="text" name="value" id="" class="form-control" placeholder="Value" />
                </div>
              </div>
            </div>
          </div>
        </b-card-body>
      </b-collapse>
    </b-card>
    <div class="w-100 d-flex justify-content-end">
      <b-button>Submit</b-button>
    </div>
  </div>
</template>

<script lang="js">

export default {
  name: 'accordions',
  data() {
    return {

    };
  },
};
</script>
