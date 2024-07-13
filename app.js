///http://127.0.0.1:5500/tic_tac_toe/index.html

const cells = document.querySelectorAll(".cell");
const msg = document.querySelector(".msg_container");

const modal = document.querySelector(".modal");
const single_button = document.querySelector(".single");
const two_button = document.querySelector(".two");

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
    if (cell.textContent == "X" || cell.textContent == "0") {
      draw++;
    }
  });
  if (draw == 9) {
    msg.textContent = "DRAW";
  }
  winning_conditions.forEach((condition) => {
    if (condition[0][0]) {
      condition[1].forEach((currentItem) => {
        currentItem.classList.add("shadow");
        currentItem.style.transform = "scale(1.1)";
      });
      msg.textContent =
        condition[1][0].textContent == "X" ? "X WINS!!" : `0 WINS!!`;
      cells.forEach((cell) => {
        cell.replaceWith(cell.cloneNode(true));
      });
    }
  });
}

let turn = 1;
let is_single_match;

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

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.textContent == "X" || cell.textContent == "0") {
      const temp_text = msg.textContent;
      msg.textContent = `OCCUPIED`;
      setTimeout(() => {
        msg.textContent = temp_text;
      }, 500);
    } else if (turn++ % 2) {
      cell.textContent = "X";
      msg.textContent = `0's Turn`;
    } else {
      cell.textContent = "0";
      msg.textContent = `X's Turn`;
    }
    const options = [...cells].filter((cell) => {
      if (!(cell.textContent == "X" || cell.textContent == "0")) {
        return cell;
      }
    });
    console.log(options);
    if (is_single_match && options.length > 0) {
      turn--;
      const chosen = options[Math.floor(Math.random() * options.length)];
      console.log(chosen);
      chosen.textContent = "0";
      msg.textContent = `Your Turn`;
      check_win();
    }
    check_win();
  });
});
