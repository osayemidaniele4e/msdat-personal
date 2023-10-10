<template>
  <div class="body">
    <div class="response" v-if="response">
      <div>
        {{ response }}
      </div>
    </div>
    <div class="policy">
      <div v-for="(policy, index) in policies" :key="index">
        <strong class="title">{{ policy.title }}</strong>
        <div>{{ policy.description }}</div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Body',
  data() {
    return {
      response:
        'As of my last knowledge update in September 2021, I can provide you with some general information about health policies related to childbirth in Nigeria. Please note that policies might have changed since then, so I recommend checking with official sources or recent publications for the most up-to-date information.',
      policies: [
        {
          title: '1. National Policy on Reproductive Health and Rights:',
          description:
            "Nigeria has a National Policy on Reproductive Health and Rights, which outlines the government's commitment to improving maternal and child health, including childbirth. The policy aims to reduce maternal and child mortality, increase access to quality reproductive health services, and promote family planning.",
        },
        {
          title: '2. Safe Motherhood Initiative:',
          description:
            'Nigeria, like many other countries, is committed to the Safe Motherhood Initiative, which focuses on ensuring safe and healthy pregnancies and childbirth. The initiative aims to reduce maternal mortality and improve maternal health by increasing access to skilled care during pregnancy, childbirth, and the postpartum period.',
        },
        {
          title: '3. Midwifery Services:',
          description:
            'The Nigerian government recognizes the importance of skilled midwives in ensuring safe childbirth. Policies aim to improve the quality of midwifery services and enhance the training and deployment of skilled midwives to provide care during pregnancy and childbirth.',
        },
        {
          title: '4. Maternal and Child Health Services:',
          description:
            'Nigeria has been working to improve access to maternal and child health services, including antenatal care, skilled attendance during childbirth, and postnatal care. This includes efforts to increase the availability of healthcare facilities equipped to handle childbirth complications. Family Planning: Promoting family planning services is an integral part of maternal and child health policies in Nigeria. Access to family planning methods and education helps in reducing unintended pregnancies, improving maternal health, and spacing births for healthier outcomes.',
        },
        {
          title: '5. Free Maternal and Child Health Services:',
          description:
            'Some regions in Nigeria have introduced policies to provide free maternal and child health services to encourage women to seek proper care during pregnancy and childbirth, regardless of their socioeconomic status.',
        },
        {
          title: '6. Community Health Workers:',
          description:
            'Nigeria has been utilizing community health workers to reach remote and underserved areas with maternal and child health services. These workers provide education, antenatal care, and support during childbirth, contributing to improved health outcomes.',
        },
        {
          title: '7. Emergency Obstetric Care:',
          description:
            'Policies aim to strengthen emergency obstetric care services to handle complications that may arise during childbirth. This includes equipping healthcare facilities and training healthcare providers to manage obstetric emergencies effectively.',
        },
        {
          title: '8. Data Collection and Monitoring:',
          description:
            "Monitoring maternal and child health indicators is crucial for assessing the effectiveness of policies and interventions. Nigeria has been working on improving data collection and analysis to track progress and identify areas that need further attention. It's important to note that Nigeria is a large and diverse country, and health policies and their implementation can vary between different states and regions. For the most accurate and current information, I recommend checking with Nigeria's Ministry of Health or other reputable health organizations within the country.",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: calc(100vh - 460px);

  .response {
    padding-inline: 150px;
    padding-block: 40px;
    background-color: #d9d9d9;
    div {
      padding-inline: 50px;
      border-left: 1px solid black;
      border-right: 1px solid black;
    }
  }
  .policy {
    margin-top: 40px;
    flex: 1;
    overflow-y: auto;
    padding-inline: 200px;
    width: 100%;
  }
}
</style>
