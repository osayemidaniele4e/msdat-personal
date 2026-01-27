<template>
  <div class="px-lg-5 px-md-3 container-fluid">
    <div class="card border-0 m-3 p-3">
      <div class="d-flex align-items-center justify-content-between px-4">
        <h3 class="">Data Entry Approval</h3>
        <form class="w-50 ms-5">
          <div>
            <div class="mb-3">
              <div class="form-group w-100">
                <label>Data Entry</label>
                <select
                  class="form-control"
                  name="selectedDataEntry"
                  id="selectedDataEntry"
                  ref="selectedDataEntry"
                  v-model="selectedDataEntry"
                >
                  <option value="" disabled>--Select Data Entry--</option>
                  <option v-for="el in getData" :key="el.id" :value="el.id">
                    {{ el.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div v-if="isChanged" class="ms-5 ps-5">
        <div v-if="!noData">
          <div v-if="isLoading">
            <div class="table-wrap table-responsive px-5">
              <b-skeleton-wrapper>
                <b-skeleton-table
                  :rows="4"
                  :columns="3"
                  :table-props="{ bordered: false, striped: true }"
                ></b-skeleton-table>
              </b-skeleton-wrapper>
            </div>
          </div>
          <div v-else>
            <p class="px-5">Location: {{ singleDataEntry[0].locationName }}</p>
            <p class="px-5">Datasource: {{ singleDataEntry[0].datasourceName }}</p>
            <div class="table-wrap table-responsive px-5">
              <table class="table table-striped table-light h-20">
                <thead class="thead-dark" style="position: sticky; top: 0">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Indicator</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody v-for="(data, i) in singleDataEntry" :key="i">
                  <tr>
                    <th scope="row">{{ i + 1 }}</th>
                    <td>{{ data.indicatorName }}</td>
                    <td>{{ data.value === 'N/A' ? '-' : data.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="px-5 d-flex w-70 m-auto ms-5 justify-content-between">
            <div>
              <b-button
                class="p-3 ms-5 border-0 bg-success button"
                v-b-modal.modal-center1
                @click="isApproved = true"
                >Approve</b-button
              >

              <b-modal id="modal-center1" hide-footer centered>
                <form v-if="isApproved" @submit.prevent="approveDataEntry()" class="ms-5 ps-5">
                  <label>Leave a comment</label>
                  <input type="text" v-model="commenta" class="form-control p-3 mb-3" />
                  <button class="border-0 bg-success button">Submit Comment</button>
                </form>
              </b-modal>
            </div>

            <div class="ms-5">
              <b-button
                v-b-modal.modal-center
                @click="isRejected = true"
                class="p-3 ms-5 border-0 bg-success button"
              >
                Reject</b-button
              >

              <b-modal id="modal-center" hide-footer centered>
                <form v-if="isRejected" @submit.prevent="rejectDataEntry()" class="ms-5">
                  <label>Leave a comment</label>
                  <input type="text" v-model="commentb" class="form-control p-3 mb-3" />
                  <button class="border-0 bg-success button">Submit Comment</button>
                </form>
              </b-modal>
            </div>
          </div>
        </div>
        <div v-else class="w-50 h-30 d-flex m-auto flex-column">
          <el-empty description="There is no data available for the selected criteria."></el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataEntryService from '../services';

export default {
  name: 'Approval-Vue',
  data() {
    return {
      noData: false,
      isApproved: false,
      isRejected: false,
      isChanged: false,
      isLoading: false,
      selectedDataEntry: '',
      singleDataEntry: [],
      entryId: '',
      commenta: '',
      commentb: '',
      getData: [],
      getSingleData: {},
    };
  },

  /**
   * @Author chisomchima
   * @description Function (watcher) to watch for change in selected data entry
   * @returns {array}
   */
  watch: {
    async selectedDataEntry(newval) {
      console.log(newval);
      try {
        this.isLoading = true;
        this.isChanged = true;
        const details = await DataEntryService.getDataEntryById(newval);
        // checking if there is data
        if (details[0].msg === 'Data Available') {
          // console.log(details, 'details')
          this.entryId = null;
          this.noData = false;
        } else if (details[0].msg === 'No Data Available') {
          this.$vToastify.info('Choose another Entry', 'No data available');
          this.noData = true;
        }
        // setting EntryIds and singledata to feed the table and comments
        this.entryId = newval;
        this.singleDataEntry = details;
      } catch (err) {
        this.$vToastify.error('Try again', 'An error occured');
      } finally {
        this.isLoading = false;
      }
    },
  },
  methods: {
    /**
     * @Author chisomchima
     * @description this function is written for dataentry approval
     * @returns {array}
     */
    async approveDataEntry() {
      try {
        if (this.commenta !== '') {
          const data = {
            comment: this.commenta,
          };
          await DataEntryService.approveDataEntry({
            id: this.entryId,
            comment: data,
          });
          this.isApproved = true;
          this.$swal({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            icon: 'success',
            title: 'Data entry Approved',
          });
        } else {
          this.$swal({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            icon: 'warning',
            title: "Empty comment field', 'please type a comment",
          });
        }
        // console.log(response, 'approved')
      } catch (err) {
        console.log(err);
        this.$vToastify.error('Try again', 'An error occured');
      }
    },
    /**
     * @Author chisomchima
     * @description this function is written for dataentry rejection
     * @returns {array}
     */
    async rejectDataEntry() {
      try {
        if (this.commentb !== '') {
          const data = {
            comment: this.commentb,
          };
          await DataEntryService.rejectDataEntry({
            id: this.entryId,
            comment: data,
          });
          this.isRejected = true;
          this.$swal({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            icon: 'warning',
            title: 'Data entry Rejected',
          });
        } else {
          this.$swal({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            icon: 'warning',
            title: "Empty comment field', 'please type a comment",
          });
        }
      } catch (err) {
        console.log(err);
        this.$vToastify.error('Try again', 'An error occured');
      }
    },
  },
  async mounted() {
    this.getData = await DataEntryService.getDataEntries();
    // creating a query parameter for each data entry
    if (this.$route.query.id !== undefined) {
      this.selectedDataEntry = this.$route.query.id;
    }
  },
};
</script>

<style scoped>
.table-wrap {
  height: 40vh;
}
.button {
  color: white;
}
</style>
