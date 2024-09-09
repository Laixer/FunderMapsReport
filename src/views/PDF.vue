<script setup lang="ts">
import { onBeforeMount, watch, computed } from 'vue';
import { storeToRefs } from 'pinia';

import api from '@/services/api';

import { useBuildingStore } from '@/store/buildings';
import { useGeoLocationsStore } from '@/store/building/geolocations'
import { useAnalysisStore } from '@/store/building/analysis'
import { useRecoveryReportsStore } from '@/store/building/recovery'
import { useInquiriesStore } from '@/store/building/inquiries'
import { useIncidentReportsStore } from '@/store/building/incidents'
import { useStatisticsStore } from '@/store/building/statistics'
import { useSubsidenceStore } from '@/store/building/subsidence.ts';

// import Chapter from '@/components/Print/Chapter.vue'
import PageBreak from '@/components/Print/PageBreak.vue'

import BuildingChapter from '@/components/Print/Chapters/BuildingChapter.vue'
import LocationChapter from '@/components/Print/Chapters/LocationChapter.vue';
import InquirySampleChapter from '@/components/Print/Chapters/InquirySampleChapter.vue'
import FoundationRestorationChapter from '@/components/Print/Chapters/FoundationRestorationChapter.vue'
import FoundationRiskChapter from '@/components/Print/Chapters/FoundationRiskChapter.vue'
import ReportingChapter from '@/components/Print/Chapters/ReportingChapter.vue'
import FacadeReviewChapter from '@/components/Print/Chapters/FacadeReviewChapter.vue'
import DisplacementDataChapter from '@/components/Print/Chapters/DisplacementDataChapter.vue'
import IncidentsChapter from '@/components/Print/Chapters/IncidentsChapter.vue'


/**
 * Store access 
 */
const { buildingId } = storeToRefs(useBuildingStore())

/**
 * Menu items
 */
 const { 
  loadLocationDataByBuildingId,
  buildingLocationDataHasBeenRetrieved
} = useGeoLocationsStore()

const { 
  loadAnalysisDataByBuildingId,
  buildingAnalysisDataHasBeenRetrieved
} = useAnalysisStore()

const { 
  loadStatisticsDataByBuildingId,
  buildingStatisticsDataHasBeenRetrieved
} = useStatisticsStore()

/**
 * Green buttons
 */
const { 
  buildingRecoveryReportDataHasBeenRetrieved,
  setRecoveryDataByBuildingId
} = useRecoveryReportsStore()

const { 
  buildingInquiryDataHasBeenRetrieved,
  setInquiryDataByBuildingId
} = useInquiriesStore()

const { 
  buildingIncidentReportDataHasBeenRetrieved,
  setIncidentDataByBuildingId
} = useIncidentReportsStore()

const {
  buildingSubsidenceDataHasBeenRetrieved,
  loadSubsidenceDataByBuildingId
} = useSubsidenceStore()

const hasAllBuildingInformation = computed(() => {
  if (! buildingId.value) return false

  return (
    buildingLocationDataHasBeenRetrieved(buildingId.value)
    && buildingAnalysisDataHasBeenRetrieved(buildingId.value)
    && buildingStatisticsDataHasBeenRetrieved(buildingId.value)
    && buildingRecoveryReportDataHasBeenRetrieved(buildingId.value)
    && buildingInquiryDataHasBeenRetrieved(buildingId.value)
    && buildingIncidentReportDataHasBeenRetrieved(buildingId.value)
    && buildingSubsidenceDataHasBeenRetrieved(buildingId.value)
  )
})

/**
 * When the selected building changes, we put the stores to work
 */
watch(
  () => buildingId.value,
  async (buildingId) => {
    if (buildingId === null) return

    // TODO: Quick fix to support cache. Move to some store ?
    const getAllReportDataUnlessCached = async function getAlReportDataUnlessCached(buildingId: string) {
      if (
        ! buildingRecoveryReportDataHasBeenRetrieved(buildingId) ||
        ! buildingIncidentReportDataHasBeenRetrieved(buildingId) ||
        ! buildingInquiryDataHasBeenRetrieved(buildingId)
      ) {
        return await api.building.getAllReportDataByBuildingId(buildingId)
          .then(response => {

            if (! buildingRecoveryReportDataHasBeenRetrieved(buildingId)) {
              setRecoveryDataByBuildingId(buildingId, response.recoveries, response.recoverySamples)
            }
            if (! buildingInquiryDataHasBeenRetrieved(buildingId)) {
              setInquiryDataByBuildingId(buildingId, response.inquiries, response.inquirySamples)
            }
            if (! buildingIncidentReportDataHasBeenRetrieved(buildingId)) {
              setIncidentDataByBuildingId(buildingId, response.incidents)
            }
          })
      }

      return Promise.resolve()
    }

    // TODO: Handle errors here ?
    // TODO: Retry logic. Local or global?
    await Promise.all([
      loadLocationDataByBuildingId(buildingId),
      loadAnalysisDataByBuildingId(buildingId),
      loadStatisticsDataByBuildingId(buildingId),

      // TODO: This implementation is a quick fix to support "cache"
      getAllReportDataUnlessCached(buildingId),
      loadSubsidenceDataByBuildingId(buildingId)
    ])
  },
  { immediate: true }
)

onBeforeMount(() => {
  const { setBuildingId } = useBuildingStore()

  // With (empty) inquiry samples
  // setBuildingId('FIR622020-3297')

  // with incident reports, no inquiry samples
  // setBuildingId("FIR622020-3458")

  // Recovery & inquiry
  // setBuildingId('NL.IMBAG.PAND.0599100000636585')

  // Subsidence
  setBuildingId("NL.IMBAG.PAND.0091100000015361")
})

</script>

<template>

  <template v-if="hasAllBuildingInformation">

    <!-- HEADER -->
    <header
      class="header--print | relative isolate overflow-hidden rounded-md"
    >
      <img
        src="@assets/images/header-bg.png"
        alt=""
        class="inset absolute -z-10 w-full"
      />
      <img
        src="@assets/images/header-artifact.print.png"
        alt=""
        class="justify-self-start"
      />
      <div class="grid justify-items-center gap-2 text-white">
        <img
          src="@assets/svg/fundermaps-inverted.svg?url"
          alt="Logo Fundermaps"
          class="h-8"
        />
        <h1>Funderingsrisicorapport</h1>
      </div>
    </header>

    
    <!-- CHAPTER: BUILDING -->
    <!-- TODO: 2 fields yet to be implemented in API -->
    <BuildingChapter />

    <!-- CHAPTER: LOCATION -->
    <LocationChapter />

    <!-- PAGE BREAK -->
    <PageBreak />

    <!-- CHAPTER: FOUNDATION -->
    <InquirySampleChapter />

    <!-- CHAPTER: FOUNDATION RESTORATION -->
    <FoundationRestorationChapter />

    <!-- CHAPTER: FOUNDATION RISK -->
    <FoundationRiskChapter />

    <!-- CHAPTER: REPORTING -->
    <ReportingChapter />

    <!-- CHAPTER: FACADE REVIEW -->
    <FacadeReviewChapter />

    <!-- PAGE BREAK -->
    <PageBreak />

    <!-- CHAPTER: DISPLACEMENT DATA -->
    <!-- TODO: API to be provided -->
    <DisplacementDataChapter />

    <!-- PAGE BREAK -->
    <PageBreak />

    <!-- CHAPTER: INCIDENTS -->
    <!-- TODO: Map layer not visible -->
    <IncidentsChapter />

    <!-- PAGE BREAK -->
    <PageBreak />

    <!-- CHAPTER: CLOSING REMARKS -->
    <article class="space-y-5">
      <header class="flex break-after-avoid items-center gap-2.5">
        <h2 class="h-4">Afsluitende tekst</h2>
      </header>
      <section class="space-y-4 text-grey-700">
        <p>
          Daar waar onderzoeksgegevens zijn gebruikt, is de betrouwbaarheid
          van de uitgangspunten hoog. Het funderingstype en/of
          funderingsrisico wordt dan ook als &lsquo;vastgesteld&rsquo;
          beschouwd.Wanneer geen onderzoeksgegevens beschikbaar zijn voor het
          betreffende pand, maar wel voor de naastgelegen panden,betreft het
          aangegeven funderingstype en de risicobeoordeling een
          &lsquo;afgeleid&rsquo; uitgangspunt. Het is zeer aannemelijk deze
          afgeleide uitgangspunten ook voor dit betreffende pand gelden daar
          dit pand onderdeel is van dezelfde bouw- of funderingseenheid.
        </p>
        <p>
          Indien er geen gegevens van het pand of de naastgelegen panden
          beschikbaar zijn, wordt een modelanalyse uitgevoerd.Deze
          analyseresultaten zijn indicatief en hebben een lagere
          betrouwbaarheid.
        </p>
        <p>
          Wanneer u het niet eens bent met de beoordeling, wanneer u
          wijzigingen van de data wilt doorgeven of meer informatie wiltover
          dit funderingsrisicorapport of de QuickScan, dan kunt u terecht op
          <a href="https://www.fundermaps.com/formulier/meldingen"
            >https://www.fundermaps.com/formulier/meldingen</a
          >.
        </p>
      </section>
    </article>

  </template>
</template>
