const btnMostrar = document.getElementById("btnMostrar");
const btnLimpiar = document.getElementById("btnLimpiar");
const containerData = document.querySelector("#container__data");
const templateData = document.getElementById("templateData");
const fragment = document.createDocumentFragment();
const proGeneral = document.getElementById("proGeneral");

function cargarAjax() {
  const url = "/html/alumnos.json";

  axios
    .get(url)
    .then((res) => {
      mostrar(res.data);
    })
    .catch((reject) => {
      console.log("Surgio un error" + reject);
    });
}

function mostrar(data) {
  let pro = 0;
  for (let item of data) {
    const clone = templateData.content.cloneNode(true);
    clone.querySelector("#id").textContent = item.id;
    clone.querySelector("#matricula").textContent = item.matricula;
    clone.querySelector("#nombre").textContent = item.nombre;
    clone.querySelector("#matematicas").textContent = item.matematicas;
    clone.querySelector("#fisica").textContent = item.fisica;
    clone.querySelector("#quimica").textContent = item.quimica;
    clone.querySelector("#geografia").textContent = item.geografia;
    clone.querySelector("#promedio").textContent =
      (item.matematicas + item.fisica + item.quimica + item.geografia) / 4;
    pro += parseFloat(clone.querySelector("#promedio").textContent);
    fragment.appendChild(clone);
  }
  containerData.innerHTML = "";
  containerData.appendChild(fragment);
  const alumnos = Object.keys(data).length;
  proGeneral.innerHTML += (pro / alumnos).toFixed(2);
}

btnMostrar.addEventListener("click", cargarAjax);

btnLimpiar.addEventListener("click", () => {
  containerData.innerHTML = "";
  proGeneral.innerHTML = "Promedio General :";
});
