import { corporationsHtml } from "./corporationsHTML.js"
import { pacsHtml } from "./pacsHTML.js"
import { politiciansHtml } from "./politicianHTML.js"
import { fetchCorporateDonations, fetchCorporateInterests, fetchCorporations, fetchLegislations, fetchPacDonations, fetchPacs, fetchPoliticianLegislations, fetchPoliticians, fetchInterests, getApplicationState } from "./state.js"

const mainContainer = document.querySelector("#container")

fetchPoliticians()
.then(() => fetchCorporations())
.then(() => fetchPacs())
.then(() => fetchCorporateDonations())
.then(() => fetchPacDonations())
.then(() => fetchCorporateInterests())
.then(() => fetchLegislations())
.then(() => fetchPoliticianLegislations())
.then(() => fetchInterests())
.then(() => {
       let state = getApplicationState()
        mainContainer.innerHTML = 
        `${politiciansHtml(state)}${corporationsHtml(state)}${pacsHtml(state)}`
    }
)

