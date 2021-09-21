<template>
  <div>
    <div class="d-none accordion accordion-flush" id="faq">
      <!-- #2 -->
      <div v-for="data in datas" :key="data.id" class="accordion-item">
        <h2 class="accordion-header" :id="data.id">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#collapse-${data.id}`"
            aria-expanded="false"
            :aria-controls="`collapse-${data.id}`"
          >
            {{ data.title }}
          </button>
        </h2>
        <div
          :id="`collapse-${data.id}`"
          class="accordion-collapse collapse"
          :aria-labelledby="data.title"
          data-bs-parent="#faq"
        >
          <div class="accordion-body">
            {{ data.body }}
          </div>
        </div>
      </div>
    </div>

    <!-- ============================ -->

    <section class="card-body faq-card" id="faq_accordion">
      <div class="accordion" role="tablist">
        <b-card no-body class="border-0" v-for="data in datas" :key="data.id">
          <b-card-header header-tag="header" class="pb-0 px-0 bg-transparent border-0" role="tab">
            <b-button
              block
              v-b-toggle="`accordion-${data.id}`"
              class="bg-header py-2 pb-3 rounded-0 text-left"
              >{{ data.title }}</b-button
            >
          </b-card-header>
          <b-collapse :id="`accordion-${data.id}`" accordion="my-accordion" role="tabpanel">
            <b-card-body class="border-1 mb-1 shadow-sm">
              <b-card-text>{{ data.body }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Accordion',
  data() {
    return {
      datas: [
        {
          id: 1,
          title: 'INNOVATION PRIORITY NEEDS',
          body:
            'Highlight of the Botswana Health priority needs that can be addressed using innovative approaches, tools and technologies',
        },
        {
          id: 2,
          title: 'SUBMIT INNOVATION PROPOSAL',
          body:
            'Do you have an already tested and validated innovative solution that can meet one or more of the highlighted health priority needs? Submit your proposal',
        },
        {
          id: 3,
          title: 'PARTNER WITH US',
          body:
            'Do you wish to partner with us in scaling up innovations to address the identified health needs?',
        },
        {
          id: 4,
          title: 'INNOVATIONS IN THE FIELD',
          body:
            'The innovations being scaled up are showing great impact. Check out these innovations',
        },
        {
          id: 5,
          title: 'INNOVATION PRIORITY NEEDS',
          body:
            'Highlight of the Botswana Health priority needs that can be addressed using innovative approaches, tools and technologies',
        },
        {
          id: 6,
          title: 'SUBMIT INNOVATION PROPOSAL',
          body:
            'Do you have an already tested and validated innovative solution that can meet one or more of the highlighted health priority needs? Submit your proposal',
        },
        {
          id: 7,
          title: 'PARTNER WITH US',
          body:
            'Do you wish to partner with us in scaling up innovations to address the identified health needs?',
        },
        {
          id: 8,
          title: 'INNOVATIONS IN THE FIELD',
          body:
            'The innovations being scaled up are showing great impact. Check out these innovations',
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
section#faq_accordion {
  font-family: 'Work Sans';
  font-size: 15px;
  button.btn.bg-header {
    background-color: #ffffff;
    color: #000000;
    font-weight: 500;
    border-color: #ececec;
    box-shadow: none;
    font-size: 15px;
    border: 0;
    border-bottom: 1.5px solid #00000015;
    text-transform: capitalize;
  }
}
.faq-card {
  border: 1px solid #0000002c;
  padding: 0;
  border-radius: 0.3rem;
}
</style>
