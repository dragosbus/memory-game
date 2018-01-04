//When the game starts every cell should have a number like text content
//There should be 2 cells which have the same number
//If the player match 2 cells the numbers should remain showed,otherwise hide the numbers
//When the player find all matching cells show to the player that he wins in the time nedded

(function () {

  var data = {
    numbers: [1, 1, 2, 2, 3, 3, 4, 4, 5],
    choose: [],
    counter: 0,
    timer: 0
  };

  var controller = {
    getRandomNumber(range) {
      return Math.floor(Math.random() * range);
    },

    getNumbers() {
      return data.numbers;
    },

    addChoose(obj) {
      data.choose.push(obj);
    },

    checkChooses() {
      return data.choose[0].textContent === data.choose[1].textContent;
    },

    incrementCounter() {
      data.counter++;
    },

    checkWinning() {
      if (data.counter === 4) {
        return true;
      }
      return false;
    },

    incrementTimer() {
      return ++data.timer;
    },

    getTimer() {
      return data.timer;
    },

    getChooses() {
      return data.choose;
    }
  };

  var view = {
    init() {
      this.cels = document.querySelectorAll('.cell');
      this.timerDOM = document.querySelector('.timer');
      this.reset = document.querySelector('.reset');
      this.arrayOfNumbers = controller.getNumbers();

      //reset event
      this.reset.addEventListener('click', () => {
        window.location.reload();
      });

      this.render();
    },

    render() {
      document.addEventListener('DOMContentLoaded', () => {

        this.cels.forEach(cell => {
          var thisText = cell.querySelector('.text');
          //for every iteration get a random number
          var number = this.arrayOfNumbers[controller.getRandomNumber(this.arrayOfNumbers.length - 1)];
          thisText.textContent = number;
          //Delete current number after was added to DOM
          this.arrayOfNumbers.splice(this.arrayOfNumbers.indexOf(number), 1);
          //Hide all numbers on DOM
          thisText.style.opacity = '0';
        }); //end forEach
      }); //end DOMContentLoaded event

      //Iterate through all cels and add event
      for (let i = 0; i < this.cels.length; i++) {
        var thisCell = this.cels[i];
        thisCell.addEventListener('click', function () {
          //when the cell is clicked,show the number and hide it after 0.4s
          this.firstElementChild.style.opacity = '1';

          var hideThis = setTimeout(() => {
            this.firstElementChild.style.opacity = '0';
          }, 400);
          //keep track for cell clicked
          controller.addChoose(this.firstElementChild);
          //check if choses array has 2 elements
          if (controller.getChooses().length >= 2) {
            //clear hiding
            clearTimeout(hideThis);
            //check if numbers from 2 cells from chooses array are the same
            if (controller.checkChooses()) {
              //add class found for pairs founded
              controller.getChooses()[0].parentNode.classList.add('found');
              controller.getChooses()[1].parentNode.classList.add('found');
              //if numbers match increment Counter
              controller.incrementCounter();
              //show the numbers
              view.hideOrShow('1');
              //check if player won the game
              if (controller.checkWinning()) {
                //stop the timer and alert the player
                clearInterval(view.timer);
                alert(`You won in ${controller.getTimer()} seconds`);
              }
            } else {
              //if pairs dosnt match hide the numbers
              setTimeout(() => {
                view.hideOrShow('0');
              }, 500);
            }
          } //end if condition for checking the length of chooses
        }); //end event listener
      } //end for

      this.timerHandler();
    },
    //hide or show number handler
    hideOrShow(state) {
      controller.getChooses()[0].style.opacity = state;
      controller.getChooses()[1].style.opacity = state;
      //empty the chooses array when has 2 elements inside
      controller.getChooses().splice(0);
    },

    timerHandler() {
      this.timer = setInterval(() => {
        view.timerDOM.textContent = controller.incrementTimer();
      }, 1000);

    }

  };
  view.init();
}());