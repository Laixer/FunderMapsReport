# Project Name

Fundermaps Dashboard

## Omschrijving

Dit is een demo project voor de Fundermaps Maps omgeving.

- Er is rekening gehouden met een minimale schermbreedte van 1024px.
- De Javascript is alleen voor presentatie doeleinden en niet productie klaar.
- De applicatie:
  - Header
  - Main view
  - Sidebar left
  - Sidebar right

## Gebruikte technologieën

De volgende technologiën zijn gebruikt voor de demo.

- [Post CSS](https://postcss.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Parcel](https://parceljs.org/)
- [Alpine.js](https://github.com/alpinejs/alpine)
- [Post html](https://posthtml.org/)

Parcel, Post HTML en Alpine zijn gebruikt voor de demo, het is aan te raden om Tailwind + Postcss ook te gebruiken voor ontwikkeling van de applicatie.

Opzetten van Tailwind css met elk Framework:

- https://tailwindcss.com/docs/installation/framework-guides
- [ViteJS voorbeeld + VueJS](https://tailwindcss.com/docs/guides/vite#vue)

## Getting Started

### Vereisten

- Node.js (version 20.10.0)

### Installatie

1. Clone de repository.
2. Installeer de dependencies

```bash
# Start de applicatie
yarn start

# Bouw de applicatie
yarn build
```

## Demo

### Link demo omgeving online

[Online Demo](https://maps-fundermaps-0815e42252619b01eb5ad6094e9d956ecc31cd7dac1e1f0.lemone.cloud/)

### Klikbare elementen

#### Homepage

- Login knop (gaat naar dashboard)
- Naar wachtwoord vergeten

#### Wachtwoord vergeten

- Naar login

#### Dashboard

- Naar kaart groep (opent een dropdown)
- Gebruikers menu (opent een dropdown)
  - Ga naar profiel (opent een profiel modal)
  - Uitloggen (gaat naar login)
- Open filter (opent de linker sidebar)
  - Sluit (sluit sidebar)
  - Rapportage (opent rapportage)
    - Terug naar kaartfilter (opent kaart filter)
    - Info i (open popup rapportage uitleg)
    - Accordion
  - Verhouding aantal fundering in de buurt (opent grafiek modal)
- Groene marker (opent rechter balk)
  - Sluit (sluit sidebar)
  - Alle informatie link (opent informatie modal)
  - Bekijk onderzoeks informatie (opent sidebar level 2)
    - Terug naar pand informatie (opent pand informatie)
