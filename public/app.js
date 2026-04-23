const logEl = document.getElementById('systemLog');
const skillsData = [
  {name:'HubSpot Pipeline',domain:'sales',desc:'Analysoi avoin pipeline ja raportoi stagennut diilit.',id:'hubspot-pipeline'},
  {name:'Morning Brief',domain:'productivity',desc:'Kerää kalenteri, diilit ja tehtävät päivän alkuun.',id:'morning-brief'},
  {name:'Prospect Research',domain:'research',desc:'Enrich lead julkisista lähteistä + HubSpot-historia.',id:'prospect-research'},
  {name:'Content Pipeline',domain:'content',desc:'Generoi LinkedIn/X/blogi materiaalia annetusta lähteestä.',id:'content-pipeline'},
  {name:'Dome Sync',domain:'system',desc:'Synkkaa tietoa DomeDeVille:iin iCloudista ja lähteistä.',id:'dome-sync'},
  {name:'Post-Meeting',domain:'productivity',desc:'Analysöi palaverin transkripti ja luo to-do:t.',id:'post-meeting'},
  {name:'Lead Qualify',domain:'sales',desc:'Arvioi inbound-leadin sopivuus ICP:hen.',id:'lead-qualify'},
  {name:'Weekly Report',domain:'system',desc:'Koosta viikkoraportti diileistä ja aktiviteeteistä.',id:'weekly-report'}
];

function log(msg){
  const t=new Date().toLocaleTimeString('fi-FI',{hour:'2-digit',minute:'2-digit'});
  const line=document.createElement('div');line.className='log-line';
  line.innerHTML=`<span class="log-time">${t}</span>${msg}`;
  logEl.appendChild(line);logEl.scrollTop=logEl.scrollHeight;
}

function runSkill(name){
  log(`Running skill: ${name}...`);
  setTimeout(()=>log(`Skill ${name} completed successfully.`),1200);
}

function renderSkills(filter='all'){
  const grid=document.getElementById('skillsGrid');
  grid.innerHTML='';
  skillsData.filter(s=>filter==='all'||s.domain===filter).forEach(s=>{
    const card=document.createElement('div');card.className='card';
    card.innerHTML=`
      <div class="card-header"><span class="card-title">${s.name}</span><span class="card-badge">${s.domain}</span></div>
      <div class="card-desc">${s.desc}</div>
      <button class="card-btn" data-id="${s.id}">Run Skill</button>
    `;
    card.querySelector('button').addEventListener('click',()=>runSkill(s.id));
    grid.appendChild(card);
  });
}

// Filter buttons
const filterContainer=document.createElement('div');
filterContainer.style.cssText='display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;';
['all','sales','marketing','content','research','productivity','system'].forEach(domain=>{
  const btn=document.createElement('button');
  btn.textContent=domain;
  btn.style.cssText='padding:6px 14px;border:1px solid var(--border);background:var(--surface);color:var(--text-dim);border-radius:6px;cursor:pointer;font-size:12px;';
  btn.addEventListener('click',()=>{renderSkills(domain==='all'?'all':domain);});
  filterContainer.appendChild(btn);
});
document.querySelector('.main').insertBefore(filterContainer,document.querySelector('.grid'));

renderSkills();
log('Agentic OS dashboard loaded — 8 skills ready.');
