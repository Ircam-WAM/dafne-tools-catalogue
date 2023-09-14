<template>
    <div class="home__container">
        <ul class="home__tools-list">
            <li v-for="tool in tools" class="home__tool-card">
                <router-link :to="'/tool/' + tool.name">
                    <h3 class="home__tool-card-title">{{ tool.name }}</h3>
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