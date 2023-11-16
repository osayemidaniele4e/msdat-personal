<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="w-100 px-3 content">
          <div class="d-flex justify-content-between my-1">
            <h1>Share Code</h1>
            <button @click="close()" type="button" class="close close-x" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div id="iframeItem" class="d-flex flex-column  input-item">
            <!-- <textarea v-model="tableContent" name="" id="" cols="20" rows="5"></textarea> -->
            <iframe style="padding: 5px" width="1000" height="400"  :src="tableContent"></iframe>
          </div>
        </div>

        <div v-if="urlContent !== null" class="btn-wrapper mt-3">
          <input v-model="urlContent" type="text" />
          <button @click="copyContent" class="delete">
            <div v-if="showLoader" class="spinner-border text-light mx-3" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            Copy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ShareCodeModal',
  props: {
    tableContent: String,
  },

  data() {
    return {
      name: null,
      short_name: null,
      showLoader: false,
      urlContent: null,
    };
  },
  methods: {
    close() {
      this.$emit('toggleShowShareModal');
    },

    copyContent() {
      // Copy the input content to the clipboard
      const inputElement = document.createElement('textarea');
      inputElement.value = this.tableContent;
      document.body.appendChild(inputElement);
      inputElement.select();
      document.execCommand('copy');
      document.body.removeChild(inputElement);
      this.$swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        icon: 'success',
        title: 'Success',
        text: 'Content copied to clipboard!',
      });
      // alert('Content copied to clipboard!');
    },
  },
  async mounted() {
    const tableObjTemp = await document.getElementById('iframeItem').innerHTML;
    this.urlContent = tableObjTemp;
    console.log(this.urlContent, 'tableObjTemp');
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 1050px;
  height: auto;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  padding: 30px 20px;
  overflow-x: scroll;
}

.modal-container h1 {
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  color: #707070;
}

.btn-wrapper {
  width: 100%;
  display: flex;
  padding: 0 20px;
}
.btn-wrapper button {
  margin: 0 5px;
  height: 40px;
  border-radius: 5px;
  font-size: 16px;
  line-height: 20px;
  padding: 0 10px;
  border: 1px solid #707070;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-wrapper .delete {
  background: green;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 8px;
  color: #fff;
  padding: 10px 15px;
  border: none;
}

.btn-wrapper .back {
  color: #707070;
  padding: 10px 0px;
}

.btn-wrapper input {
  width: 96%;
  border-radius: 5px;
  outline: none;
  padding: 0 4px;
  border: 1px solid #c1c1c1;
}

.close-icon {
  font-size: 20px;
}
.close-x {
  background-color: #f1f1f1;
  padding: 2px 8px;
  border-radius: 50px;
  font-size: 30px;
}
/* .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  height: 350px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  padding: 30px 20px;
}

.modal-container h1 {
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  color: #707070;
}

.btn-wrapper {
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 0 20px;
}
.btn-wrapper button {
  margin: 0 5px;
  height: 40px;
  border-radius: 5px;
  font-size: 16px;
  line-height: 20px;
  padding: 0 10px;
  border: 1px solid #707070;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-wrapper button img {
  width: 20px;
  height: 20px;
  margin-right: 4px;
}

.btn-wrapper .delete {
  background: green;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 8px;
  color: #fff;
  padding: 10px 15px;
  border: none;
}

.btn-wrapper .back {
  color: #707070;
  padding: 10px 15px;
}

.input-item {
  margin: 20px 0;
}
.input-item input {
  padding: 10px 15px;
  border-radius: 8px;
  outline: none;
  border: 1px solid #61a229;
}
.input-item label {
  font: normal normal medium 14px/19px Montserrat;
  letter-spacing: 0px;
  color: #707070;
}

.input-item select {
  padding: 13px 15px;
  border-radius: 8px;
  outline: none;
  border: 1px solid #61a229;
}
.content h1 {
  letter-spacing: 0px;
  color: #232323;
} */
</style>
