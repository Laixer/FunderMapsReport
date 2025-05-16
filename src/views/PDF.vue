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
import { useSubsidenceStore } from '@/store/building/subsidence';

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
import { useRoute, useRouter } from 'vue-router';
import ConstructionYearChapter from '@/components/Print/Chapters/ConstructionYearChapter.vue';


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
  if (!buildingId.value) return false

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
        !buildingRecoveryReportDataHasBeenRetrieved(buildingId) ||
        !buildingIncidentReportDataHasBeenRetrieved(buildingId) ||
        !buildingInquiryDataHasBeenRetrieved(buildingId)
      ) {
        return await api.building.getAllReportDataByBuildingId(buildingId)
          .then(response => {
            if (!buildingRecoveryReportDataHasBeenRetrieved(buildingId)) {
              setRecoveryDataByBuildingId(buildingId, response.recoveries, response.recoverySamples)
            }
            if (!buildingInquiryDataHasBeenRetrieved(buildingId)) {
              setInquiryDataByBuildingId(buildingId, response.inquiries, response.inquirySamples)
            }
            if (!buildingIncidentReportDataHasBeenRetrieved(buildingId)) {
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

  const route = useRoute()
  const router = useRouter()

  if (!route.params.buildingId) {
    router.push({ name: 'NotFound' })
    return
  }

  setBuildingId(route.params.buildingId as string)
})

</script>

<template>
  <template v-if="hasAllBuildingInformation">

    <header class="header--print | relative isolate overflow-hidden rounded-md">
      <img src="@assets/images/header-bg.png" alt="" class="inset absolute -z-10 w-full" />
      <img src="@assets/images/header-artifact.print.png" alt="" class="justify-self-start" />
      <div class="grid justify-items-center gap-2 text-white">
        <img src="@assets/svg/fundermaps-inverted.svg?url" alt="Logo Fundermaps" class="h-8" />
        <h1>Funderingsrisicorapport</h1>
      </div>
    </header>

    <BuildingChapter />
    <LocationChapter />
    <PageBreak />

    <InquirySampleChapter />
    <FoundationRestorationChapter />
    <PageBreak />
    
    <ConstructionYearChapter />
    <PageBreak />
    
    <FoundationRiskChapter />
    <PageBreak />

    <ReportingChapter />

    <FacadeReviewChapter />

    <DisplacementDataChapter />

    <IncidentsChapter />
    <PageBreak />

    <article class="space-y-5">
      <header class="flex break-after-avoid items-center gap-2.5">
        <h2 class="h-4">Toelichting op het funderingsrisicorapport</h2>
      </header>
      <section class="space-y-4 text-grey-700">
        <strong>Betrouwbaarheid</strong>
        <p>
          De betrouwbaarheid van het funderingsrisicorapport hangt af van de beschikbaarheid en aard van de onderliggende gegevens:
        </p>
        <ul>
          <li>
            <strong>Vastgesteld:</strong> Wanneer er geen directe onderzoeksgegevens beschikbaar zijn voor het pand zelf, maar wel voor naastgelegen panden binnen dezelfde bouw- of funderingseenheid, wordt het funderingstype en de risicobeoordeling beschouwd als afgeleid. Deze afleiding is doorgaans goed onderbouwd, omdat vergelijkbare constructies en omstandigheden gelden
          </li>
          <li>
            <strong>Afgeleid:</strong> Daar waar specifieke onderzoeksgegevens van het betreffende pand beschikbaar zijn, is de betrouwbaarheid van de uitgangspunten hoog. Het funderingstype en/of het funderingsrisico wordt dan als vastgesteld beschouwd.
          </li>
          <li>
            <strong>Modelmatig (indicatief):</strong> Als er geen gegevens beschikbaar zijn van het pand zelf of van omliggende panden, wordt gebruikgemaakt van een modelanalyse. De uitkomsten daarvan zijn indicatief en hebben een lagere betrouwbaarheid.
          </li>
        </ul>

        <strong class="block">Aanvullend onderzoek</strong>
        <p>
          Wanneer het risico op funderingsproblematiek verhoogd is en de databetrouwbaarheid als vastgesteld of afgeleid wordt beschouwd, kan een QuickScan uitkomst bieden. Zeker wanneer u – of een expert – op basis van zichtbare signalen zoals scheurvorming of scheefstand vermoedt dat daadwerkelijk sprake is van funderingsschade.
        </p>
        <p>
          Een QuickScan is een snelle en relatief betaalbare methode om het funderingsrisico nader te beoordelen. Op basis van deze beoordeling kan worden vastgesteld of aanvullend funderingsonderzoek noodzakelijk is, of dat het risiconiveau juist naar beneden kan worden bijgesteld.
        </p>
        <p>
          Meer informatie vindt u op de website van het Kennis Centrum Aanpak Funderingsproblematiek (KCAF): <a href="https://www.kcaf.nl/quickscan-risicobeoordeling/" target="_blank">https://www.kcaf.nl/quickscan-risicobeoordeling/</a>
        </p>

        <strong class="block">Wijzigen of reageren?</strong>
        <p>
          Bent u het niet eens met de beoordeling, wilt u gegevens wijzigen of heeft u behoefte aan aanvullende informatie over dit funderingsrisicorapport? Dan kunt u terecht op: <a href="https://feedback.fundermaps.com/" target="_blank">https://feedback.fundermaps.com/</a>.
        </p>
        <p>
          Hier kunt u eenvoudig een wijzigingsverzoek indienen of contact opnemen met ons team.
        </p>
      </section>
    </article>

    <PageBreak />

    <article class="space-y-5">
      <header class="flex break-after-avoid items-center gap-2.5">
        <h2 class="h-4">Disclaimer</h2>
      </header>
      <section class="space-y-4 text-grey-700">
        <p>
          Dit funderingsrisicorapport is opgesteld op basis van beschikbare gegevens, metingen, modelanalyses en externe bronnen die op het moment van samenstelling beschikbaar waren. De gebruikte informatie is deels afkomstig van derden en/of berekend met behulp van algoritmen en risicomodellen. Waar mogelijk zijn deze gegevens aangevuld met locatiegerichte onderzoeksresultaten.
        </p>
        <p>
          De in dit rapport opgenomen funderingstypen en risico-indicaties zijn bedoeld als risicosignalering. Wanneer de betrouwbaarheid als modelmatig (indicatief) is aangeduid, betreft het een globale inschatting op basis van generieke data. Deze gegevens geven geen garantie voor de daadwerkelijke staat van het pand en vormen geen vervanging van een technisch funderingsonderzoek op locatie.
        </p>
        <p>
          De betrouwbaarheid van het risicoprofiel verschilt per pand en is afhankelijk van de beschikbaarheid en kwaliteit van onderliggende data. Aanduidingen als vastgesteld, afgeleid of indicatief verwijzen naar deze mate van betrouwbaarheid.
        </p>
        <p>
          De informatie in dit rapport is uitsluitend bedoeld als hulpmiddel bij het verkrijgen van inzicht in mogelijke funderingsrisico's. Het rapport is niet bedoeld als bindend advies voor juridische of financiële besluitvorming, zoals aankoop, verkoop of hypothecaire financiering.
        </p>
        <p>
          Voor het vaststellen van de feitelijke staat van de fundering is een inspectie op locatie door een daartoe gespecialiseerd bureau noodzakelijk. Dit rapport vervangt een dergelijk onderzoek niet.
        </p>
        <p>
          De gegevens in dit rapport zijn momentopnamen. Funderingscondities en risico-inschattingen kunnen in de loop van de tijd wijzigen als gevolg van veranderende omgevingsfactoren of beschikbaarheid van nieuwe data.
        </p>
        <p>
          FunderMaps en haar partners spannen zich in om betrouwbare en actuele gegevens te leveren, maar kunnen niet instaan voor de juistheid, volledigheid of geschiktheid van de informatie voor het specifieke doel van de gebruiker. Gebruik van dit rapport is op eigen risico. FunderMaps aanvaardt geen aansprakelijkheid voor directe of indirecte schade als gevolg van interpretatie of toepassing van de gegevens in dit rapport.
        </p>
        <p>
          Bij twijfel over de inhoud of toepassing van dit rapport wordt geadviseerd contact op te nemen met een deskundig funderingsadviseur of een funderingsonderzoeksbureau.
        </p>
      </section>
    </article>
  </template>
</template>
