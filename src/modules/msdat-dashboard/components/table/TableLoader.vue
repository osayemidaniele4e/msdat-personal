<template>
  <div class="card border-0 m-0">
    <div class="shimmerBG media">
      <div class="p-32 content">
        <div class="shimmerbg title-line mb-0"></div>
        <div class="shimmerbg title-line"></div>
        <div class="shimmerbg content-line end my-3"></div>
        <div class="shimmerbg title-line"></div>
        <div class="shimmerbg title-line"></div>
      </div>
    </div>
  </div>
</template>

<script lang="js">

export default {
  name: 'TableLoader',
};
</script>

<style scoped lang="scss">
.card {
  position: relative;
  -webkit-box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);

  .shimmerBG {
    height: 38vh;
    position: relative;
    animation: shimmer 1s ease-out alternate infinite both;
  }
  // MEDIA QUERY FOR MOBILE DEVICE
  @media only screen and (max-width: 600px) {
    .shimmerBG {
      height: 38vh;
    }
  }
  // MEDIA QUERY FOR TABLET DEVICES
  @media only screen and (min-width: 601px) and (max-width: 768px) {
    .shimmerBG {
      height: 47vh;
    }
  }
  @keyframes shimmer {
    0% {
      background-color: #f0f0f0;
    }
    25% {
      background-color: #f9f9f9;
    }
    50% {
      background-color: #fdfdfd;
    }
    75% {
      background-color: #f9f9f9;
    }
    100% {
      background-color: #f6f6f6;
    }
  }

  @-webkit-keyframes shimmer {
    0% {
      background-color: #f4f4f4;
    }
    25% {
      background-color: #f9f9f9;
    }
    50% {
      background-color: #fdfdfd;
    }
    75% {
      background-color: #f9f9f9;
    }
    100% {
      background-color: #f6f6f6;
    }
  }

  // =======================SMALLER
  .shimmerbg {
    animation-duration: 2.2s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: shimmer2;
    animation-timing-function: linear;
    background: #ddd;
    background: linear-gradient(to right, #f6f6f6 8%, #f0f0f0 18%, #f6f6f6 33%);
    background-size: 1200px 100%;
  }

  @-webkit-keyframes shimmer2 {
    0% {
      background-position: -100% 0;
    }

    100% {
      background-position: 100% 0;
    }
  }

  @keyframes shimmer2 {
    0% {
      background-position: -1200px 0;
    }

    100% {
      background-position: 1200px 0;
    }
  }
  .p-32 {
    padding: 30px;
  }
  .content {
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: #ffffffd0;
  }

  // MEDIA QUERY FOR MOBILE DEVICE
  @media only screen and (max-width: 600px) {
    .content {
      bottom: 1vh;
    }
    .p-32 {
      padding: 10px;
      border-radius: 2px;
    }
  }
  // MEDIA QUERY FOR TABLET DEVICES
  @media only screen and (min-width: 601px) and (max-width: 768px) {
    .content {
      bottom: 4vh;
      left: 4rem;
    }
    .p-32 {
      padding: 15px;
      border-radius: 4px;
    }
  }
  .title-line {
    height: 3rem;
    width: 100%;
    margin-bottom: 12px;
  }

  .content-line {
    height: 1rem;
    width: 100%;
    margin-bottom: 16px;
    border-radius: 8px;
  }

  .end {
    width: 40%;
  }
}

.m-t-24 {
  margin-top: 24px;
}
</style>
