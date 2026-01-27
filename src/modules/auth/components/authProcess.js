import axios from '@/plugins/axios';

export default {
  data() {
    return {};
  },
  methods: {
    async register(userData) {
      console.log('printing user data', userData);
      const url = '/user/';
      const config = {
        headers: {
          Authorization: `Token ${process.env.VUE_APP_API_TOKEN}`,
        },
      };
      try {
        const response = await axios.post(url, userData, config);
        if (response.data) {
          console.log(response.data);
          // this.$swal({
          //   toast: true,
          //   position: 'bottom-right',
          //   showConfirmButton: false,
          //   timer: 5000,
          //   icon: 'success',
          //   title: 'Success',
          // });
        }
      } catch (error) {
        console.log(error);
        this.$swal({
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 5000,
          icon: 'success',
          title: `${error.message}`,
        });
      } finally {
        this.email = '';
        this.loading = false;
      }
    },
  },
};
