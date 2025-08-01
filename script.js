const materias = [
  { id: '01', nombre: "Teorías de la Administración", cuatri: "1º", correlativas: [] },
  { id: '02', nombre: "Cultura, Comunicación y Conflictos", cuatri: "1º", correlativas: [] },
  { id: '03', nombre: "Matemáticas y Estadística", cuatri: "1º", correlativas: [] },
  { id: '04', nombre: "Informática para Administradores", cuatri: "1º", correlativas: [] },
  { id: '05', nombre: "Introducción a la Problemática...", cuatri: "2º", correlativas: [] },
  { id: '06', nombre: "Instituciones de Derecho Privado", cuatri: "2º", correlativas: [] },
  { id: '07', nombre: "Contabilidad I", cuatri: "2º", correlativas: [] },
  { id: '08', nombre: "Análisis Matemático", cuatri: "3º", correlativas: ['03'] },
  { id: '09', nombre: "Cuestiones de Sociología, Economía y Política", cuatri: "3º", correlativas: [] },
  { id: '10', nombre: "Comercialización I", cuatri: "3º", correlativas: [] },
  { id: '11', nombre: "Sistemas Administrativos", cuatri: "4º", correlativas: ['01'] },
  { id: '12', nombre: "Administración de RRHH", cuatri: "4º", correlativas: ['01', '02'] },
  { id: '13', nombre: "Fundamentos de Economía", cuatri: "4º", correlativas: [] },
  { id: '36', nombre: "Problemas de Historia del Siglo XX", cuatri: "4º", correlativas: [] },
  { id: '14', nombre: "Administración Financiera I", cuatri: "5º", correlativas: ['08', '11', '13'] },
  { id: '15', nombre: "Comercialización II", cuatri: "5º", correlativas: ['10'] },
  { id: '16', nombre: "Macroeconomía y Política Económica", cuatri: "5º", correlativas: ['13'] },
  { id: '37', nombre: "Cultura Contemporánea", cuatri: "5º", correlativas: [] },
  { id: '17', nombre: "Fundamentos de Estrategia Organizacional", cuatri: "6º", correlativas: ['14', '15', '16'] },
  { id: '18', nombre: "Gestión de Operaciones", cuatri: "6º", correlativas: ['11', '14', '15'] },
  { id: '19', nombre: "Formulación y Evaluación de Proyectos", cuatri: "6º", correlativas: ['14', '16'] },
  { id: '34', nombre: "Taller y Trabajo Final Tecnicatura", cuatri: "6º", correlativas: ['14', '15', '16'] },
  { id: '20', nombre: "Administración General", cuatri: "7º", correlativas: ['08', '11', '13'] },
  { id: '21', nombre: "Álgebra Lineal", cuatri: "7º", correlativas: ['08'] },
  { id: '22', nombre: "Contabilidad II", cuatri: "7º", correlativas: ['07'] },
  { id: '23', nombre: "Microeconomía", cuatri: "7º", correlativas: ['13'] },
  { id: '24', nombre: "Administración Financiera II", cuatri: "8º", correlativas: ['19'] },
  { id: '25', nombre: "Administración de la Producción", cuatri: "8º", correlativas: ['20'] },
  { id: '26', nombre: "Estadística para Administradores", cuatri: "8º", correlativas: ['08'] },
  { id: '27', nombre: "Costos", cuatri: "8º", correlativas: ['22'] },
  { id: '28', nombre: "Sistemas de Información", cuatri: "9º", correlativas: ['24', '26'] },
  { id: '29', nombre: "Instituciones de Derecho Público", cuatri: "9º", correlativas: ['06'] },
  { id: '30', nombre: "Metodología de la Investigación", cuatri: "9º", correlativas: ['26'] },
  { id: '31', nombre: "Régimen Tributario", cuatri: "9º", correlativas: ['22'] },
  { id: '32', nombre: "Teoría de la Decisión y Cambio Organizacional", cuatri: "10º", correlativas: ['23', '28'] },
  { id: '33', nombre: "Dirección Estratégica", cuatri: "10º", correlativas: ['17', '23', '28'] },
  { id: '35', nombre: "Taller y Trabajo Final Licenciatura", cuatri: "10º", correlativas: ['17', '23', '28'] },
];

const container = document.querySelector(".grid");

materias.forEach((mat) => {
  const div = document.createElement("div");
  div.classList.add("materia");
  div.dataset.id = mat.id;
  div.dataset.correlativas = JSON.stringify(mat.correlativas);
  div.innerHTML = `<strong>${mat.nombre}</strong><div class="cuatrimestre">${mat.cuatri}</div>`;
  container.appendChild(div);
});

// Inicializa el estado de las materias (bloqueadas)
function actualizarEstadoMaterias() {
  document.querySelectorAll(".materia").forEach((div) => {
    const correlativas = JSON.parse(div.dataset.correlativas);
    const aprobadas = JSON.parse(localStorage.getItem("aprobadas") || "[]");
    const id = div.dataset.id;

    if (aprobadas.includes(id)) {
      div.classList.add("aprobada");
      div.classList.remove("bloqueada");
    } else if (correlativas.every(c => aprobadas.includes(c))) {
      div.classList.remove("bloqueada");
    } else {
      div.classList.add("bloqueada");
    }
  });
}

document.querySelectorAll(".grid").forEach(grid => {
  grid.addEventListener("click", function (e) {
    if (!e.target.closest(".materia")) return;
    const div = e.target.closest(".materia");
    const id = div.dataset.id;

    if (div.classList.contains("bloqueada")) return;

    let aprobadas = JSON.parse(localStorage.getItem("aprobadas") || "[]");

    if (aprobadas.includes(id)) {
      aprobadas = aprobadas.filter((m) => m !== id);
      div.classList.remove("aprobada");
    } else {
      aprobadas.push(id);
      div.classList.add("aprobada");
    }

    localStorage.setItem("aprobadas", JSON.stringify(aprobadas));
    actualizarEstadoMaterias();
  });
});

actualizarEstadoMaterias();
