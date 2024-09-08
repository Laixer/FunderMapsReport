
import { type Ref, ref, computed, watch } from 'vue';
import { defineStore } from 'pinia'

import { useSessionStore } from './session';

const buildingId: Ref<string|null> = ref(null)

/**
 * Whether a building is selected
 */
const hasSelectedBuilding = computed<boolean>(() => {
  return buildingId.value !== null
})

/**
 * Select a building to be shown in the right sidebar
 */
const setBuildingId = function setBuildingId(id: string) {

  // A quick debug override
  const debugBuildingId = localStorage.getItem('debugBuildingId')
  buildingId.value = debugBuildingId || id
}

/**
 * Deselect the building
 */
const clearBuildingId = function clearBuildingId() {
  buildingId.value = null
}


function useBuildings() {
  /**
   * Clean up selected building on logout
   */
  const { isAuthenticated } = useSessionStore()

  watch(
    () => isAuthenticated,
    (value) => {
      if (value !== true) {
        clearBuildingId()
      }
    }
  )

  return {
    buildingId,
    hasSelectedBuilding,

    setBuildingId,
    clearBuildingId
  }
}


export const useBuildingStore = defineStore(
  'buildings',
  useBuildings
)

