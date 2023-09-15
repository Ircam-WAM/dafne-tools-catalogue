import { ref } from "vue"
import toolsApiEndpoints from '@/api/tools-origin.json';
import toolsApiData from '@/api/tools-api.json';

const api = ref([])

const toolsEndpoints = toolsApiEndpoints["tools_origin"]
const toolsApi = toolsApiData["tools_api"]

export default async function useToolsApi () {
  api.value = []

  const tool = ref()

  for (let i = 0; i < toolsEndpoints.length; i++) {

    // fetch tool api endpoint
    // const tool = await fetch(toolsEndpoints[i].api_url)
    // in dev env: fetch local json to emulate api parsing
    for (let j = 0; j < toolsApi.length; j++) {
        if (toolsEndpoints[i].name === toolsApi[j].name) {
            tool.value = toolsApi[j]
            api.value.push(tool.value)
        }
    }
  }

  return { api }
}
