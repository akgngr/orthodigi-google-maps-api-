<template>
  <div class="container">
    <div class="blok-left">
      <div class="flex flex-col pb-3">
        <label for="search">Şehir Ara</label>
        <div class="searchContainer">
          <GmapAutocomplete
            id="search"
            placeholder="Buraya şehir adını yazınız.."
            @place_changed="setPlace"
          >
          </GmapAutocomplete>
          <button
            class="px-2 py-1 border hover:bg-blue-400 hover:text-white"
            @click="cityNull"
          >
            Sıfırla
          </button>
        </div>
      </div>
      <div class="blok-left-content">
        <div v-for="(m, index) in markers" :key="index">
          <span
            v-if="city == null"
            @click="toggleInfoWindow(m, index)"
            v-html="
              `<h2>${m.fields.fullName}</h2><h3>${m.fields.job}</h3><p>${m.fields.address}</p><p><a target=&quot;_blank&quot; href=&quot;${m.fields.mapLink}&quot;>Haritada aç</a></p>`
            "
          >
          </span>
          <span
            v-if="m.fields.city === city"
            @click="toggleInfoWindow(m, index)"
            v-html="
              `<h2>${m.fields.fullName}</h2><h3>${m.fields.job}</h3><p>${m.fields.address}</p><p><a target=&quot;_blank&quot; href=&quot;${m.fields.mapLink}&quot;>Haritada aç</a></p>`
            "
          >
          </span>
        </div>
      </div>
    </div>
    <div class="blok-right">
      <GmapMap class="map-container" ref="mapRef" :center="center" :zoom="zoom">
        <GmapInfoWindow
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen = false"
        >
        </GmapInfoWindow>
        <GmapMarker
          ref="myMarker"
          :clickable="true"
          @click="toggleInfoWindow(m, index)"
          v-for="(m, index) in markers"
          :key="index"
          :position="{ lat: m.fields.positionLat, lng: m.fields.positionLng }"
          :center="{ lat: m.fields.positionLat, lng: m.fields.positionLng }"
        />
        <GmapMarker
          v-if="this.place"
          label="&#x2605;"
          :position="{
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng(),
          }"
        ></GmapMarker>
      </GmapMap>
    </div>
  </div>
</template>

<script>
import { gmapApi } from "gmap-vue";
import axios from "axios";

export default {
  data() {
    return {
      center: {
        lat: 38.963745,
        lng: 35.243322,
      },
      zoom: 6,
      city: null,
      place: null,
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,

      infoOptions: {
        content: "",
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -45,
        },
      },
      markers: [],
    };
  },
  mounted() {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)

    this.$refs.mapRef.$mapPromise.then((map) => {
      map.panTo({ lat: 38.963745, lng: 35.243322 });
    });
  },
  created() {
    this.fetchData();
    //console.log(this.markers);
  },
  computed: {
    // The below example is the same as writing
    // google() {
    //   return gmapApi();
    // },
    google: gmapApi,
  },
  methods: {
    fetchData() {
      axios
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
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = {
        lat: marker.fields.positionLat,
        lng: marker.fields.positionLng,
      };
      this.infoOptions.content = `<h2>${marker.fields.fullName}</h2><h3>${marker.fields.job}</h3><p>${marker.fields.address}</p><p><a target="_blank" href="${marker.fields.mapLink}">Haritada aç</a></p>`;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }

      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    setPlace(place) {
      console.log(place.address_components[0].long_name);
      this.center = {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      };
      this.zoom = 12;
      if (place) {
        this.city = place.address_components[0].long_name;
      } else {
        this.city = null;
      }
    },
    cityNull() {
      (this.city = null),
        (this.center = {
          lat: 38.963745,
          lng: 35.243322,
        });
      this.zoom = 6;
      this.place = null;
    },
  },
};
</script>

<style>
.container {
  @apply grid md:grid-cols-6 m-auto;
}
.blok-left {
  @apply col-span-2 px-4 md:order-first order-last mt-6 md:pt-0 w-screen md:w-full m-auto;
}
.blok-left-content {
  height: calc(100vh - 180px);
  @apply overflow-y-scroll overscroll-contain w-screen md:w-full;
}
.blok-right {
  @apply col-span-4;
}
.map-container {
  @apply w-full md:h-full h-80;
}
/*
*  harita balonları 
*/
.gm-style-iw {
  @apply h-36 w-48 bg-gray-100 text-left p-3;
}
.gm-style-iw a {
  @apply text-blue-600 pt-3;
}
label {
  @apply pb-1 font-bold text-lg uppercase;
}
.blok-left .searchContainer input {
  @apply px-4 py-2 border w-full;
}
.blok-left span {
  @apply block cursor-pointer hover:bg-gray-200 hover:text-gray-600 active:bg-gray-200 p-2;
}

.searchContainer {
  @apply flex gap-4;
}
</style>
