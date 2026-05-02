<script setup lang="ts">
import Chapter from '@/components/Print/Chapter.vue'

// Front-of-report guide. Placed after CoverSummary so customers know how
// to read the labels and colours BEFORE encountering them in chapters.
//
// The reliability tier definitions previously lived in the trailing
// "Toelichting" article — moved here so terms are defined where they're
// first needed.
</script>

<template>
  <Chapter icon="info" title="Hoe leest u dit rapport?">
    <section class="space-y-7">
      <p class="text-grey-700">
        Dit funderingsrisicorapport bundelt onderzoeksgegevens, modelresultaten en metingen voor uw
        pand en de directe omgeving. Hieronder staat kort uitgelegd hoe u de aanduidingen in de
        hoofdstukken hierna leest.
      </p>

      <div class="space-y-3">
        <strong class="text-grey-800 block">Risicocategorieën</strong>
        <ol class="list--legenda">
          <li style="--marker-color: #2e7d32"><strong>A</strong> — Geen risico</li>
          <li style="--marker-color: #9e9d24"><strong>B</strong> — Laag risico</li>
          <li style="--marker-color: #f9a825"><strong>C</strong> — Verhoogd risico</li>
          <li style="--marker-color: #ef6c00"><strong>D</strong> — Hoog risico</li>
          <li style="--marker-color: #c62828"><strong>E</strong> — Aanzienlijk hoog risico</li>
        </ol>
        <p class="text-grey-700">
          De categorieën lopen van A (laagste) tot E (hoogste). Een hogere categorie betekent een
          grotere kans op funderingsproblematiek — niet automatisch dat er nu al schade is.
        </p>
      </div>

      <div class="text-grey-700 space-y-3">
        <strong class="text-grey-800 block">Betrouwbaarheid</strong>
        <p>
          Bij elke beoordeling staat hoe betrouwbaar de uitkomst is. Dat hangt af van welke gegevens
          beschikbaar zijn:
        </p>
        <ul class="space-y-2">
          <li>
            <strong>Vastgesteld:</strong> Er zijn specifieke onderzoeksgegevens beschikbaar voor dit
            pand zelf. De betrouwbaarheid is hoog.
          </li>
          <li>
            <strong>Afgeleid:</strong> Er zijn geen directe gegevens voor dit pand, maar wel voor
            naastgelegen panden binnen dezelfde bouw- of funderingseenheid. Doorgaans goed onderbouwd,
            omdat vergelijkbare constructies en omstandigheden gelden.
          </li>
          <li>
            <strong>Modelmatig (indicatief):</strong> Er zijn geen gegevens van dit pand of de
            omliggende panden. De uitkomst is een modelinschatting met een lagere betrouwbaarheid.
          </li>
        </ul>
      </div>
    </section>
  </Chapter>
</template>
