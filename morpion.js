
/*
var morpion = [
	['A', 'B', 'C'],
	['D', 'E', 'F'],
	['G', 'H', 'I']
];

_____________
|   |   |   |
| A | B | C |
|___|___|___|
|   |   |   |
| D | E | F |
|___|___|___|
|   |   |   |
| G | H | I |
|___|___|___|

console.log(morpion[0][0]);
// => A
console.log(morpion[2][2]);
// => I

// A
document.getElementById('morpion').children[0].children[0].innerHTML = 'X';
// I
document.getElementById('morpion').children[2].children[2].innerHTML = 'X';
*/
var morpion = [[],[],[]];
var turn = 'X';
var win = false;



function play(x, y) {
	if (!morpion[y][x] && win === false) {
		morpion[y][x] = turn;
		document.getElementById('morpion').children[y].children[x].innerHTML = turn;
		if (turn == 'X') {
			turn = 'O';
			document.getElementById('infos').children[0].innerHTML = 'Au tour de O';
		}
		else if (turn=='O') {
			turn = 'X';
			document.getElementById('infos').children[0].innerHTML = 'Au tour de X';
		}
		is_win();
	}
}

function restart() {
	morpion = [[],[],[]];
	turn = 'X';
	win = false;
	for (var x = 0; x <= 2; x++) {
		for (var y = 0; y <= 2; y++) {
			document.getElementById('morpion').children[y].children[x].innerHTML = '';
		}
	}
	document.getElementById('infos').children[0].innerHTML = 'Au tour de X';
}

// Fonction de vérification de victoire
function is_win() {
			if (morpion[0][0] === morpion[0][1] && morpion[0][0] === morpion[0][2] ){
				win= true;
	}
	if (win !== false && turn === 'O') {
		document.getElementById('infos').children[0].innerHTML = ' X à gagné';
		}
	}

