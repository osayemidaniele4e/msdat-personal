<template>
  <footer id="the-footer">
    <div>Built with <b-icon-heart-fill/> by eHealth4everyone</div>
    <div>
      <span>46 Indicators, 16 Data sources</span>
      <span>Last Updated 12 Mar, 2019</span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
$msdat-green: #007D53;

footer#the-footer {
  height: fit-content;
  position: sticky;
  bottom: 0;
  background-color: $msdat-green;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1% 2%;
  font-size: 12.5px;
  color: #ffffff;

  &>div {
    line-height: 15px;

    svg {
      color: red;
    }
    &:last-child {
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      span {
        text-align: right;

        &:first-child {
          margin-bottom: 1.5%;
        }
      }
    }
  }
}

// Media Query
@media (max-width: 567px) {
  footer#the-footer {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: start;
    padding: 0.8% 2%;

    &>div {
      &:last-child {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 1.5%;

        span{
          width: fit-content;
        }
      }
    }
  }
}
</style>
