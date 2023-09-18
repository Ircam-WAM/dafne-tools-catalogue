<template>
    <div :class="$style.homeContainer">
        <ul :class="$style.toolsList">
            <li v-for="tool in tools" :class="$style.toolCard">
                <router-link :to="'/tool/' + tool.name" :class="$style.toolCardLink">
                    <img :class="$style.toolCardImage" :src="tool.image_thumbnail" />
                    <h3 :class="$style.toolCardTitle">{{ tool.name }}</h3>
                    <p :class="$style.toolCardDescription">{{ truncateString(tool.description, 320) }}</p>
                    <button :class="$style.toolCardButton">➜ See more</button>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style src="./index.css" module></style>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useToolsApi from '../../api/useToolsApi'
import { truncateString } from '../../libs/utils/string'

const props = defineProps({
  name: String
})

const route = useRoute()

const tools = ref([])

onMounted(async () => {
    if (route.path === '/') {
        const { api } = await useToolsApi()
        tools.value = api.value
        console.log('TOOLS: ', tools.value)
    }
})
</script>