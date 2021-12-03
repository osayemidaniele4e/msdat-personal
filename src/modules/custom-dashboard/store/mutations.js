const forRefreshingAll = (fieldArray) => {
  fieldArray.years.map((year) => {
    if (year.selected == true) {
      year.selected = false;
    }
    return year;
  });
  fieldArray.levels.map((level) => {
    if (level.selected == true) {
      level.selected = false;
    }
    return level;
  });
  return fieldArray;
};
export default {
  updateStep(state, payload) {
    state.step = payload;
  },

  // loading(state,payload){
  //   console.log('abc',payload);
  // },

  dashboardDetails(state, payload) {
    // log
    state.dashboardDetails = payload;
  },

  setPArea(state, payload) {
    // console.log('loading',payload);
    // state.loading = false;
    // console.log('INd', payload);`
    state.masterData = payload;
  },

  isNotExistYear(state, payload) {
    state.isNotExistYear.push(payload);
  },

  // TODO: To be reviewe later

  selectionIndicator(state, payload) {
    let found = false;
    state.masterData = state.masterData.map((element) => {
      let counter = 0;
      // forRefreshingAll(payload);
      if (found == false) {
        element.children.map((child) => {
          if (child.id == payload.id) {
          // element.parent.selected = true;
            found = true;
            element.parent.isChildSelected = true;
            child.selected = payload.checked;
            if (payload.checked) {
            // element.parent.selected = true;
              counter = 1;
            } else {
              element.parent.selected = false;
              if (child.selected) {
                counter++;
              }
            }
            state.notes = [];
            forRefreshingAll(child);
            return child;
          }
        });
      }
      if (counter == 0) {
        element.parent.isChildSelected = false;
        element.showList = false;
      }
      if (element.parent.isChildSelected == true) {
        element.showList = true;
      }

      return element;
    });
  },

  AllselectionIndicator(state, payload) {
    // console.log(payload);
    state.masterData = state.masterData.map((element) => {
      element.children.map((child) => {
        if (element.parent.value == payload.name) {
          element.parent.selected = payload.checked;
          element.parent.isChildSelected = payload.checked;
          child.selected = payload.checked;
        }
        element.showList = payload.showList;
      });
      return element;
    });
  },

  // ******** Data Source Selection ***************** //

  setDArea(state, payload) {
    state.SurveyArray = payload;
  },

  selectionDataSource(state, payload) {
    console.log('In Mutations', payload);
    state.SurveyArray = state.SurveyArray.map((element) => {
      let counter = 0;
      element.children.map((child) => {
        if (child.id == payload.id) {
          child.selected = payload.checked;
        } if (payload.checked) {
          // element.parent.selected = true;
          counter = 1;
        } else if (child.selected) {
          counter++;
        }
        return child;
      });
      return element;
    });
  },
  // selectionDataSource(state, payload) {
  //   state.SurveyArray = state.SurveyArray.map((element) => {
  //     element.children.map((val) => {
  //       let isParentExist = false;
  //       if (payload.checked == true) {
  //         val.sources.map((source) => {
  //           if (source.parent == payload.parentDataSource) {
  //             source.children.push(payload.childDataSource);
  //             isParentExist = true;
  //           }
  //         });

  //         if (!isParentExist) {
  //           val.sources.push({
  //             parent: payload.parentDataSource, children: [payload.childDataSource],
  //           });
  //         }
  //       } else if (source.parent == payload.parentDataSource) {
  //         source.children.pop(payload.childDataSource);
  //         isParentExist = true;
  //       }
  //       return val;
  //     });
  //     return element;
  //   });
  // },

  // ******** Indicator Levels ***************** //

  getLevels(state, payload) {
    state.masterData = state.masterData.map((child) => {
      child.children.map((x) => {
        if (payload.id == x.id) {
          x.levels = payload.Datalevels;
        }
      });
      return child;
    });
  },

  levelsHandler(state, payload) {
    state.masterData = state.masterData.map((element) => {
      element.children.map((child) => {
        child.levels.map((level) => {
          if (level.value == payload.value) {
            level.selected = payload.checked;
          }
          return level;
        });
        return child;
      });
      return element;
    });
  },

  // *************** INDICATOR YEARS *************** //

  getYears(state, payload) {
    state.masterData = state.masterData.map((child) => {
      child.children.map((x) => {
        if (payload.id == x.id) {
          x.years = payload.years;
          // x.years.map(year => { year.selected = Math.random() > 0.9 })
        }
      });
      return child;
    });
  },

  yearsHandler(state, payload) {
    state.masterData = state.masterData.map((element) => {
      element.children.map((child) => {
        child.years.map((year) => {
          if (year.value == payload.value) {
            year.selected = payload.checked;
          }
          return year;
        });
        return child;
      });
      element.showNotes = payload.showNotes;
      return element;
    });
    let distinctYearsArray = [];
    state.masterData = state.masterData.map((element) => {
      element.children.map((child) => {
        if (child.selected === true) {
          child.years.map((year) => {
            if (year.selected === true) {
              distinctYearsArray.push(year.value);
            }
          });
        }
        return child;
      });
      return element;
    });
    distinctYearsArray = [...new Set(distinctYearsArray)];
    const msgs = [];

    state.masterData.map((element) => {
      element.children.map((child) => {
        if (child.selected == true) {
          let yearsDoesnotContain = '';

          // distinctYearsArray.map((distYear) => {

          // });
          const foundData = child.years.find((year) => year.value == payload.value);
          if (foundData == undefined) {
            if (yearsDoesnotContain.length > 0) {
              yearsDoesnotContain += ', ';
            }
            yearsDoesnotContain += payload.value;
          }
          if (yearsDoesnotContain.length > 0) {
            msgs.push(`${child.short_name} has no ${yearsDoesnotContain}`);
          }
          state.notes = msgs;
        }
      });
      return element;
    });
  },

  selectedYear(state, payload) {
    state.selectedYears = payload;
  },

  // For Arranging the Sections
  arrangedSections(state, payload) {
    console.log('State O', state.ArrangedSections);
    console.log('State P', payload);
    state.ArrangedSections = payload;
  },

  // ******** Select All Data ********* //

  selectAll(state, payload) {
    console.log('asdw', payload);
    state.allSelected = payload;
  },

};
