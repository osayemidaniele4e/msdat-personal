<template>
  <div
    id="app"
    style="
      background: #cee4e9;
      opacity: 1;
      top: 314px;
      left: 1258px;
      width: 95%;
      height: 354px;
      margin-bottom: 15px;
      font-family: Work Sans;
    "
    class="
    ml-auto mr-auto"
  >
    <h4 class="" style="padding: 29px 2px 14px 19px; font-size: 18px">
      Arrange the position of your widgets
    </h4>
    <sortable-list
      v-model="items"
      item-class="sortable-item"
      handle-class="sortable-handle"
    >
      <ul
        class="list-reset"
        style="list-style: none; margin-left: -20px"
        slot-scope="{ items }"
      >
        <sortable-item v-for="todo in items" :key="todo.id">
          <li
            style="
              background: #ffffff;
              top: 480px;
              left: 1318px;
              width: 90%;
              height: 33px;
              padding: 6px 3px 6px 7px;
              margin-bottom: 19px;
              cursor: all-scroll;
              font-size: 13px;
            "
          >
            <sortable-handle>
              <span>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="10.000000pt"
                  height="10.000000pt"
                  viewBox="0 0 512.000000 512.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      d="M95 5080 c-11 -4 -31 -18 -44 -30 -51 -49 -51 -51 -51 -615 0 -583
-1 -570 66 -621 l37 -29 553 0 c545 0 553 0 581 21 15 11 38 36 51 54 l22 34
-2 550 -3 551 -24 34 c-44 62 -36 61 -628 60 -296 0 -547 -4 -558 -9z"
                    />
                    <path
                      d="M1980 5067 c-19 -12 -43 -38 -54 -57 -20 -34 -21 -48 -21 -575 l0
-540 24 -39 c15 -24 40 -45 65 -57 38 -17 76 -19 566 -19 490 0 528 2 566 19
25 12 50 33 65 57 l24 39 0 540 c0 527 -1 541 -21 575 -11 19 -35 45 -54 57
l-33 23 -547 0 -547 0 -33 -23z"
                    />
                    <path
                      d="M3894 5076 c-17 -8 -42 -29 -55 -47 l-24 -34 -3 -551 -2 -550 22 -34
c13 -18 36 -43 51 -54 28 -21 36 -21 581 -21 l553 0 37 29 c67 51 66 38 66
623 0 508 -1 528 -20 567 -11 23 -33 50 -48 61 -26 19 -45 20 -577 22 -446 2
-556 0 -581 -11z"
                    />
                    <path
                      d="M107 3206 c-49 -18 -64 -32 -88 -77 -18 -36 -19 -64 -19 -571 l0
-533 23 -39 c12 -22 38 -49 57 -60 34 -20 48 -21 575 -21 527 0 541 1 575 21
19 11 45 35 57 54 l23 33 0 547 0 547 -23 33 c-12 19 -38 43 -57 54 -34 20
-51 21 -560 23 -422 2 -532 0 -563 -11z"
                    />
                    <path
                      d="M2021 3210 c-46 -11 -100 -67 -111 -116 -5 -21 -10 -262 -10 -534 0
-272 5 -513 10 -534 11 -51 65 -105 116 -116 51 -12 1017 -12 1068 0 51 11
105 65 116 116 5 21 10 262 10 534 0 272 -5 513 -10 534 -11 51 -65 105 -116
116 -48 12 -1026 11 -1073 0z"
                    />
                    <path
                      d="M3917 3206 c-21 -8 -47 -22 -59 -33 -49 -44 -48 -37 -48 -616 l0
-544 23 -33 c12 -19 38 -43 57 -54 34 -20 48 -21 575 -21 527 0 541 1 575 21
19 11 45 38 57 60 l23 39 0 535 0 535 -23 39 c-12 22 -38 49 -57 60 -34 20
-50 21 -560 23 -425 2 -532 0 -563 -11z"
                    />
                    <path
                      d="M95 1324 c-16 -8 -38 -23 -49 -32 -45 -40 -46 -52 -46 -609 0 -508 1
-528 20 -567 11 -23 33 -50 48 -61 26 -19 43 -20 589 -20 549 0 562 0 589 20
15 11 35 36 45 55 18 33 19 68 19 576 l0 541 -22 33 c-13 18 -36 43 -51 54
-28 21 -38 21 -570 24 -478 2 -546 0 -572 -14z"
                    />
                    <path
                      d="M1994 1321 c-25 -12 -50 -33 -65 -57 l-24 -39 0 -540 c0 -527 1 -541
21 -575 11 -19 35 -45 54 -57 l33 -23 547 0 547 0 33 23 c19 12 43 38 54 57
20 34 21 48 21 575 l0 540 -24 39 c-15 24 -40 45 -65 57 -38 17 -76 19 -566
19 -490 0 -528 -2 -566 -19z"
                    />
                    <path
                      d="M3910 1329 c-14 -6 -36 -20 -48 -32 -53 -49 -52 -36 -52 -614 0 -505
1 -540 19 -573 10 -19 30 -44 45 -55 27 -20 40 -20 589 -20 546 0 563 1 589
20 15 11 37 38 48 61 19 39 20 59 20 567 0 585 1 572 -66 623 l-37 29 -541 2
c-346 1 -550 -2 -566 -8z"
                    />
                  </g>
                </svg>
              </span>
            </sortable-handle>
            <span>
              {{ todo.name }}
            </span>
          </li>
        </sortable-item>
      </ul>
    </sortable-list>
  </div>
</template>

<script>
import SortableList from './sortableComponents/SortableList.vue';
import SortableItem from './sortableComponents/SortableItem.vue';
import SortableHandle from './sortableComponents/SortableHandle.vue';

export default {
  components: {
    SortableList,
    SortableItem,
    SortableHandle,
  },
  computed: {
    items() {
      return this.$store.getters.arrangedSections;
    },
  },
};
</script>

<style>
</style>
