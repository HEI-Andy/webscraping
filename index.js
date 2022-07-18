const puppeteer= require ('puppeteer');

(async()=> {
    const browser= await puppeteer.launch({headless: true});
    const page= await browser.newPage();
    await page.goto('https://www.portaljob-madagascar.com/emploi/liste/secteur/informatique-web');

    const info= await page.evaluate(()=> {
        let elements= document.querySelectorAll('article.item_annonce');
        let info= [];
        for(const element of elements){
            info.push({
                titre: element.querySelctor('body > section.col2_max_min > div > div.max > article:nth-child(1) > aside.contenu_annonce > h3 > a > strong').text,
                company_name: element.querySelctor('body > section.col2_max_min > div > div.max > article:nth-child(1) > aside.contenu_annonce > h4').text,
                contrat_type: element.querySelctor('body > section.col2_max_min > div > div.max > article:nth-child(1) > aside.contenu_annonce > h5').text,
                description: element.querySelctor('body > section.col2_max_min > div > div.max > article:nth-child(1) > aside.contenu_annonce > a').text
            })
        }
        return info;
    });
    console.log(info);
    await browser.close();
})();