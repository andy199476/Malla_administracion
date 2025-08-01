const materias = [
  // Ejemplo de materias (agregá todas las que ya tenés)
  { id: "01", nombre: "Teorías de la Administración", cuatrimestre: 1, correlativas: [] },
  { id: "02", nombre: "Cultura, Comunicación y Conflictos en las Organizaciones", cuatrimestre: 1, correlativas: [] },
  { id: "07", nombre: "Contabilidad I", cuatrimestre: 2, correlativas: [] },
  { id: "22", nombre: "Contabilidad II", cuatrimestre: 7, correlativas: ["07"] },
  // ... seguí con todas las demás
];

// Agrupar materias por cuatrimestre
const cuatrimestres = {};
materias.forEach(m => {
  if (!cuatrimestres[m.cuatrimestre]) cuatrimestres[m.cuatrimestre] = [];
  cuatrimestres[m.cuatrimestre].push(m);
});

const aprobadas = JSON.parse(localStorage.getItem("aprobadas")) || [];

function guardarAprobadas() {
  localStorage.setItem("aprobadas", JSON.stringify(aprobadas));
}

function puedeDesbloquear(materia) {
  return materia.correlativas.every(id => aprobadas.includes(id));
}

function renderMalla() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  Object.keys(cuatrimestres).sort((a, b) => a - b).forEach(n => {
    const col = document.createElement("div");
    col.className = "columna-cuatrimestre";
    col.innerHTML = `<h2>${n}º Cuatrimestre</h2>`;

    cuatrimestres[n].forEach(m => {
      const div = document.createElement("div");
      div.className = "materia";
      div.textContent = m.nombre;

      if (aprobadas.includes(m.id)) {
        div.classList.add("aprobada");
      } else if (!puedeDesbloquear(m)) {
        div.classList.add("bloqueada");
      }

      div.addEventListener("click", () => {
        if (!puedeDesbloquear(m)) return;

        if (aprobadas.includes(m.id)) {
          aprobadas.splice(aprobadas.indexOf(m.id), 1);
        } else {
          aprobadas.push(m.id);
        }

        guardarAprobadas();
        renderMalla();
      });

      col.appendChild(div);
    });

    malla.appendChild(col);
  });
}

renderMalla();
