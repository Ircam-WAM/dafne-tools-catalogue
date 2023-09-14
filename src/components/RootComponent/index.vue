<template>
  <router-link to="/"><h1 :class="$style.appTitle">DAFNE+ Tools Catalogue</h1></router-link>
  <!-- <div id="nav">
    <template v-for="tool in tools">
      <router-link :to="'/tool/' + tool.name">{{ tool.name }}</router-link> |
    </template>
  </div> -->
  <router-view />
  <!-- <div style="overflow-wrap: break-word;">token: {{ token }}</div>
  <div>user: {{ user }}</div> -->
</template>

<style src="./index.css" module></style>
<script src="./index.js"></script>

