/*
var power4 = [
	[1, 2, 3, 4, 5, 6, 7],
	[8, 9, 10, 11, 12, 13, 14],
	[15, 16, 17, 18, 19, 20, 21],
	[22, 23, 24, 25, 26, 27, 28],
	[29, 30, 31, 32, 33, 34, 35],
	[36, 37, 38, 39, 40, 41, 42]
];

____________________________________
|    |    |    |    |    |    |    |
|  1 |  2 |  3 |  4 |  5 |  6 |  7 |
|____|____|____|____|____|____|____|
|    |    |    |    |    |    |    |
|  8 |  9 | 10 | 11 | 12 | 13 | 14 |
|____|____|____|____|____|____|____|
|    |    |    |    |    |    |    |
| 15 | 16 | 17 | 18 | 19 | 20 | 21 |
|____|____|____|____|____|____|____|
|    |    |    |    |    |    |    |
| 22 | 23 | 24 | 25 | 26 | 27 | 28 |
|____|____|____|____|____|____|____|
|    |    |    |    |    |    |    |
| 29 | 30 | 31 | 32 | 33 | 34 | 35 |
|____|____|____|____|____|____|____|
|    |    |    |    |    |    |    |
| 36 | 37 | 38 | 39 | 40 | 41 | 42 |
|____|____|____|____|____|____|____|

console.log(power4[0][0]);
// => 1
console.log(power4[5][6]);
// => 42

// 1
document.getElementById('power4').children[0].children[0].innerHTML = 1;
// 42
document.getElementById('power4').children[5].children[6].innerHTML = 42;
*/
var power4 = [[],[],[],[],[],[]];
var gravity = [5,5,5,5,5,5,5];
var turn = 'J';
var win = false;
var nbturn = 0;

function play(x) {
	if (gravity[x] >= 0 && win === false) {
		power4[gravity[x]][x] = turn;
		document.getElementById('power4').children[gravity[x]].children[x].children[0].classList.add(turn == 'J' ? 'yellow' : 'red');
		if (turn == 'J') {
			turn = 'R';
			document.getElementById('infos').children[0].innerHTML = 'Au tour de Rouge';
		}
		else {
			turn = 'J';
			document.getElementById('infos').children[0].innerHTML = 'Au tour de Jaune';
		}
		nbturn++;
		is_win(x, gravity[x]);
		gravity[x]--;
	}
}

function autoFill() {
	for (var y = 0; y <= 5; y++) {
		for (var x = 0; x <= 6; x++) {
				if (gravity[x] >= 0 && win === false) {
				power4[gravity[x]][x] = turn;
				document.getElementById('power4').children[gravity[x]].children[x].children[0].classList.add(turn == 'J' ? 'yellow' : 'red');
				var random = Math.floor(Math.random() * 2);
				if (random == 1) {
					turn = 'R';
					document.getElementById('infos').children[0].innerHTML = 'Au tour de Rouge';
				}
				else {
					turn = 'J';
					document.getElementById('infos').children[0].innerHTML = 'Au tour de Jaune';
				}
				nbturn++;
				is_win(x, gravity[x]);
				gravity[x]--;
			}
		}
	}
}

function restart() {
	power4 = [[],[],[],[],[],[]];
	gravity = [5,5,5,5,5,5,5];
	turn = 'J';
	win = false;
	nbturn=0;
	for (var y = 0; y <= 5; y++) {
		for (var x = 0; x <= 6; x++) {
			document.getElementById('power4').children[y].children[x].children[0].classList.remove('yellow');
			document.getElementById('power4').children[y].children[x].children[0].classList.remove('red');
		}
	}
	document.getElementById('infos').children[0].innerHTML = 'Au tour de Jaune';
}
// Fonction de vérification de victoire
function is_win(x, y) {
	var countL = 0;
	var countC =0;
	var countD = 0;
	var countD2=0;
	var pion= power4[y][x];
	var i = 0;
	// Fonction colone
	for(i = 1; i<= 3; i++){
			if (y-i >= 0) {
					if (power4[y-i][x] === pion){
							countL++;
					}
			}
			if (y+i <= 5) {
				if (power4[y+i][x] === pion){
					countL++;
				}

			}

			if (countL>=3) {
					win=pion;
					break;
			}
	} // Fonction ligne
	for(i = 1; i<= 3; i++){
			if (x-i >= 0) {
					if (power4[y][x-i] === pion){
							countC++;
					}
			}
			if (x+i <= 6) {
				if (power4[y][x+i] === pion){
					countC++;
				}

			}

			if (countC>=3) {
					win = pion;
					break;
			}
	}

	// Fonction diagonale montante
	for (i = 1; i<= 3; i++){
			if (y-i >= 0 && x+i >=0) {
					if (power4[y-i][x+i] === pion){
							countD++;
					}
			}
			if (y+i <= 5 && x-i<=6) {
				if (power4[y+i][x-i] === pion){
					countD++;
				}

			}

			if (countD>=3) {
					win= pion;
					break;
			}
	}
	// Fonction diagonale decendante

	for (i = 1; i<= 3; i++){
			if (y-i >= 0 && x-i >=0) {
				if (power4[y-i][x-i] === pion){
							countD2++;
					}
			}
			if (y+i <= 5 && x+i<=6) {
				if (power4[y+i][x+i] === pion){
					countD2++;
				}

			}

			if (countD2>=3) {
					win=pion;
					break;
			}
	}

	// ------

	if (nbturn === 42) {
		win = 'null';
	}
	if (win == 'null') {
		document.getElementById('infos').children[0].innerHTML = 'Match nul';
	}
	else if (win !== false) {
		document.getElementById('infos').children[0].innerHTML = win + ' à gagné';
	}
}

/*


*/
