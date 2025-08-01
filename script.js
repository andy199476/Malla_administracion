const materias = [
  // 1er Cuatrimestre
  { id: "01", nombre: "Teorías de la Administración", cuatrimestre: 1, correlativas: [] },
  { id: "02", nombre: "Cultura, Comunicación y Conflictos en las Organizaciones", cuatrimestre: 1, correlativas: [] },
  { id: "03", nombre: "Elementos de Matemáticas y Estadística", cuatrimestre: 1, correlativas: [] },
  { id: "04", nombre: "Informática para Administradores", cuatrimestre: 1, correlativas: [] },

  // 2do Cuatrimestre
  { id: "05", nombre: "Sistema Financiero en la Economía", cuatrimestre: 2, correlativas: [] },
  { id: "06", nombre: "Instituciones de Derecho Privado", cuatrimestre: 2, correlativas: [] },
  { id: "07", nombre: "Contabilidad I", cuatrimestre: 2, correlativas: [] },

  // 3er Cuatrimestre
  { id: "08", nombre: "Análisis Matemático", cuatrimestre: 3, correlativas: ["03"] },
  { id: "09", nombre: "Seminario de Gestión Bancaria I", cuatrimestre: 3, correlativas: ["05"] },
  { id: "10", nombre: "Comercialización I", cuatrimestre: 3, correlativas: [] },

  // 4to Cuatrimestre
  { id: "11", nombre: "Sistemas Administrativos", cuatrimestre: 4, correlativas: ["01"] },
  { id: "12", nombre: "Administración de Recursos Humanos", cuatrimestre: 4, correlativas: ["01", "02"] },
  { id: "13", nombre: "Fundamentos de Economía", cuatrimestre: 4, correlativas: [] },
  { id: "36", nombre: "Problemas de Historia del Siglo XX", cuatrimestre: 4, correlativas: [] },

  // 5to Cuatrimestre
  { id: "14", nombre: "Administración Financiera I", cuatrimestre: 5, correlativas: ["08", "11", "13"] },
  { id: "15", nombre: "Comercialización II", cuatrimestre: 5, correlativas: ["10"] },
  { id: "16", nombre: "Macroeconomía y Política Económica", cuatrimestre: 5, correlativas: ["13"] },
  { id: "37", nombre: "Cultura Contemporánea", cuatrimestre: 5, correlativas: [] },

  // 6to Cuatrimestre
  { id: "17", nombre: "Fundamentos de Estrategia Organizacional", cuatrimestre: 6, correlativas: ["14", "15", "16"] },
  { id: "18", nombre: "Seminario de Gestión Bancaria II", cuatrimestre: 6, correlativas: ["09"] },
  { id: "19", nombre: "Formulación y Evaluación de Proyectos", cuatrimestre: 6, correlativas: ["14", "16"] },
  { id: "34", nombre: "Taller y Trabajo Final de Tecnicatura", cuatrimestre: 6, correlativas: ["14", "15", "16"] },

  // 7mo Cuatrimestre (Licenciatura)
  { id: "20", nombre: "Administración General", cuatrimestre: 7, correlativas: ["08", "11", "13"] },
  { id: "21", nombre: "Álgebra Lineal", cuatrimestre: 7, correlativas: ["08"] },
  { id: "22", nombre: "Contabilidad II", cuatrimestre: 7, correlativas: ["07"] },
  { id: "23", nombre: "Microeconomía", cuatrimestre: 7, correlativas: ["13"] },

  // 8vo Cuatrimestre
  { id: "24", nombre: "Administración Financiera II", cuatrimestre: 8, correlativas: ["19"] },
  { id: "25", nombre: "Administración de la Producción", cuatrimestre: 8, correlativas: ["20"] },
  { id: "26", nombre: "Estadística para Administradores", cuatrimestre: 8, correlativas: ["08"] },
  { id: "27", nombre: "Costos", cuatrimestre: 8, correlativas: ["22"] },

  // 9no Cuatrimestre
  { id: "28", nombre: "Sistemas de Información", cuatrimestre: 9, correlativas: ["24", "26"] },
  { id: "29", nombre: "Instituciones de Derecho Público", cuatrimestre: 9, correlativas: ["06"] },
  { id: "30", nombre: "Metodología de la Investigación", cuatrimestre: 9, correlativas: ["26"] },
  { id: "31", nombre: "Régimen Tributario", cuatrimestre: 9, correlativas: ["22"] },

  // 10mo Cuatrimestre
  { id: "32", nombre: "Teoría de la Decisión y Cambio Organizacional", cuatrimestre: 10, correlativas: ["23", "28"] },
  { id: "33", nombre: "Dirección Estratégica", cuatrimestre: 10, correlativas: ["17", "23", "28"] },
  { id: "35", nombre: "Taller y Trabajo Final de Licenciatura", cuatrimestre: 10, correlativas: ["17", "23", "28"] }
];

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
