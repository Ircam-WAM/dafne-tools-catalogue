<template>
    <div class="tool__nav">
        <template v-for="tool in tools">
        <router-link :to="'/tool/' + tool.name">{{ tool.name }}</router-link> |
        </template>
    </div>
    <div class="tool__container">
        <template v-if="selectedTool">
            <div :class="$style.foo">{{ selectedTool.name }}</div>
            <iframe
                v-if="selectedTool.app_url"
                class="tool-iframe"
                title="Tool Iframe"
                width="1000"
                height="1000"
                src="https://sebpiq.github.io/WebPd_website/"
            >
            </iframe>
        </template>
        <template v-else>
            <p class="tool__text">Tool not found</p>
        </template>
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
const selectedTool = ref()

function getToolByName (toolName) {
    if (tools.value) {
        for (let i = 0; i < tools.value.length; i++) {
            if (tools.value[i].name === toolName) {
                return tools.value[i]
            }
        }
    }
}

watch(() => route.params.name, async newName => {
    // update tool data from api on navigation change
        // console.log('ROUTE NAME: ', newName)
        selectedTool.value = getToolByName(newName)
        console.log('SELECTED TOOL: ', selectedTool.value)
    }, { immediate: true }
)

onMounted(async () => {
    // console.log(route)
    console.log('TOOL COMPONENT MOUNTED')

    const { api } = await useToolsApi()
    tools.value = api.value
    console.log('TOOLS: ', tools.value)

    selectedTool.value = getToolByName(props.name)
    console.log('SELECTED TOOL: ', selectedTool.value)
})
</script>