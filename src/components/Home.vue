<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Buffer } from 'buffer'; 
import {mapbox} from "../links"
const token = import.meta.env.VITE_TOKEN

let favList = ref([{
    name: "Origin",
    x: 0,
    y: 0,
    zoom: 0
}])

onMounted(() => {
  handleClick();
})

let name: string;
let posx = ref(0)
let posy = ref(0)
let zoom = ref(0)
let form = ref("satellite-v9")
let dis = ref()
const tokenlink = `access_token=${token}`;
let src = ref();

const formList = ["satellite-v9","satellite-streets-v11","outdoors-v11","streets-v11","dark-v10","light-v10"]

const handleClick = async() => {

  mapbox.get(`/${form.value}/static/${posx.value},${posy.value},${zoom.value},0/1280x1280?${tokenlink}`, { responseType: "arraybuffer" })
  .then(resp => {
  src.value = "data:image/jpeg;base64," + Buffer.from(resp.data).toString("base64")
  dis.value = true
});
}

const handleFav = (favName: string ,x: number,y: number,zoom: number) => {

  const add = {
    name: favName,
    x: x,
    y: y,
    zoom: zoom
  }

    favList.value.push(add);
  
  console.log(favList.value)

}

</script>

<template>

<div class="flex flex-col items-center justify-center">
  <div class="flex flex-row">

    <div class="flex flex-row items-center justify-center m-5">

      <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2" @change="handleClick"
      v-model="form" >
        <option v-for="i in formList" :value=i >{{i}}</option>
      </select>
    
    </div>

  
<div class="flex flex-col">

<div class="flex flex-row items-center justify-center">
    <label>Lattitude </label>
    <input type="number" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2" v-model="posy" @change="handleClick" />
  </div>
  

  <div  class="flex flex-row items-center justify-center">
     <label>Longitude </label>
    <input type="number" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2" v-model="posx" @change="handleClick" />
  
  </div>
  <div class="flex flex-col items-center justify-center m-2">
   <label class="form-label">Zoom</label>
  <input
    v-model="zoom"
    type="range"
     min="0" 
     max="22"
     oninput="this.nextElementSibling.value = this.value"
     @change="handleClick"
    class="
      form-range
      m-2
      appearance-none
      w-full
      h-1
      p-0
      bg-gray-200
      rounded-xl
      focus:outline-none focus:ring-0 focus:shadow-none
    "
    id="customRange1"
  />
  <output>{{zoom}}</output>
  </div>
  </div>
</div>

<!-- <button class="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" v-on:click="handleClick" >Get Pic</button> -->
<div v-if="dis">
  <div>
    <input type="text" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Name" v-model="name"  />
    <button class="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
    v-on:click="handleFav(name,posx,posy,zoom)">
      Add to Fav
    </button>
  </div>
 <img v-bind:src="src"/>
</div>

</div>


<div class="flex flex-row m-2 p-2 items-center justify-center">
  <div class="flex items-center justify-center ">
    <div v-for="i in favList">
    <button class=" m-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded"
    v-on:click="() => {
      posx = i.x;
      posy = i.y;
      zoom = i.zoom;
      handleClick();
    }"
    >{{i.name}}</button>
    </div>
  </div>
  </div>


</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
