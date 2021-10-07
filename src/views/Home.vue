<template>
  <div class="home">
    <Maps :markers="markers" />
  </div>
</template>

<script>
import Maps from "@/components/Maps.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Maps,
  },
  data(){
    return{
      markers: [],
    }
  },
  methods:{
    async fetchData() {
      await axios
        .get(
          "https://api.airtable.com/v0/" +
            process.env.VUE_APP_AIRTABLE_API_BASE_ID +
            "/doctors?sort=&view=Grid%20view",
          {
            headers: {
              Authorization: "Bearer " + process.env.VUE_APP_AIRTABLE_API_KEY,
            },
          }
        )
        .then((res) => {
          this.markers = res.data.records;
          //console.log(res.data.records);
        });
    },
  },

  mounted() {
    this.fetchData();
    //console.log(this.markers);
  },
};
</script>
