const PROJECTS=[
{t:"PEB Steel Hangar",i:"peb",d:"Manually detailed every element and connection of a pre-engineered building to optimize fabrication.",c:"Detailing",s:"Tekla Structures",n:24},
{t:"Steel Truss Hangar",i:"truss",d:"Full model of a truss-roof hangar with columns, base plates and bracing.",c:"Detailing",s:"Tekla Structures",n:20},
{t:"Steel Building with Crane & Mezzanine",i:"crane",d:"Structural framing, overhead crane support system and a mezzanine floor.",c:"Detailing",s:"Tekla Structures",n:34},
{t:"Billboard & Car Shed",i:"bill",d:"Detailed models of a billboard structure and a vehicle shelter.",c:"Detailing",s:"Tekla Structures"},
{t:"Steel Design to AISC 360",d:"Design of a truss structure, a portal frame and a steel billboard.",c:"Design",s:"SAP2000 · AISC 360"},
{t:"Tree-Inspired Space Truss Canopy",i:"canopy",d:"A conceptual parametric canopy on tree-shaped columns, exploring structural efficiency and architecture.",c:"Concept",s:"Rhino · Grasshopper"}
// add a link: url:"https://..."
];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;");
function render(f){let i=0;$("#projects").innerHTML=PROJECTS.filter(p=>f==="All"||p.c===f).map(p=>`<div class="card">${p.i?`<img class="im" src="${IMGS[p.i]}" alt="${esc(p.t)}" loading="lazy">`:`<div class="im ph">${esc(p.s)}</div>`}<div class="h"><span>${esc(p.c)}</span><span>${p.n?p.n+" sheets":"Model"}</span></div><div class="b"><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p></div><div class="f"><span>${esc(p.s)}</span>${p.url?`<a href="${p.url}" target="_blank" rel="noopener">Open</a>`:""}</div></div>`).join("")}
$("#fl").innerHTML=["All",...new Set(PROJECTS.map(p=>p.c))].map((c,i)=>`<button class="${i?"":"on"}">${c}</button>`).join("");
$("#fl").onclick=e=>{const b=e.target.closest("button");if(!b)return;$$("#fl button").forEach(x=>x.classList.toggle("on",x===b));render(b.textContent)};render("All");
// animated truss drawing
(function(){const s=$("#truss"),N=10,x0=30,W=840,dx=W/N,yt=30,yb=120;let h="",d=0;const P=(a,c,e,f)=>{h+=`<path pathLength="1" d="M${a} ${c}L${e} ${f}" style="animation-delay:${(d+=.07).toFixed(2)}s"/>`};
P(x0,yb,x0+W,yb);P(x0,yt,x0+W,yt);
for(let i=0;i<=N;i++){const x=x0+i*dx;P(x,yt,x,yb);if(i<N){i<N/2?P(x,yb,x+dx,yt):P(x,yt,x+dx,yb)}}
for(let i=0;i<=N;i++){const x=x0+i*dx;h+=`<circle class="n" cx="${x}" cy="${yb}" r="5" style="animation-delay:${1.2+i*.08}s"/>`}
h+=`<path class="dm" d="M${x0} 150H${x0+W}M${x0} 142V158M${x0+W} 142V158"/><text x="${x0+W/2}" y="146" text-anchor="middle">24 000</text>`;
s.innerHTML=h})();
// active nav + typing + theme
const L=$$("nav a[href^='#']"),S=L.map(a=>$(a.getAttribute("href")));
addEventListener("scroll",()=>{let c=-1;S.forEach((s,i)=>{if(s.getBoundingClientRect().top<innerHeight*.4)c=i});L.forEach((a,i)=>a.classList.toggle("on",i===c))},{passive:true});
const roles=["Structural Steel Detailer","Tekla Structures Modeler","Steel Design Engineer"],el=$("#role");let r=0,c=roles[0].length,del=true;
if(!matchMedia("(prefers-reduced-motion:reduce)").matches)(function k(){el.textContent=roles[r].slice(0,c);if(del){if(--c<0){del=false;r=(r+1)%roles.length;c=0}}else if(++c>roles[r].length){del=true;c=roles[r].length;return setTimeout(k,1700)}setTimeout(k,del?35:70)})();
const root=document.documentElement;try{const t=localStorage.getItem("theme");if(t)root.dataset.theme=t}catch(e){}
$("#th").onclick=()=>{const d=root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;root.dataset.theme=d?"light":"dark";try{localStorage.setItem("theme",root.dataset.theme)}catch(e){}};
