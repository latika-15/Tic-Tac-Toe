

const res=document.getElementById('restartBtn');
const cell = document.getElementsByClassName('cell');
const board=document.querySelector('.board');  
const p1 = document.getElementById('img_pl1');
const p2 = document.getElementById('img_pl2');
// Initialize the game state
// let turn = 'O'; // O starts first
let turn ='O';
let total_turn=0; // to keep track of the number of turns taken
        
// cases for winning if these cells have same elements
        // 0,1,2
        // 3,4,5
        // 6,7,8
        // 0,3,6
        // 1,4,7
        // 2,5,8
        // 0,4,8
        // 2,4,6
let winner=[
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ]

let board_array = new Array(9).fill("A"); // array of 9 elements initialized to "A" says to empty cells
        //   0    1    2    3    4    5    6    7    8
        // ["A", "A", "A", "A", "A", "A", "A", "A", "A"]

function checkWinner() {
    // for(let i of winner){
    //     console.log(i);
    //     // check if all three cells in the winning combination are the same and not "A"
    // } this will give full 3 values together as it is 2d array


    // we will deconstruct the 2d array to get each index
    for(let [index0,index1,index2] of winner){
        if(board_array[index0]===board_array[index1] && board_array[index1]===board_array[index2] && board_array[index0]!=="A")
        return 1;
    }

}


const printer=(event)=>{
            const element=event.target;
            
            // if the cell is already taken, do nothing
            if(board_array[element.id]==='A'){
                total_turn++;
            //  for turn wise for O and X
            if(turn==='O')
        {
            element.innerHTML='<span style="color: #1e1327;">O</span>';
            // change the color of O to #0f191a
            board_array[element.id]='O';

           
            if(checkWinner()){
                document.getElementById('winningMessage').innerHTML = "Player O wins!";
                board.removeEventListener('click',printer);
                return; // exit the function if a player has won
            }
            turn='X';
            updateTurnVisuals();

        }
        else{
            element.innerHTML='<span style="color: #2e98a3;">X</span>';
            board_array[element.id]='X';
            if(checkWinner()){
                document.getElementById('winningMessage').innerHTML = "Player X wins!";
                board.removeEventListener('click',printer);
                return;
            }
            turn='O';
            updateTurnVisuals();

        }
        if(total_turn ===9){
            document.getElementById('winningMessage').innerHTML = "It's a draw!";
            board.removeEventListener('click',printer);
        }
    }
        }



// board.removeEventListener('click',callbackfunction)

board.addEventListener('click',printer);

 res.addEventListener('click', () => {
    turn = 'O';
    total_turn = 0; // reset the turn count
    document.getElementById('winningMessage').innerHTML = "";
    // reset the board_array to empty
    board_array = new Array(9).fill("A");

    Array.from(cell).forEach(value => {
      value.innerHTML = "";
    });
    board.addEventListener('click', printer);
    updateTurnVisuals();


  });



function updateTurnVisuals() {
    if (turn === 'O') {
        p1.classList.add('zoomed');
        p2.classList.remove('zoomed');
    } else {
        p2.classList.add('zoomed');
        p1.classList.remove('zoomed');
    }
}


updateTurnVisuals();
