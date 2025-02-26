import axios from '@/plugins/axios'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projectsStore', () => {
  // state
  const projects = ref([])
  const sortProjects = ref([])
  const categories = ref([])

  // getters
  const projectsList = computed(() =>
    sortProjects.value.length > 0 ? sortProjects.value : projects.value,
  )

  //actions
  const fetchProjects = async () => {
    try {
      const request = axios.get(`/projects`)
      const response = await request
      projects.value = response.items
    } catch (err) {
      console.log(err)
    }
  }

  const fetchCategories = async () => {
    try {
      const request = axios.get(`/project-categories`)
      const response = await request
      categories.value = response.items
    } catch (err) {
      console.log(err)
    }
  }

  const serializeProjects = (id) => {
    const list = projects.value.filter((item) => item.categories[0].id === id)
    sortProjects.value = list
  }

  const setDefaultProgects = () => {
    sortProjects.value = projects.value
  }

  return {
    projectsList,
    sortProjects,
    categories,
    projects,
    fetchProjects,
    fetchCategories,
    serializeProjects,
    setDefaultProgects,
  }
})
