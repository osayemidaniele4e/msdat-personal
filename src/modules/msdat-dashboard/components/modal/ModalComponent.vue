<template>
  <b-modal
    id="modal"
    :size="modalSize"
    scrollable
    content-class="content"
    header-class="header"
    body-class="body"
    footer-class="footer"
  >
    <template #modal-title>
      <slot name="modal-title" />
    </template>
    <slot />
    <template #modal-footer>
      <slot name="modal-footer" />
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    modalSize: {
      required: true
    }
  }
}

</script>

<style scoped>
  >>> .content ::-webkit-scrollbar {
    width: 8px;
    border: 8px solid #F2F2F2;
  }
  >>> .content ::-webkit-scrollbar-track {
    width: 8px;
  }
  >>> .content ::-webkit-scrollbar-thumb {
    background: #D2D2D2;
    border-radius: 4px;
  }

  /* Modal header */
  >>> .header {
    padding-top: 1.5% !important;
    padding-bottom: 1.5% !important;
    border-bottom: none;
    background-color: #ECECEC;
    color: #0A0505;
  }
  /* indicator */
  >>> .header>.modal-title>span:first-child > span:first-child {
    margin-right: 5px;
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
  }
  /* indicator name */
  >>> .header>.modal-title>span:first-child > span:last-child {
    font-size: 15px;
    text-transform: capitalize;
  }

  /* Modal body  */
  >>> .body {
    font-size: 14px;
  }
  /* link */
  >>> .body a.modal-lnk {
    color: #007D53;
    text-decoration: underline !important;
  }

  /* nav tabs */
  >>> .body ul.nav-tabs {
    font-size: 12px;
    font-weight: 550;
    padding: 0 0 18px 0 !important;
    text-decoration: none;
  }
  >>> .body ul.nav-tabs>li>a {
    margin-right: 10px;
    border-radius: 0.25rem !important;
    padding: 5px 15px;
    background-color: #DFF3F3 !important;
    color: #232323;
  }
  >>> .body ul.nav-tabs>li>a.active {
    background-color: #007D53 !important;
    color: #ffffff;
  }

  /* body paragraphs */
  >>> .body div.tab-content .tab-pane p {
    color: #232323;
  }
  >>> .body div.tab-content .tab-pane p>span:first-child {
    font-weight: bold;
    text-transform: capitalize;
  }
  /* measurement */
  >>> .body div.tab-content .tab-pane p:nth-child(4)>span b {
    font-size: 12.5px;
    font-weight: 600;
  }
  /* level of data available */
  /* data unavailable */
  >>> .body div.tab-content .tab-pane p:nth-child(9)>span:last-child div>span {
    color: #A9A9A9;
  }
  >>> .body div.tab-content .tab-pane p:nth-child(9)>span:last-child div>svg {
    color: #B8B5B5;
  }
  /* data available */
  >>> .body div.tab-content .tab-pane p:nth-child(9)>span:last-child div.available>span {
    color: #484848;
  }
  >>> .body div.tab-content .tab-pane p:nth-child(9)>span:last-child div.available>svg {
    font-size: 15px;
    color: #007D53;
  }

  /* Modal footer */
  >>> .footer {
    display: flex;
    justify-content: flex-start !important;
    padding-top: 1% !important;
    padding-bottom: 1% !important;
  }
  /* button */
  >>> .footer button {
    background-color: #D92959;
    font-weight: bold !important;
  }

  /* Media Query */
  /* xs */
  @media screen and (max-width: 576px) {
    >>>.body ul.nav-tabs>li {
      width: 25%;
      margin-bottom: 5px !important;
    }
    >>> .body div.tab-content .tab-pane p:nth-child(9)>span:last-child div {
      margin-bottom: 5px !important;
    }
  }

  /* sm */
  @media screen and (min-width: 576px) and (max-width: 768px) {
    >>>.body ul.nav-tabs>li {
      width: 20%;
      margin-bottom: 5px !important;
    }
    >>> .body div.tab-content .tab-pane p:nth-child(9)>span:last-child div {
      margin-bottom: 5px !important;
    }
  }

  /* md */
  @media screen and (min-width: 576px) and (max-width: 768px) {
    >>>.body ul.nav-tabs>li {
      width: 25%;
      margin-bottom: 5px !important;
    }
    >>> .body div.tab-content .tab-pane p:nth-child(9)>span:last-child div {
      margin-bottom: 5px !important;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    >>>.body ul.nav-tabs>li {
      width: 25%;
      margin-bottom: 5px !important;
    }
  }
</style>
