// {
//     "id": 1,
//     "corporationId": 5,
//     "pacId": 2,
//     "amount": 84853
// },


export const pacsHtml = (state) => {
    return `<article class="pacs"><h2>PACs</h2>
    ${state.pacs.reduce(
        (previous,pac) => {
        return `${previous}
                <section class="pac">
                <header class="pac__name">
                    <h1>${pac.registeredName}</h1>
                </header>
                <div class="pac__info">
                    <div>${pac.address}</div>
                </div>
                <div class="pac__donors">
                    <h3>Donors</h3>
                    <ul>
                        ${corporateDonationsHtml(state,pac)}
                    </ul>
                </div>
            </section><hr>
        `    
        },""
    )
}</article>`
}

const corporateDonationsHtml = (state,pac) => {
    let donatingCompanies = []
    for (const donation of state.corporateDonations){
        let foundCompany = ""
        if (donation.pacId === pac.id){
            foundCompany=donatingCompanies.find(company => {return company === donation.corporationId})
            if(foundCompany){
                
            }else{
                donatingCompanies.push(donation.corporationId)
            }
        }
    }
    let html = ""
    for(const donatingCompany of donatingCompanies){
        let total = 0
        let findTotal = state.corporateDonations.forEach(donation => {
            if(donation.corporationId === donatingCompany && donation.pacId === pac.id){
                total+= donation.amount
            }
        })
        let findCompany = state.corporations.find(c => c.id === donatingCompany)
        html += `<li>${findCompany.company} ($${total})</li>`
    }
    return html
}