"use strict"

class Region extends HTMLElement {
    constructor()
    {
    super();
    this.attachShadow({mode: 'open'})
    }
    connectedCallback()
    {
    this.shadowRoot.innerHTML = `
    <style>
    </style>
    
    <div class="region">

    <h1>${this.getAttribute("nom")}</h1>
    <p class="important">${this.getAttribute('code')}</p>

    </div>
    `;
    }
    }
    customElements.define('region-api', Region)



async function getRegions(){
   let regions;
    await fetch('https://geo.api.gouv.fr/regions')
        .then(response => response.json())
        .then(data => {printRegions(data)})
        .catch(error => console.error(error));
        return regions
}
console.log(getRegions())

async function printRegions(regions)
{
  
    regions.forEach(region=> {
        const regionElement = document.createElement('region-api');
        regionElement.setAttribute('nom', region.nom);
        regionElement.setAttribute('code', region.code);
        
        document.querySelector('#regions').appendChild(regionElement);
        
        

    });
}

getRegions();
