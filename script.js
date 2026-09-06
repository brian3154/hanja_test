const hanja = document.getElementById("hanja");
const button_next = document.getElementById("button_next");
const input_num = document.getElementById("input_num");
const button_start = document.getElementById("button_start");
const button_start_2 = document.getElementById("button_start_2");
const button_start_3 = document.getElementById("button_start_3")
const first_div = document.getElementById("first");
const main_div = document.getElementById("main");
const result_div = document.getElementById("result");
const result_display = document.getElementById("result_display");
const retry_btn = document.getElementById("retry_btn");
const music = new Audio('bgmplaylist.mp3');
const button_play = document.getElementById("playBtn");
const show_false_btn = document.getElementById("show_false_btn");
const false_hanja = document.getElementById("false_hanja");
let falseHanja = [];
let range = [];
let allData = [];
let answer_num = 0;
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
function newQuestion() {
  if (range.length === 0) {
    main_div.style.display = "none";
    result_div.style.display = "flex";
    result_display.textContent = `결과: [ ${answer_num} / ${value} ]`
    return;
  }
  num1 = rand(0, range.length - 1);
  num2 = range[num1];
  display_hanja = allData[num2].shape;
  hanja.textContent = display_hanja;
  range.splice(num1, 1);
};
function true_false(num) {
  let data_mean = allData[num].mean;
  let data_pronounce = allData[num].pronounce;
  let answer_mean = document.getElementById("mean").value;
  answer_mean = answer_mean.replace(/\s/g, ""); 
  let answer_pronounce = document.getElementById("pronounce").value;
  answer_pronounce = answer_pronounce.replace(/\s/g, ""); 
  if (data_mean === answer_mean && data_pronounce === answer_pronounce) {
    Swal.fire({
      title: "정답입니다!",
      icon: "success"
    });
    answer_num += 1;
  } else {
    Swal.fire({
      icon: "error",
      title: "오답입니다!",
      text: `정답은 ${data_mean} ${data_pronounce}입니다.`
    });
    falseHanja.push({
      "shape": allData[num].shape,
      "mean": [data_mean, answer_mean],
      "pronounce": [data_pronounce, answer_pronounce]
    })
  }
}
function reset_input() {
  document.getElementById("mean").value = "";
  document.getElementById("pronounce").value = "";
};
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
let boolll = true;
music.loop = true;
button_play.addEventListener('click', () => {
  if (boolll === true) {
    music.play();
    button_play.textContent = "🔊";
    boolll = false;
  } else {
    music.pause();
    button_play.textContent = "🔇";
    boolll = true;
  }
})
button_start.addEventListener('click', () => {
  value = Number(input_num.value);
  answer_num = 0;
});
button_start.addEventListener('click', () => {
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      allData = data;
      shuffle(allData);
      if (value > 0 && value <= allData.length) {
        range = Array.from({length: value}, (_, i) => i);
        range.sort(() => Math.random() - 0.5);
        range = range.slice(0, value);
        first_div.style.display = "none";
        main_div.style.display = "flex";
      } else {
        Swal.fire({
          icon: "error",
          title: "숫자를 자세히 보세요...",
          text: "숫자가 음수, 0, 혹은 총 한자 개수를 초과하면 진행이 안된답니다..?",
        });
        return;
      };
      newQuestion();
    });
});
button_start_2.addEventListener('click', () => {
  value = Number(input_num.value);
  answer_num = 0;
});
button_start_2.addEventListener('click', () => {
  fetch("data2.json")
    .then(res => res.json())
    .then(data => {
      allData = data;
      shuffle(allData);
      if (value > 0 && value <= allData.length) {
        range = Array.from({length: value}, (_, i) => i);
        range.sort(() => Math.random() - 0.5);
        range = range.slice(0, value);
        first_div.style.display = "none";
        main_div.style.display = "flex";
      } else {
        Swal.fire({
          icon: "error",
          title: "숫자를 자세히 보세요...",
          text: "숫자가 음수, 0, 혹은 총 한자 개수를 초과하면 진행이 안된답니다..?",
        });
        return;
      };
      newQuestion();
    });
});
button_start_3.addEventListener('click', () => {
  value = Number(input_num.value);
  answer_num = 0;
});
button_start_3.addEventListener('click', () => {
  fetch("data3.json")
    .then(res => res.json())
    .then(data => {
      allData = data;
      shuffle(allData);
      if (value > 0 && value <= allData.length) {
        range = Array.from({length: value}, (_, i) => i);
        range.sort(() => Math.random() - 0.5);
        range = range.slice(0, value);
        first_div.style.display = "none";
        main_div.style.display = "flex";
      } else {
        Swal.fire({
          icon: "error",
          title: "숫자를 자세히 보세요...",
          text: "숫자가 음수, 0, 혹은 총 한자 개수를 초과하면 진행이 안된답니다..?",
        });
        return;
      };
      newQuestion();
    });
});
button_next.addEventListener('click', () => {
  true_false(num2);
  newQuestion();
  reset_input();
});
retry_btn.addEventListener('click', () => {
  result_div.style.display = "none";
  first_div.style.display = "flex";
  document.getElementById("input_num").value = "";
  falseHanja = [];
  false_hanja.innerHTML = "";
  show_false_btn.disabled = false;
});
show_false_btn.addEventListener('click', () => {
  falseHanja.forEach(hanja => {
    const p = document.createElement("p");
    p.textContent = `${hanja.shape} : ${hanja.mean[1]} ${hanja.pronounce[1]} -> ${hanja.mean[0]} ${hanja.pronounce[0]}`;
    p.classList.add("word");
    false_hanja.appendChild(p);
  });
  show_false_btn.disabled = true;
})
