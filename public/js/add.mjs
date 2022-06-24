const form = document.querySelector("form");
const popUp = document.querySelector(".pop-up");

function popUpHandle(type) {
  if (type == "OK") {
    popUp.innerText = "Animal Saved!";
    popUp.style.background = "green";
    setTimeout(() => {
      popUp.style.top = "-80px";
    }, 5000);
    popUp.style.top = "20px";
  } else {
    popUp.innerText = "Something went wrong!";
    popUp.style.background = "red";
    setTimeout(() => {
      popUp.style.top = "-80px";
    }, 5000);
    popUp.style.top = "20px";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    name: `${e.target.name.value}`,
    emoji: `${e.target.emoji.value}`,
  };

  await fetch("/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((r) => {
      console.log(r);
      if (r.status == 200) {
        popUpHandle("OK");
      } else {
        popUpHandle();
      }
    })
    .catch((e) => {
      console.log(e);
      popUpHandle();
    });
});
