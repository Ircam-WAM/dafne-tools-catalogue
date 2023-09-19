<template>
    <!-- <div class="tool__nav">
        <template v-for="tool in tools">
        <router-link :to="'/tool/' + tool.name">{{ tool.name }}</router-link> |
        </template>
    </div> -->
    <router-link to="/"><button :class="$style.backButton">↵ Back</button></router-link>
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
            <div :class="$style.toolGitRepositoryContent">
                <section :class="$style.toolGitRepositoryLink">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92"><defs><clipPath id="a"><path fill="currentColor" d="M0 .113h91.887V92H0Zm0 0"/></clipPath></defs><g clip-path="url(#a)"><path style="fill-opacity:1" d="M90.156 41.965 50.036 1.848a5.913 5.913 0 0 0-8.368 0l-8.332 8.332 10.566 10.566a7.03 7.03 0 0 1 7.23 1.684 7.043 7.043 0 0 1 1.673 7.277l10.183 10.184a7.026 7.026 0 0 1 7.278 1.672 7.04 7.04 0 0 1 0 9.957 7.045 7.045 0 0 1-9.961 0 7.038 7.038 0 0 1-1.532-7.66l-9.5-9.497V59.36a7.04 7.04 0 0 1 1.86 11.29 7.04 7.04 0 0 1-9.957 0 7.04 7.04 0 0 1 0-9.958 7.034 7.034 0 0 1 2.308-1.539V33.926a7.001 7.001 0 0 1-2.308-1.535 7.049 7.049 0 0 1-1.516-7.7L29.242 14.273 1.734 41.777a5.918 5.918 0 0 0 0 8.371L41.855 90.27a5.92 5.92 0 0 0 8.368 0l39.933-39.934a5.925 5.925 0 0 0 0-8.371"/></g></svg>
                    <b>Repository: </b>
                    <a v-if="selectedTool.git_repository_url" :href='selectedTool.git_repository_url'>
                        {{ selectedTool.git_repository_url }}
                    </a>
                    <p v-else>N/A</p>
                </section>
                <section :class="$style.toolGitRepositoryUser">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="link" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path></svg>
                    <b>Owner: </b>
                    <a v-if="gitRepositoryUser" :href='gitRepositoryUser.html_url'>
                        {{ gitRepositoryUser.login }}
                    </a>
                    <p v-else>N/A</p>
                </section>
                <section :class="$style.toolGitRepositoryReleases">
                    <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 35.135 35.135" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M32.021,7.575L18.443,0.223c-0.548-0.297-1.204-0.297-1.752,0L3.114,7.576C2.522,7.897,2.152,8.519,2.152,9.192v16.75 c0,0.675,0.37,1.295,0.962,1.617l13.574,7.354c0.273,0.148,0.574,0.222,0.876,0.222c0.302,0,0.604-0.072,0.875-0.222l13.579-7.354 c0.594-0.321,0.964-0.942,0.964-1.617V9.192C32.982,8.519,32.612,7.897,32.021,7.575z M17.564,14.455l-2.575-1.395l9.142-5.577 l3.153,1.709L17.564,14.455z M17.567,3.928l2.823,1.529l-9.14,5.577l-3.4-1.843L17.567,3.928z M5.83,12.278l3.772,2.044v2.835 c0,1.016,0.823,1.838,1.838,1.838s1.839-0.823,1.839-1.838v-0.844l2.45,1.328v12.567L5.83,24.848V12.278L5.83,12.278z"></path> </g> </g></svg>
                    <b>Releases: </b>
                    <ul v-if="gitRepositoryReleases && gitRepositoryReleases.length > 0">
                        <li v-for="release in gitRepositoryReleases">
                            <a :href='release.zipball_url'>{{ release.name }}</a>
                        </li>
                    </ul>
                    <p v-else>No releases yet.</p>
                </section>
                <section :class="$style.toolGitRepositoryTags">
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-tag">
                        <path d="M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.752 1.752 0 0 1 1 7.775Zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 0 0 .354 0l5.025-5.025a.25.25 0 0 0 0-.354l-6.25-6.25a.25.25 0 0 0-.177-.073H2.75a.25.25 0 0 0-.25.25ZM6 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"></path>
                    </svg>
                    <b>Tags: </b>
                    <ul v-if="gitRepositoryTags && gitRepositoryTags.length > 0">
                        <li v-for="tag in gitRepositoryTags">
                            <a :href='tag.zipball_url'>- {{ tag.name }}</a>
                        </li>
                    </ul>
                    <p v-else>No tags yet.</p>
                </section>
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
                <div v-if="selectedTool.git_repository_url" :class="$style.toolGitReadmeContainer">
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

const gitRepositoryUser = ref()
const gitRepositoryReadme = ref()
const gitRepositoryReleases = ref()
const gitRepositoryTags = ref()

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

        repository.value = new Repository(selectedTool.value.git_repository_url, selectedTool.value.git_vendor)
        if (repository.value) {
            await repository.value.init()
            console.log('REPOSITORY: ', repository.value)

            const repositoryApi = await repository.value.getRepositoryApi()
            console.log('REPOSITORY API: ', repositoryApi)

            const repositoryInstance = await repository.value.getRepositoryInstance()
            console.log('REPOSITORY INSTANCE: ', repositoryInstance)

            gitRepositoryUser.value = await repository.value.getUser()
            console.log('USER: ', gitRepositoryUser.value)

            const username = await repository.value.getUsername()
            console.log('USERNAME: ', username)

            gitRepositoryReadme.value = await repository.value.getReadme()
            // console.log('README: ', gitRepositoryReadme.value)

            gitRepositoryReleases.value = await repository.value.getReleases()
            console.log('RELEASES: ', gitRepositoryReleases.value)

            gitRepositoryTags.value = await repository.value.getTags()
            console.log('TAGS: ', gitRepositoryTags.value)
        }
    }
})
</script>