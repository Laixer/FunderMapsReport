<template>
  <article class="space-y-5">
    <header class="flex break-after-avoid items-center gap-2.5">
      <icon
        src="fundermaps/graph.svg?url"
        class="accent-color-blue aspect-square w-4"
        aria-hidden="true"
      ></icon>
      <h2 class="h-4">Pandzakking</h2>
    </header>
    <section class="space-y-10">
      <div class="highlight w-1/2">
        <img
          src="@assets/images/highlight-bg.png"
          alt=""
          class="inset absolute -z-10 w-full"
        />
        <div class="highlight__content space-y-3">
          <h3>Pandzakkingsgegevens</h3>
          <dl role="list" class="list--definition">
            <div class="grid">
              <div>
                <div class="item--grid">
                  <dt>Pandzakkingssnelheid</dt>
                  <dd>Geen data</dd>
                </div>
                <div class="item--grid">
                  <dt>Kwaliteit meetpunt</dt>
                  <dd>Nihil</dd>
                </div>
                <div class="item--grid">
                  <dt>Aantal meetpunten</dt>
                  <dd>300</dd>
                </div>
                <div class="item--grid">
                  <dt>Variatiecoëfficiënt</dt>
                  <dd>Geen data</dd>
                </div>
              </div>
            </div>
          </dl>
        </div>
      </div>
      <figure>
        <img
          src="@assets/images/scatter-chart.png"
          alt=""
          class="w-full"
        />
      </figure>
    </section>
  </article>
</template>