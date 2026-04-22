// ==UserScript==
// @name         CCAP Policy & User Manual Improvements
// @version      v.03
// @description  Changes javascript links to HTML links (for new tabs), adds/updates links to statute.
// @author       MECH2
// @include      https://www.dhs.state.mn.us/main/idcplg?IdcService=GET_DYNAMIC_CONVERSION&RevisionSelectionMethod=LatestReleased&dDocName=ccap*
// @include      https://www.dhs.state.mn.us/main/idcplg?IdcService=GET_DYNAMIC_CONVERSION&RevisionSelectionMethod=LatestReleased&dDocName=MECC-001609*
// @grant        none
// ==/UserScript==
console.time("CCAP Policy & User Manuals Improvements")
!function jsLinksToHrefLinks() {
    Array.from(document.querySelectorAll('#mainContent a'))
        ?.filter(a => a.href.indexOf("javascript:link") > -1)
        ?.forEach(link => { link.href = "https://www.dhs.state.mn.us/main/idcplg?IdcService=GET_DYNAMIC_CONVERSION&RevisionSelectionMethod=LatestReleased&dDocName=" + link.href.split("'")[1] });
}();

!function addLinksToStatutes() {
    let statuteDescriptionMap = new Map([
        // ["number", "description"],
        ["119B.011", "Description"],

        ["142E.01", "CCAP General Program Definitions"],
        ["142E.03", "Duties of Counties"],
        ["142E.04", "BSF Subprogram Definitions"],
        ["142E.08", "CCMF Subprogram"],
        ["142E.10", "Financial: Eligibility, Providers, Care-in-Home"],
        ["142E.11", "Service Authorizations"],
        ["142E.12", "Activity Eligibility"],
        ["142E.13", "Extended Eligibility & Authorization"],
        ["142E.14", "County Contribution"],
        ["142E.15", "BSF Sliding Scale"],
        ["142E.17", "CCAP Rates"],

        ["142G", "MFIP Program - all sections"],
        ["142G.01", "Establishing MFIP"],
        ["142G.90", "DWP Program"],

        ["256P.05", "Self-Employment Earnings"],
        ["256P.06", "Income Calculations"],

        ["3400.0020", "Glossary / Definitions"],
        ["3400.0035", "Application Procedure"],
        ["3400.0040", "Eligibility Requirements"],
        ["3400.0060", "BSF Funds"],
        ["3400.0080", "CCMF Subprogram"],
        ["3400.0100", "Copay Schedules"],
        ["3400.0110", "Authorizations and Payments"],
        ["3400.0120", "Provider Requirements"],
        ["3400.0170", "Income Eligibility"],
        ["3400.0175", "Extended Eligibility"],
        ["3400.0180", "Redetermination of Eligibility"],
        ["3400.0185", "Notice Requirements"],
    ]);
    let statuteMapReplacements = new Map([
        // ([0-9]+\w\.[0-9]+)\s+(?:MS [0-9]+ )?\[Renumbered ([0-9]+\w?\.[0-9]+).*
        // ["$1", "$2"],
        // ([0-9]+\w\.[0-9]+)\s+(?:\[Rep|\[Exp|Subd).*\n?
        // ''

        ["119B.001", "15.001"],
        ["119B.011", "142E.01"],
        ["119B.02", "142E.02"],
        ["119B.025", "142E.03"],
        ["119B.035", "142E.05"],
        ["119B.095", "142E.11"],
        ["119B.04", "142E.06"],
        ["119B.05", "142E.08"],
        ["119B.06", "142E.07"],
        ["119B.09", "142E.10"],
        ["119B.095", "142E.11"],
        ["119B.097", "142E.11"],
        ["119B.10", "142E.12"],
        ["119B.105", "142E.13"],
        ["119B.12", "142E.15"],
        ["119B.13", "142E.17"],
        ["119B.14", "142E.03"],
        ["119B.15", "142E.02"],
        ["119B.161", "142E.19"],
        ["119B.162", "142E.20"],
        ["119B.189", "142E.30"],
        ["119B.195", "142D.30"],
        ["119B.196", "142D.24"],
        ["119B.24", "142E.02"],
        ["119B.25", "142D.20"],
        ["119B.251", "142D.31"],
        ["119B.252", "142D.32"],
        ["119B.26", "142E.021"],
        ["119B.27", "142D.21"],
        ["119B.28", "142D.22"],
        ["119B.29", "142D.23"],
        ["119B.99", "142A.44"],

        ["256J", "142G"],
        ["256J.001", "15.001"],
        ["256J.021", "142G.04"],
        ["256J.06", "142G.01"],
        ["256J.09", "142G.05"],
        ["256J.10", "142G.10"],
        ["256J.11", "142G.11"],
        ["256J.13", "142G.13"],
        ["256J.14", "142G.14"],
        ["256J.15", "142G.15"],
        ["256J.26", "142G.18"],
        ["256J.31", "142G.21"],
        ["256J.315", "142G.01"],
        ["256J.33", "142G.22"],
        ["256J.35", "142G.32"],
        ["256J.351", "142G.32"],
        ["256J.36", "142G.33"],
        ["256J.39", "142G.35"],
        ["256J.395", "142G.36"],
        ["256J.396", "142G.34"],
        ["256J.40", "142G.45"],
        ["256J.415", "142G.41"],
        ["256J.425", "142G.42"],
        ["256J.45", "142G.27"],
        ["256J.51", "142G.65"],
        ["256J.515", "142G.55"],
        ["256J.521", "142G.56"],
        ["256J.531", "142G.59"],
        ["256J.54", "142G.57"],
        ["256J.545", "142G.53"],
        ["256J.57", "142G.71"],
        ["256J.61", "142G.25"],
        ["256J.621", "142G.37"],
        ["256J.645", "142G.77"],
        ["256J.66", "142G.60"],
        ["256J.67", "142G.61"],
        ["256J.68", "142G.62"],
        ["256J.69", "142G.64"],
        ["256J.72", "142G.63"],
        ["256J.75", "142G.78"],
        ["256J.77", "142G.38"],
        ["256J.88", "142G.01"],
        ["256J.95", "142G.90"],
    ])
    let statuteElement = Array.from(document.querySelectorAll('#mainContent > p')).reverse().find(ele => ele.textContent.match(/^Minnesota (Statute|Rule)/) )
    if (!statuteElement || statuteElement.innerText.indexOf('Minnesota') !== 0) { console.log("User Script: Failed to find element containing statutes."); return };
    statuteElement.id = "statuteLinks"
    document.head.appendChild( createNewEle('style', { type: "text/css", textContent: "#statuteLinks > a { text-decoration: none; }" }) )
    statuteElement.innerHTML = changeStatutesIntoLinks()

    function changeStatutesIntoLinks() {
        function formStatuteDataIntoLink(hrefPage, hrefNumber, textContent) { return '<a target="_blank" href=' + hrefPage + hrefNumber + '>' + textContent + '</a>' };
        function formStatuteTextContent(statuteType, statuteNumbers, statuteDescription, statuteRenumberedTo) { return statuteType + " " + statuteNumbers + (statuteDescription ? " (" + statuteDescription + ")" : "") + (statuteRenumberedTo ? " - renumbered to " + statuteRenumberedTo : "") };
        return statuteElement.innerHTML?.trim().replace(/<br>$/, "")?.split('<br>')?.map( statuteText => {
            statuteText = statuteText?.replace(/[, ]*$/, "")
            if (!statuteText) { console.log("no statute text, changeStatutesIntoLinks"); return };
            let [ statuteLink, statuteNumber, fullStatuteNumbers, statuteType ] = getFirstStatuteAndBaseLink(statuteText)
            let newStatuteNumber = statuteMapReplacements?.get(statuteNumber)
            let addedDescription = statuteDescriptionMap?.get(newStatuteNumber ?? statuteNumber) ?? ""
            return formStatuteDataIntoLink(statuteLink, (newStatuteNumber ?? statuteNumber), formStatuteTextContent(statuteType, fullStatuteNumbers, addedDescription, newStatuteNumber))
        })?.join('<br>\n')
    };
    function getFirstStatuteAndBaseLink(textContent) {
        return textContent?.includes("Minnesota Statute")
            ? [ "https://www.revisor.mn.gov/statutes/cite/", textContent?.match(/Minnesota Statute[s]? (([0-9]{2,3}[A-Z]?)(\.[0-9]+)?).*/)[1], textContent?.split(/Minnesota Statute[s]? /)[1], "Minnesota Statutes" ]
        : [ 'https://www.revisor.mn.gov/rules/', textContent?.match(/Minnesota Rule[s]? ([0-9]+.[0-9]+).*/i)[1], textContent?.split(/Minnesota Rule[s]? /)[1], "Minnesota Rules" ]
    };
}();
function verbose() { console.info( ...arguments, "  (Verbose line: " + ((new Error).stack.split('\n')[1].split(':').reverse()[1]-1) + ")" ) };
function createNewEle(nodeName, attribObj={}, dataObj={}) {
    let newEle = Object.assign(document.createElement(nodeName), attribObj);
    Object.entries(dataObj)?.forEach(([dataName, dataValue] = []) => { newEle.dataset[dataName] = dataValue })
    return newEle;
};
console.timeEnd("CCAP Policy & User Manuals Improvements")
