const applicationState = {}
const api = "http://localhost:8088"

export const getApplicationState = () => {
    return structuredClone(applicationState)
}

export const fetchPoliticians = () => {
    return fetchIt(`${api}/politicians`)
        .then((politicians) => applicationState.politicians = politicians)
}

export const fetchCorporations = () => {
    return fetchIt(`${api}/corporations`)
        .then((corporations) => applicationState.corporations = corporations)
}

export const fetchPacs = () => {
    return fetchIt(`${api}/pacs`)
        .then((pacs) => applicationState.pacs = pacs)
}

export const fetchCorporateDonations = () => {
    return fetchIt(`${api}/corporatedonations`)
        .then((corporatedonations) => applicationState.corporateDonations = corporatedonations)
}

export const fetchPacDonations = () => {
    return fetchIt(`${api}/pacDonations`)
        .then((pacDonations) => applicationState.pacDonations = pacDonations)
}

export const fetchPoliticianLegislations = () => {
    return fetchIt(`${api}/politicianlegislations`)
        .then((politicianlegislations) => applicationState.politicianLegislations = politicianlegislations)
}

export const fetchLegislations = () => {
    return fetchIt(`${api}/legislations`)
        .then((legislations) => applicationState.legislations = legislations)
}

export const fetchCorporateInterests = () => {
    return fetchIt(`${api}/corporateinterests`)
        .then((corporateinterests) => applicationState.corporateInterests = corporateinterests)
}

export const fetchInterests = () => {
    return fetchIt(`${api}/interests`)
        .then((interests) => applicationState.interests = interests)
}

export const fetchIt = (url, method = "GET", body = null) => {
    let options = {
        "method": method,
        "headers": {}
    }

    switch (method) {
        case "POST":
        case "PUT":
            options.headers = {
                "Content-Type": "application/json"
            }
            break;
        default:
            break;
    }

    if (body !== null) {
        options.body = body
    }

    return fetch(url, options).then(r => r.json())
}
