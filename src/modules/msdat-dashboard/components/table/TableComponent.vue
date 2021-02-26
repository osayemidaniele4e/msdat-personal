<template>
  <div>
    <div id="table-wrap" class="table-responsive">
      <table ref="msdat-table">
        <thead>
          <tr>
            <td rowspan="2"></td>
            <th rowspan="2">
              <div class="d-flex justify-content-between">
                <span>indicators</span>
                <b-icon-arrow-counterclockwise @click="resetTable" />
              </div>
            </th>
            <td>routine</td>
            <td colspan="3">national surveys</td>
            <td colspan="2">other estimates</td>
          </tr>
          <tr>
            <th>
              <span
                ref="nhis"
                class="active-data-source"
                accordion="indicator"
                @click="updateTable('nhis')"
              >nhmis</span>
              <b-icon-exclamation-circle-fill v-b-modal.modal />
            </th>
            <th>
              <span
                ref="ndhs"
                accordion="indicator"
                @click="updateTable('ndhs')"
              >ndhs</span>
              <b-icon-exclamation-circle-fill v-b-modal.modal />
            </th>
            <th>
              <span
                ref="mics"
                accordion="indicator"
                @click="updateTable('mics')"
              >mics</span>
              <b-icon-exclamation-circle-fill v-b-modal.modal />
            </th>
            <th>
              <span
                ref="nars"
                accordion="indicator"
                @click="updateTable('nars')"
              >narhs</span>
              <b-icon-exclamation-circle-fill v-b-modal.modal />
            </th>
            <th>
              <span
                ref="ihme"
                accordion="indicator"
                @click="updateTable('ihme')"
              >ihme</span>
              <b-icon-exclamation-circle-fill v-b-modal.modal />
            </th>
            <th>
              <span
                ref="ihme_sdg"
                accordion="indicator"
                @click="updateTable('ihme_sdg')"
              >ihme sdg</span>
              <b-icon-exclamation-circle-fill v-b-modal.modal />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b-icon-exclamation-circle-fill v-b-modal.modal />
            </td>
            <td>
              <div class="d-flex flex-column">
                <select
                  @change="indicatorChanged"
                  v-model="selectedIndicator"
                >
                  <option class="py-2" value="skilled attendance at delivery Or birth">skilled attendance at delivery Or birth</option>
                  <option class="py-2" value="data source2">data source 2</option>
                  <option class="py-2" value="data source 3">data source 3</option>
                  <option class="py-2" value="data source 4">data source 4</option>
                  <option class="py-2" value="data source 5">data source 5</option>
                </select>
                <span>in percentage</span>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span class="font-weight-bold">86%</span>
                <span>2016</span>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span class="font-weight-bold">96%</span>
                <span>2016</span>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span class="font-weight-bold">56%</span>
                <span>2016</span>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span class="font-weight-bold">56%</span>
                <span>2016</span>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span class="font-weight-bold">88%</span>
                <span>2016</span>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span class="font-weight-bold">71%</span>
                <span>2017</span>
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td colspan="7">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex">
                  <span class="mr-1">nhmis</span> <span>2016</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <b>numerator:</b> <span>Total number of doses - 858,814</span>
                  </div>
                  <div>
                    <b>denominator:</b> <span>total number of children - 923,456</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td colspan="7">
              <b>related indicators</b>
            </td>
          </tr>
          <tr>
            <td>
              <b-icon-exclamation-circle-fill v-b-modal.modal />
            </td>
            <td>
              <div class="d-flex flex-column">
                <div class="d-flex flex-column">
                  <select>
                    <option value="">nnc coverage (4 visits)</option>
                    <option value="">data source 2</option>
                    <option value="">data source 3</option>
                    <option value="">data source 4</option>
                    <option value="">data source 5</option>
                  </select>
                  <span>in percentage</span>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span>76%</span>
                <span>2016</span>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span>89%</span>
                <span>2016</span>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span></span>
                <span></span>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span>82%</span>
                <span>2015</span>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span>58%</span>
                <span>2018</span>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span></span>
                <span></span>
              </div>
            </td>
          </tr>
          <div></div>
          <tr>
            <td>
              <b-icon-exclamation-circle-fill v-b-modal.modal />
            </td>
            <td>
              <div class="d-flex flex-column">
                <div class="d-flex flex-column">
                  <select>
                    <option value="">anc coverage (at least 1 visit visit)</option>
                    <option value="">data source 2</option>
                    <option value="">data source 3</option>
                    <option value="">data source 4</option>
                    <option value="">data source 5</option>
                  </select>
                  <span>in percentage</span>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span>67%</span>
                <span>2016</span>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span>86%</span>
                <span>2016</span>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span>62%</span>
                <span>2016</span>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span></span>
                <span></span>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span>62%</span>
                <span>2016</span>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <span>54%</span>
                <span>2018</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- modal -->
    <modal-component
      :modalSize="'lg'"
      v-model="showModal"
    >
      <!-- modal title -->
      <span 
        slot="modal-title"
        class="d-flex flex-column align-items-start flex-md-row align-items-md-center"
      >
        <span>Indicator:</span>
        <span>{{selectedIndicator}}</span>
      </span>

      <!-- modal body -->
      <b-tabs>
        <b-tab
          v-for="(dataSource, index) in dataSources" :key="index"
        >
          <template #title>
            <span>{{dataSource}}</span>
          </template>
          <div class="my-2">
            <p>
              <span class="mr-1">Indicator Name:</span>
              <span>Deliveries by skilled birth attendants</span>
            </p>
            <p>
              <span class="mr-1">Indicator short Name:</span>
              <span>Skilled birth attendance</span>
            </p>
            <p>
              <span class="mr-1">Indicator definition:</span>
              <span>The percentage of live births in the health facility attended to by a skilled birth attendant</span>
            </p>
            <p class="d-flex flex-column align-items-start">
              <span class="mr-1">measurement:</span>
              <span>
                <b>Numerator:</b> Deliveries by skilled birth attendants
              </span>
              <span>
                <b>Denominator:</b> Total number of live births
              </span>
            </p>
            <p>
              <span class="mr-1">multiplier factor:</span>
              <span>100</span>
            </p>
            <p>
              <span class="mr-1">frequency:</span>
              <span>Monthly</span>
            </p>
            <p>
              <span class="mr-1">Type of Indicator:</span>
              <span>Outcome</span>
            </p>
            <p>
              <span class="mr-1">reference:</span>
              <span>
                <a class="modal-lnk mr-1" href="#">https://www.samplereport.com,</a>
                <span>Page 10, Table 2, Column 5</span>
              </span>
            </p>
            <p>
              <span class="mr-1">Level Of Data Available:</span>
              <span class="d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
                <div class="available d-flex align-items-center mr-3">
                  <span class="mr-1">National</span>
                  <b-icon-check-circle-fill
                    scale="0.9"
                  />
                </div>
                <div class="d-flex align-items-center mr-3">
                  <span class="mr-1">Geopolitical Zone</span>
                  <b-icon-check-circle-fill
                    scale="0.9"
                  />
                </div>
                <div class="available d-flex align-items-center mr-3">
                  <span class="mr-1">State Level</span>
                  <b-icon-check-circle-fill
                    scale="0.9"
                  />
                </div>
                <div class="d-flex align-items-center mr-3">
                  <span class="mr-1">Senatorial Level</span>
                  <b-icon-check-circle-fill
                    scale="0.9"
                  />
                </div>
                <div class="d-flex align-items-center mr-3">
                  <span class="mr-1">Local Govt Area</span>
                  <b-icon-check-circle-fill
                    scale="0.9"
                  />
                </div>
              </span>
            </p>
            <p>
              <a class="modal-lnk d-flex align-items-center" href="#">
                <span class="mr-1">Open Meta-Data library</span>
                <b-icon-box-arrow-up-right scale="0.9 "/>
              </a>
            </p>
          </div>
        </b-tab>
      </b-tabs>

      <!-- modal footer -->
      <div slot="modal-footer">
        <button @click="closeModal" class="btn btn-danger text-uppercase small px-4">close</button>
      </div>
    </modal-component>
  </div>
</template>

<script>
import ModalComponent from '../modal/ModalComponent.vue'
export default {
	components: { ModalComponent },
  data() {
    return {
      selectedIndicator: 'skilled attendance at delivery or birth',
      dataSources: [
        'NHMIS', 'NDHS', 'MICS', 'NNHS', 'NARHS', 'WHO-GO', 'World Bank', 'IHME'
      ]
    }
  },
  methods: {
    showModal() {
      this.$bvModal.show(`'modal-${this.modalSize}`)
    },
    closeModal () {
      this.$bvModal.hide('modal')
    },
    updateTable (ref) {
      // console.log(this.$refs)
      const sources = this.$refs
      for (const source in sources) {
        const element = sources[source];
        element.classList = ''
        // console.log(element.classList);
      }
      // this.$refs[ref].className = ('active-data-source')
      this.$refs[ref].classList.toggle('active-data-source')
    },
    resetTable () {
      alert('Resetting table...')
    },
    indicatorChanged () {
      alert('indicator changed successfully')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');

  $msdat-darkgreen: #2B5D5B;
  $msdat-leafgreen: #007D53;


  ::-webkit-scrollbar {
    height: 8px;
    border: 1px solid #B7B7B7;
  }
  ::-webkit-scrollbar-track {
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #BEBEBE;
    border-radius: 4px;
  }

  #table-wrap {
    table {
      width: 650px;

      svg {
        cursor: pointer;
        z-index: 1;

        &.bi-arrow-counterclockwise {
          font-size: 20px;
          color: #87AEAE;
        }
        &.bi-exclamation-circle-fill {
          font-size: 12px;
          color: $msdat-darkgreen;

          &:focus {
            outline-offset: 1px;
            outline-color: $msdat-darkgreen !important;
          }
        }
      }

      select {
        background: transparent;
        border: none;
        font-size: 9px;
        font-weight: bolder;
        text-transform: uppercase;

        &:focus, &:active {
          border: none;
          outline: none;
          outline-offset: 0;
        }
        option {
          background-color: #ffffff;
          font-size: 10.3px;
          font-weight: 500;
          color: #000000;
        }
        &~span {
          font-size: 9px;
        }
      }

      th, td {
        border: 1px solid #c5c5c5;

        &:not(:nth-child(2)) {
          width: fit-content;
        }
      }

      td:first-child {
        border: none;
        padding-right: 5px;
      }

      tr:nth-child(3) {
        td:nth-child(2) {
          padding: 0.5% 1%;
        }
      }

      thead {
        text-transform: uppercase;

        tr {
          th,td {
          border: 1px solid #515151;
          }

          &:first-child {
            font-size: 9px;
            font-weight: lighter;
            color: #171717;

            &>*:nth-child(2) {
              width: 35%;
              font-size: 13px;
              color: #000000;
              padding: 0.5% 1%;
            }
          }
          &:last-child {
            font-size: 10px;
            color: #404040;
            
            &>* {
              padding: 9px 0;
              transition: all 0.6s;

              span {
                margin-right: 3%;
                padding: 1px 3px;
                cursor: pointer;
                transition: font-weight 0.5s;

                &.active-data-source {
                  font-weight: 750;
                  color: #348481;
                }
              }
            }
          }
        }
      }

      tbody {
        tr {
          th,td {
            padding-top: 10px;
            padding-bottom: 10px;

            span:first-child {
              font-size: 11px;
              font-weight: bolder;
              text-transform: uppercase;
              
              &~span {
                font-size: 9px;
              }
            }

            &:nth-child(2) {
              text-align: start;

              select {
                margin: auto 1%;
                color: #005D59;
      
                &~span {
                  margin-left: 3%;
                }
              }
            }
          }

          &:nth-child(1), &:nth-child(2) {
            color: #ffffff;

            select {
              color: #FFFFFF !important;
            }

            &>:not(:first-child) {
              background-color: $msdat-darkgreen;
            }
          }

          &:nth-child(2) {
            td {
              padding: 1%;

              &:last-child {
                &>div {
                  &>div:first-child {
                    width: 15%;
                    
                    span {
                      font-size: 10.5px;
                    }
                  }
                  &>div:last-child {
                    width: 85%;
                    background-color: #ffffff;
                    border-radius: 4px;
                    padding: 0.7% 1.5%;
                    color: #000000;
                    font-size: 10.5px;
                    text-transform: capitalize;

                    span:last-child {
                      font-weight: lighter !important;
                    }
                  }
                }
              }
            }
          }

          // related indicators
          &:nth-child(3) {
            td:last-child {
              border: none;
              padding-top: 2.2%;
              padding-bottom: 1%;
              font-size: 12px;
              font-weight: bolder;
              text-transform: uppercase;
              color: #515151;
            }

            &~div {
              margin: 12px 0;
            }
          }

          &:nth-child(4), &:last-child {
            span:first-child {
              color: #515151;

              &~span {
                color: #888888;
              }
            }
            td:nth-child(2) {
              span:first-child {
                color: #005D59;
                
                &~span {
                  color: #171717;
                }
              }
            }
          }        
        }
      }
    }
  }
</style>
