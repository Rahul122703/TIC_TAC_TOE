///http://127.0.0.1:5500/tic_tac_toc/index.html
let turn = 1;
let dark_mode_const = 1;
let is_single_match;
let winning_cells;
let is_dark_mode = false;

let cells = document.querySelectorAll(".cell");
const msg = document.querySelector(".msg_container");

const modal = document.querySelector(".modal");
const single_button = document.querySelector(".single");
const two_button = document.querySelector(".two");
const reset = document.querySelector(".reset");
const dark_button = document.querySelector(".dark_mode");

dark_button.addEventListener("click", () => {
  is_dark_mode = dark_mode_const++ % 2 ? true : false;
  modal.classList.toggle("modal_dark");
  reset.classList.toggle("reset_dark");
  cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.classList.toggle("cell_dark");
  });
  document.querySelector(".body_tag").classList.toggle("body_dark");
  msg.classList.toggle("msg_container_dark");

  const image = document.querySelector(".dark_image");
  image.src = `$d{is_dark_mode ? "./sun.svg" : "./moon.svg"}`;
});

reset.addEventListener("click", () => {
  //123
  // location.reload();
  cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    console.log("here");
    cell.textContent = "";
    modal.style.display = "flex";
    msg.textContent = "TIC TAC TOE";
    cell.classList.remove("cell_hover");
  });
  cellEvents();
});
function check_win() {
  const winning_conditions = [
    [
      [
        cells[0].textContent === cells[1].textContent &&
          cells[1].textContent === cells[2].textContent &&
          cells[1].textContent.length != 0,
      ],
      [cells[0], cells[1], cells[2]],
    ],

    [
      [
        cells[3].textContent === cells[4].textContent &&
          cells[4].textContent === cells[5].textContent &&
          cells[4].textContent.length != 0,
      ],
      [cells[3], cells[4], cells[5]],
    ],

    [
      [
        cells[6].textContent === cells[7].textContent &&
          cells[7].textContent === cells[8].textContent &&
          cells[7].textContent.length != 0,
      ],
      [cells[6], cells[7], cells[8]],
    ],

    [
      [
        cells[0].textContent === cells[3].textContent &&
          cells[3].textContent === cells[6].textContent &&
          cells[3].textContent.length != 0,
      ],
      [cells[0], cells[3], cells[6]],
    ],

    [
      [
        cells[1].textContent === cells[4].textContent &&
          cells[4].textContent === cells[7].textContent &&
          cells[4].textContent.length != 0,
      ],
      [cells[1], cells[4], cells[7]],
    ],

    [
      [
        cells[2].textContent === cells[5].textContent &&
          cells[5].textContent === cells[8].textContent &&
          cells[5].textContent.length != 0,
      ],
      [cells[2], cells[5], cells[8]],
    ],

    [
      [
        cells[0].textContent === cells[4].textContent &&
          cells[4].textContent === cells[8].textContent &&
          cells[4].textContent.length != 0,
      ],
      [cells[0], cells[4], cells[8]],
    ],

    [
      [
        cells[2].textContent === cells[4].textContent &&
          cells[4].textContent === cells[6].textContent &&
          cells[4].textContent.length != 0,
      ],
      [cells[2], cells[4], cells[6]],
    ],
  ];
  let draw = 0;
  cells.forEach((cell) => {
    if (cell.textContent == "X" || cell.textContent == "o") {
      draw++;
    }
  });
  if (draw == 9) {
    msg.textContent = "DRAW";
    reset.style.display = "flex";
  }
  winning_conditions.forEach((condition) => {
    if (condition[0][0]) {
      reset.style.display = "flex";
      winning_cells = condition[1];
      condition[1].forEach((currentItem) => {
        currentItem.classList.add("cell_hover");
      });
      msg.textContent =
        condition[1][0].textContent == "X" ? "X WINS!!" : `o WINS!!`;
      cells.forEach((cell) => {
        cell.replaceWith(cell.cloneNode(true));
      });
    }
  });
}

single_button.addEventListener("click", () => {
  modal.style.display = "none";
  msg.textContent = "Your Turn";
  is_single_match = true;
});

two_button.addEventListener("click", () => {
  modal.style.display = "none";
  msg.textContent = "X's Turn";
});

msg.style.width = `${
  document.querySelector(".grid_container").getBoundingClientRect().width
}px`;

function getRandomNumber(array) {
  return Math.floor(Math.random() * array.length);
}
function cellEvents() {
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      let occ = 1;
      if (cell.textContent == "X" || cell.textContent == "o") {
        occ = 0;
        const temp_text = msg.textContent;
        msg.textContent = `OCCUPIED`;
        setTimeout(() => {
          msg.textContent = temp_text;
        }, 500);
      } else if (turn++ % 2) {
        occ = 1;
        cell.textContent = "X";
        msg.textContent = `o's Turn`;
      } else {
        cell.textContent = "o";
        msg.textContent = `X's Turn`;
      }
      const options = [...cells].filter((cell) => {
        if (!(cell.textContent == "X" || cell.textContent == "o")) {
          return cell;
        }
      });
      if (is_single_match && options.length > 0 && occ) {
        msg.textContent = `BOT's TURN`;
        occ = 1;
        turn--;
        const chosen = options[Math.floor(Math.random() * options.length)];
        setTimeout(() => {
          chosen.textContent = "o";
          msg.textContent = `Your Turn`;
        }, 500);
        check_win();
      }
      check_win();
    });
  });
}
cellEvents();
