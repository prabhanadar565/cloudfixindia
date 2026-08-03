export function stats() {

return `

<section class="stats">

<div class="container">

<div class="stats-grid">

${card("50","+","Devices Repaired")}

${card("98","%","Customer Satisfaction")}

${card("4","+","Years Experience")}

${card("24","/7","Remote Support")}

</div>

</div>

</section>

`;

}

function card(number,suffix,title){

return `

<div class="stat-card">

<h2>

<span class="counter"

data-target="${number}">

0

</span>${suffix}

</h2>

<p>${title}</p>

</div>

`;

}