import { createWebHistory, createWebHashHistory, createRouter } from "vue-router";
import toolsApiEndpoints from '@/api/tools-origin.json';
import Home from "@/components/Home/index.vue";
import ToolComponent from "@/components/ToolComponent/index.vue";

const routes = [
    { path: '/', component: Home },
]

const toolsEndpoints = toolsApiEndpoints["tools_origin"]

// parse routes from api
for (let i = 0; i < toolsEndpoints.length; i++) {
    const route = {
        path: "/tool/:name",
        name: toolsEndpoints[i].name,
        component: ToolComponent,
        props: true,
    }
    routes.push(route);
}

console.log("ALL ROUTES: ", routes);

const router = createRouter({
    history: process.env.NODE_ENV === 'development' ? createWebHashHistory() : createWebHistory(),
    routes,
});

export default router;