import axios from "@/plugins/axios";

const projects = {
  namespaced: true,
  state: {
    projects: [],
    sortProjects: [],
    categories: [],
  },
  getters: {
    projectsList({ projects, sortProjects }) {
      return sortProjects.length > 0 ? sortProjects : projects;
    },
    projects({ projects }) {
      return projects;
    },
    categoriesList({ categories }) {
      return categories;
    },
  },
  mutations: {
    SET_PROJECTS(state, data) {
      state.projects = data;
    },
    SET_SERIALIZE_PROJECTS(state, data) {
      state.sortProjects = data;
    },
    SET_CATEGORIES(state, data) {
      state.categories = data;
    },
  },
  actions: {
    async fetchProjects({ commit }) {
      try {
        const request = axios.get(`/projects`);
        const response = await request;
        commit("SET_PROJECTS", response.items);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchCategories({ commit }) {
      try {
        const request = axios.get(`/project-categories`);
        const response = await request;
        commit("SET_CATEGORIES", response.items);
      } catch (err) {
        console.log(err);
      }
    },
    serializeProjects({ commit, getters }, id) {
      const { projects } = getters;
      const list = projects.filter((item) => item.categories[0].id === id);
      commit("SET_SERIALIZE_PROJECTS", list);
    },
    setDefaultProgects({ commit, getters }) {
      const { projects } = getters;
      console.log(projects);
      commit("SET_SERIALIZE_PROJECTS", projects);
    },
  },
};

export default projects;
