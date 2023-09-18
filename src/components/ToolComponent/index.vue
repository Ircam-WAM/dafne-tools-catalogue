<template>
    <!-- <div class="tool__nav">
        <template v-for="tool in tools">
        <router-link :to="'/tool/' + tool.name">{{ tool.name }}</router-link> |
        </template>
    </div> -->
    <router-link to="/"><button :class="$style.backButton">↵ back</button></router-link>
    <div :class="$style.toolContainer">
        <template v-if="selectedTool">
            <img :class="$style.toolImage" :src="selectedTool.image_thumbnail" />
            <div :class="$style.toolHeader">
                <div :class="$style.toolMetadata">
                    <h1 :class="$style.toolName">{{ selectedTool.name }}</h1>
                    <p :class="$style.toolDescription">{{ selectedTool.description }}</p>
                </div>
                <div :class="$style.toolMetadata">
                    <p :class="$style.toolAuthor"><b>Author: </b>{{ selectedTool.author }}</p>
                    <p :class="$style.toolVersion"><b>Version: </b>{{ selectedTool.version }}</p>
                    <a v-if="selectedTool.download_url" :class="$style.toolLink" :href="selectedTool.download_url" target="_blank">
                        <button :class="$style.toolButton" >➜ Download</button>
                    </a>
                </div>
            </div>
            <div :class="$style.toolContent">
                <iframe
                    v-if="selectedTool.app_url"
                    :class="$style.toolIframe"
                    :src="selectedTool.app_url"
                    title="Tool Iframe"
                    width="1400"
                    height="1000"
                    scrolling="yes"
                >
                </iframe>
                <div v-if="selectedTool.git_repository_url" :class="$style.toolGitContent">
                    <div v-if="gitRepositoryReadme" v-html="gitRepositoryReadme" :class="$style.toolGitReadme" />
                </div>
            </div>
        </template>
        <template v-else>
            <p :class="$style.toolText">Tool not found</p>
        </template>
    </div>
</template>

<style src="./index.css" module></style>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useToolsApi from '../../api/useToolsApi'
import { Repository } from '../../libs/git-interface/git-interface'

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

const repository = ref()
const gitRepositoryReadme = ref()

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

    // parse tools
    const { api } = await useToolsApi()
    tools.value = api.value
    console.log('TOOLS: ', tools.value)
    // get selected tool
    selectedTool.value = getToolByName(props.name)
    console.log('SELECTED TOOL: ', selectedTool.value)

    if (selectedTool.value && selectedTool.value.git_repository_url && selectedTool.value.git_vendor) {
        // fetch git repository
        // await fetchGithubRepositoryApi("https://api.github.com/repos/acids-ircam/RAVE")
        // await fetchGithubRepositoryReadme("https://raw.githubusercontent.com/acids-ircam/RAVE/master/README.md")
        // gitRepositoryReadme.value = await fetchGithubRepositoryReadme(selectedTool.value.git_repository_url)

        repository.value = new Repository(selectedTool.value.git_repository_url, selectedTool.git_vendor)
        if (repository.value) {
            await repository.value.init()
            console.log('REPOSITORY: ', repository.value)

            const repositoryApi = await repository.value.getRepositoryApi()
            console.log('REPOSITORY API: ', repositoryApi)

            const repositoryInstance = await repository.value.getRepositoryInstance()
            console.log('REPOSITORY INSTANCE: ', repositoryInstance)

            const user = await repository.value.getUser()
            console.log('USER: ', user)

            const username = await repository.value.getUsername()
            console.log('USERNAME: ', username)

            gitRepositoryReadme.value = await repository.value.getReadme()
            // console.log('README: ', gitRepositoryReadme.value)

            const releases = await repository.value.getReleases()
            console.log('RELEASES: ', releases)

            const tags = await repository.value.getTags()
            console.log('TAGS: ', tags)
        }
    }
})
</script>