<template>
  <div class="container">
    <div class="blok-left">
      <div class="flex flex-col pb-3">
        <label for="search">Arama Yap</label>
        <GmapAutocomplete
        id="search"
          placeholder="Buraya şehir adını yazınız.."
          @place_changed="setPlace">
        </GmapAutocomplete>
      </div>
      <div v-for="(m, index) in markers" :key="index">
        <span 
          v-if="city == null"
          @click="toggleInfoWindow(m,index)" 
          v-html="m.infoText"
          >
        </span>
        <span 
          v-if="m.city === city"
          @click="toggleInfoWindow(m,index)" 
          >
          {{ m.city }}
        </span>
      </div>
      
    </div>
    <div class="blok-right">
      <GmapMap class="map-container" ref="mapRef" :center="center" :zoom="zoom" >
        <GmapInfoWindow :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        </GmapInfoWindow>
        <GmapMarker ref="myMarker" :clickable="true" @click="toggleInfoWindow(m,index)" v-for="(m, index) in markers" :key="index" :position="m.position" :center="m.position"  />
        <GmapMarker v-if="this.place" label="&#x2605;" :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }"></GmapMarker>
      </GmapMap>
    </div>
  </div>
</template>

<script>
import { gmapApi } from 'gmap-vue';
  export default {
    data() {
      return {
        center: { 
          lat: 38.963745, 
          lng: 35.243322 
        },
        zoom: 6,
        city: null,
        place: null,
        infoWindowPos: null,
        infoWinOpen: false,
        currentMidx: null,

        infoOptions: {
        content: '',
          //optional: offset infowindow so it visually sits nicely on top of our marker
          pixelOffset: {
            width: 0,
            height: -45
          }
        },
        markers: [{
            position: {
              lat: 37.05580558122161,
              lng: 37.418308088518444
            },
            infoText: '<h2>Dr. NUR ÖZEL</h2><h3>İZMİR EĞİTİM DİŞ HASTANESİ</h3><p>AKINCI MAH. FEVZİ PAŞA BULV. 35240 İZMİR, TR</p>',
            city: 'Gaziantep',
            doctor: 'Dr. NUR ÖZEL',
            job: 'İZMİR EĞİTİM DİŞ HASTANESİ',
            address: 'AKINCI MAH. FEVZİ PAŞA BULV. 35240 İZMİR, TR'
          }, {
            position: {
              lat: 37.0122069454525,
              lng: 37.80176493206037
            },
            infoText: '<h2>Dr. NUR ÖZEL</h2><h3>İZMİR EĞİTİM DİŞ HASTANESİ</h3><p>AKINCI MAH. FEVZİ PAŞA BULV. 35240 İZMİR, TR</p>',
            city: 'Gaziantep',
            doctor: 'Dr. NUR ÖZEL',
            job: 'İZMİR EĞİTİM DİŞ HASTANESİ',
            address: 'AKINCI MAH. FEVZİ PAŞA BULV. 35240 İZMİR, TR'
          }, {
            position: {
              lat: 38.72528080678386,
              lng: 35.49369306912675
            },
            infoText: '<h2>Dr. NUR ÖZEL</h2><h3>İZMİR EĞİTİM DİŞ HASTANESİ</h3><p>AKINCI MAH. FEVZİ PAŞA BULV. 35240 İZMİR, TR</p>',
            city: 'Kayseri',
            doctor: 'Dr. NUR ÖZEL',
            job: 'İZMİR EĞİTİM DİŞ HASTANESİ',
            address: 'AKINCI MAH. FEVZİ PAŞA BULV. 35240 İZMİR, TR'
          }, {
            position: {
              lat: 39.93402517027752,
              lng: 32.86332800002142
            },
            infoText: '<h2>Dr. NUR ÖZEL</h2><h3>İZMİR EĞİTİM DİŞ HASTANESİ</h3><p>AKINCI MAH. FEVZİ PAŞA BULV. 35240 İZMİR, TR</p>',
            city: 'Ankara',
            doctor: 'Dr. NUR ÖZEL',
            job: 'İZMİR EĞİTİM DİŞ HASTANESİ',
            address: 'AKINCI MAH. FEVZİ PAŞA BULV. 35240 İZMİR, TR'
          }, {
            position: {
              lat: 38.42978825605431,
              lng: 27.141434332353658
            },
            infoText: `<h2>Dr. NUR ÖZEL</h2><h3>İZMİR EĞİTİM DİŞ HASTANESİ</h3><p>AKINCI MAH. FEVZİ PAŞA BULV. 35240 İZMİR, TR</p>`,
            city: 'İzmir',
            doctor: 'Dr. NUR ÖZEL',
            job: 'İZMİR EĞİTİM DİŞ HASTANESİ',
            address: 'AKINCI MAH. FEVZİ PAŞA BULV. 35240 İZMİR, TR'
          }]
      }
    },
    mounted () {
      // At this point, the child GmapMap has been mounted, but
      // its map has not been initialized.
      // Therefore we need to write mapRef.$mapPromise.then(() => ...)

      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo({lat: 38.963745, lng: 35.243322})
      })

    },
    computed: {
      // The below example is the same as writing
      // google() {
      //   return gmapApi();
      // },
      google: gmapApi,
    },
    methods: {
      toggleInfoWindow: function(marker, idx) {
        this.infoWindowPos = marker.position;
        this.infoOptions.content = marker.infoText;

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
        console.log(place.address_components[0].long_name)
        this.center = { 
          lat: place.geometry.location.lat, 
          lng: place.geometry.location.lng
        }
        this.zoom = 13
        this.city = place.address_components[0].long_name
      },
    }
  }
</script>

<style>
.container{
  @apply grid grid-cols-5 m-auto;
}
.blok-left{
  @apply col-span-1 px-4;
}
.blok-right{
  @apply col-span-4;
}
.map-container{
  height: calc(100vh - 84px);
  @apply w-full;
}
.gm-style-iw{
  @apply h-36 w-32 bg-gray-100 text-left p-3;
}
label{
  @apply pb-1 font-bold text-lg uppercase;
}
.blok-left input{
  @apply px-4 py-2 border ;
}
.blok-left span {
  @apply block cursor-pointer hover:bg-gray-400 hover:text-gray-800 p-2;
}
</style>