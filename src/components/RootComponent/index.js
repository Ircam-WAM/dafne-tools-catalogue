import toolsApiEndpoints from '@/api/tools-origin.json';
import ToolComponent from "@/components/ToolComponent/index.vue";
import jwtDecode from 'jwt-decode';

export default {
  components: {
    ToolComponent,
  },

  data() {
    const tools = []

    const toolsEndpoints = toolsApiEndpoints["tools_origin"]
    for (let i = 0; i < toolsEndpoints.length; i++) {
        tools.push(toolsEndpoints[i]);
    }

    let token = localStorage.getItem('token');
    let decode = null;
    if (token) {
      if (token) {
        decode = jwtDecode(token);
      }

    }
    return {
      tools: tools,
      user: decode?.email,
      token: token
    }
  }
}
