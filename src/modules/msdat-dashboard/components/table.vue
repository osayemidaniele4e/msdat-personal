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
                <b-icon-arrow-counterclockwise />
              </div>
            </th>
            <td>routine</td>
            <td colspan="3">national surveys</td>
            <td colspan="2">other estimates</td>
          </tr>
          <tr>
            <th>
              <span class="active-data-source">nhmis</span>
              <b-icon-exclamation-circle-fill v-b-modal="'info-modal'" />
            </th>
            <th>
              <span>ndhs</span>
              <b-icon-exclamation-circle-fill v-b-modal="'info-modal'" />
            </th>
            <th>
              <span>mics</span>
              <b-icon-exclamation-circle-fill v-b-modal="'info-modal'" />
            </th>
            <th>
              <span>narhs</span>
              <b-icon-exclamation-circle-fill v-b-modal="'info-modal'" />
            </th>
            <th>
              <span>ihme</span>
              <b-icon-exclamation-circle-fill v-b-modal="'info-modal'" />
            </th>
            <th>
              <span>ihme sdg</span>
              <b-icon-exclamation-circle-fill v-b-modal="'info-modal'" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b-icon-exclamation-circle-fill v-b-modal="'info-modal'" />
            </td>
            <td>
              <div class="d-flex flex-column">
                <select>
                  <option class="py-2" value="">skilled attendance at delivery Or birth</option>
                  <option class="py-2" value="">data source 2</option>
                  <option class="py-2" value="">data source 3</option>
                  <option class="py-2" value="">data source 4</option>
                  <option class="py-2" value="">data source 5</option>
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
              <b-icon-exclamation-circle-fill v-b-modal="'info-modal'" />
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
              <b-icon-exclamation-circle-fill v-b-modal="'info-modal'" />
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
    <b-modal id="info-modal" size="xl" title="General Modal">
      Table Modal
    </b-modal>
  </div>
</template>

<script>
export default {
  methods: {
    showInfo() {
    },
// things remaining:
// make indictor active on click
// update modal content
// update table on indicator dropdown select
  }
}
</script>
