
export const politiciansHtml = (state) => {
    return `<article class="politicians"><h2>Politicians</h2>
    ${state.politicians.reduce(
        (previous,politician) => {
        return `${previous}
            <section class="politician">
                <header class="politician__name">
                    <h1>${politician.name.first} ${politician.name.last}</h1>
                </header>
                <div class="politician__info">
                    <div>Age: ${politician.age}</div>
                    <div>Represents: ${politician.district}</div>
                </div>
                <div class="politician__bills">
                ${politicianBills(state,politician)}
                </div>
                <div class="pac__donations">
                
                    ${campaignDonationsHtml(state,politician)}
                
            </div>
            <div class="politician__influencers">
            <h3>Influencing Corporations</h3>
            <ul>
                ${politicianInfluencers(state,politician)}
            </ul>
        </div>
            </section><hr>
        `    
        },""
    )
}</article>`
}


const campaignDonationsHtml = (state,politician) => {
    let donatingPacs = []
    for (const donation of state.pacDonations){
        let foundPac = ""
        if (donation.politicianId === politician.id){
            foundPac=donatingPacs.find(pac => {return pac === donation.pacId})
            if(foundPac){
                
            }else{
                donatingPacs.push(donation.pacId)
            }
        }
    }
    let html = "<h4>PAC Donations</h4><ul>"
    for(const donatingPac of donatingPacs){
        let total = 0
        let findTotal = state.pacDonations.forEach(donation => {
            if(donation.pacId === donatingPac && donation.politicianId === politician.id){
                total+= donation.amount
            }
        })
        let findPac = state.pacs.find(p => p.id === donatingPac)
        html += `<li>${findPac.registeredName} ($${total})</li>`
    }
    if(donatingPacs.length !== 0){
    html += "</ul>"
    return html
    } else {
        return "<h4>No Pac Donations</h4>"
    }
}

const politicianBills = (state,politician) => {
    let politicianLegislations = state.politicianLegislations.filter(l => {return l.politicianId === politician.id})
    if(politicianLegislations.length !== 0){
        return `<h4>Sponsored Bills</h4>${politicianLegislations.reduce((prev, pl)=>{
            let foundBill = state.legislations.find(l => {return l.id === pl.legislationId})
            if(foundBill){
            return `${prev}<div>${foundBill.name}</div>`
            }
        },"")}`
    } else {
        return `<h4>No sponsored bills</h4>`
    }
}

const politicianInfluencers = (state,politician) => {
    let matchesArray = []
    let politicianLegislations = state.politicianLegislations.filter(l => {return l.politicianId === politician.id})
    for (const pL of politicianLegislations) {
        for(const legislation of state.legislations){
            if(pL.legislationId === legislation.id){
                for (const cI of state.corporateInterests) {
                    if(legislation.interestId === cI.interestId){
                        for(const cD of state.corporateDonations){
                            if(cI.corporationId === cD.corporationId){
                                for(const pD of state.pacDonations){
                                    if(cD.pacId === pD.pacId && pD.politicianId === politician.id){
                                        let foundCorporation = state.corporations.find(c => c.id === cD.corporationId)
                                        matchesArray.push(foundCorporation)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if(matchesArray.length === 0){
        return "None found!"
    } else{
        let dupesRemoved = []
        for (const c of matchesArray) {
            if(dupesRemoved.includes(c)){

            }else{
                dupesRemoved.push(c)
            }
        }
        let html=""
        for (const c of dupesRemoved) {
            html += `<li>${c.company}</li>`
        }
        return html
    }
}