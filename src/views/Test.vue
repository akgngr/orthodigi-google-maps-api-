<template>
  <div>
    <h1>Test</h1>
    {{ data }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "test",
  data() {
    return {
      data: [],
      url: "https://api.spreadsheet.com/v1/worksheets/Oi7Xw8KcQIyp55A932f25Q/rows",
    };
  },
  methods: {
    async fetchData() {
      await axios
        .get(this.url, {
          headers: {
            Authorization: "Bearer " + "M0CFs4B.Y_eGkuvYTr-fuP29zJ_IKA",
          },
        })
        .then((res) => {
          this.data = res.data.records;
          //console.log(res.data.records);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
