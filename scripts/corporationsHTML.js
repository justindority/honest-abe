
export const corporationsHtml = (state) => {
    return `<article class="corporations"><h2>Corporations</h2>
    ${state.corporations.reduce(
        (previous,corporation) => {
        return `${previous}
                <section class="corporation">
                <header class="corporation__name">
                    <h1>${corporation.company}</h1>
                </header>
                <div class="corporation__info">
                    <div>Address: ${corporation.address}</div>
                </div>
                </section>
        `    
        },""
    )
}</article>`
}