<template>
  <div :class="$style.header">
    <router-link to="/" :class="$style.headerLink">
      <img :class="$style.headerIcon" src="../../static/img/DAFNE_Logo_White_resized.png" alt="icon" />
      <h1 :class="$style.headerTitle">DAFNE+ Tools Catalogue</h1>
    </router-link>
  </div>
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

