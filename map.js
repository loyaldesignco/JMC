/**
 * Coordinates in PERCENT (0–100) relative to the map viewBox (1848 x 697).
 * x,y  = marker position
 * lx,ly = label anchor position (end of the elbow line, where the text sits)
 */
const locations = [
  { name: "SANS",                city: "Los Angeles, CA", x:  9.0, y: 78.0, lx:  6.5, ly: 89.0 },
  { name: "Spintech",            city: "Dayton, OH",      x: 41.0, y: 74.0, lx: 41.0, ly: 94.0 },
  { name: "Amerequip",           city: "Kiel, WI",        x: 33.0, y: 39.0, lx: 28.5, ly: 24.0 },
  { name: "Millrock Technology", city: "Kingston, NY",    x: 49.5, y: 45.0, lx: 53.5, ly: 28.0 },
  { name: "Leuko",               city: "Boston, MA",      x: 55.5, y: 42.0, lx: 61.5, ly: 33.0 },
  { name: "Ode à la Rose",       city: "New York, NY",    x: 53.0, y: 53.5, lx: 58.0, ly: 66.0 },
  { name: "ATT",                 city: "Paris, FR",       x: 75.5, y: 60.0, lx: 84.5, ly: 54.0 },
];

const VB_W = 1848;
const VB_H = 697;
const toX = p => (p / 100) * VB_W;
const toY = p => (p / 100) * VB_H;

const overlay = document.querySelector(".overlay");
const labels  = document.querySelector(".labels");

function elbowPath(x, y, lx, ly){
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute("d", `M ${x} ${y} L ${x} ${ly} L ${lx} ${ly}`);
  p.setAttribute("fill", "none");
  p.setAttribute("stroke", getComputedStyle(document.documentElement).getPropertyValue("--line").trim() || "#3f3f3f");
  p.setAttribute("stroke-width", "1");
  p.setAttribute("vector-effect", "non-scaling-stroke");
  return p;
}

function markerCircle(x, y){
  const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute("class", "marker");
  c.setAttribute("cx", x);
  c.setAttribute("cy", y);
  c.setAttribute("r", 8);
  return c;
}

function labelBlock(lxPct, lyPct, title, city){
  const el = document.createElement("div");
  el.className = "label";
  el.style.left = `${lxPct}%`;
  el.style.top  = `${lyPct}%`;
  el.innerHTML = `
    <div class="title">${title}</div>
    <div class="meta">${city}</div>
  `;
  return el;
}

locations.forEach(({ name, city, x, y, lx, ly }) => {
  const xV = toX(x), yV = toY(y);
  const lxV = toX(lx), lyV = toY(ly);

  overlay.appendChild(elbowPath(xV, yV, lxV, lyV));
  overlay.appendChild(markerCircle(xV, yV));
  labels.appendChild(labelBlock(lx, ly, name, city));
});
