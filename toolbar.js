const container = document.querySelector(".container");

async function createToolBar() {
  const data = await (await fetch("./objectsList.json")).json();

  for (let i = 0; i < data.length; i++) {
    const div = document.createElement("div");
    const img = document.createElement("img");

    div.className = "item";
    img.src = `./textures/${data[i].img}`;
    img.title = data[i].name;

    div.appendChild(img);
    container.appendChild(div);
  }
}
createToolBar();
