const d = document;

const deg = 6,
  $hr = d.querySelector("#hr"),
  $mn = d.querySelector("#mn"),
  $sc = d.querySelector("#sc");

function digitalClock(clock) {
  let clockTempo;
  clockTempo = setInterval(() => {
    let clockHour = new Date().toLocaleTimeString();
    d.querySelector(clock).innerHTML = `<h3>${clockHour}</h3>`;
  });
}

function toggleClass() {
  const $body = d.querySelector("body"),
    $btnDark = d.querySelector(".toggleClass");

  $btnDark.addEventListener("click", (e) => {
    $body.classList.toggle("light");
  });
}

setInterval(() => {
  let day = new Date(),
    hh = day.getHours() * 30,
    mm = day.getMinutes() * deg,
    ss = (day.getTime() / 1000) * deg;

  hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;

  mn.style.transform = `rotateZ(${mm}deg)`;

  sc.style.transform = `rotateZ(${ss}deg)`;
});

digitalClock("#reloj");
toggleClass();
