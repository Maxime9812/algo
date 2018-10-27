var minesweeper = [[],[],[],[],[],[],[],[],[],[]];
var flags = [[],[],[],[],[],[],[],[],[],[]];
var conf = [16, 24, 36];
var flag = false;
var mines = -1;
var win = false;
// Si debug == true, on affiche les mines de la grille lors de la génération des mines
var debug = true;
var count=0;
var clique= 0;

// Méthode pour gerer les évènements clavier.
document.addEventListener('keydown', (event) => {
	if (event.keyCode == 70) {
		toggleFlag(event.keyCode);
	}
	if (event.keyCode == 68) {
		toggleDebug(event.keyCode);
	}
});
// Ne rien modifier au dessus de ce commentaire

// Fonction pour créer automatiquement les mines sur une nouvelle grille
// Ne pas modifier cette fonction
function setGrille(difficulty) {
	restart()
	clique=0;
	mines = 0;
	for (var x = 0; x < 16; x++) {
		for (var y = 0; y < 10; y++) {
			var random = Math.floor(Math.random() * 101);
			if (random <= conf[difficulty]) {
				minesweeper[y][x] = 'M';
				if (debug == true) {
					document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('mine');
				}
				mines++;
			}
		}
	}
	document.getElementById('infos').children[0].innerHTML = 'Il reste ' + mines + ' mine' + (mines > 1 ? 's' : '');
}

// Fonction pour vérifier si les drapeaux ont été posés corretement
// Ne pas modifier cette fonction
function verify() {
	for (var x = 0; x < 16; x++) {
		for (var y = 0; y < 10; y++) {
			if (flags[y][x] == 1 && minesweeper[y][x] != 'M') {
				document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('flag');
				if (minesweeper[y][x] != 'E' && minesweeper[y][x] != undefined) {
					document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('m' + minesweeper[y][x]);
					document.getElementById('minesweeper').children[y].children[x].children[0].innerHTML = minesweeper[y][x];
				}
				document.getElementById('minesweeper').children[y].children[x].classList.add('explose');
			} else if (minesweeper[y][x] == 'M') {
				document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('mine');
			}
		}
	}
	completerGrille();
}

// Fonction pour dessiner automatiquement la grille
// Ne pas modifier cette fonction
function dessinerGrille() {
	for (var x = 0; x < 16; x++) {
		for (var y = 0; y < 10; y++) {
			if (win == false) {
				document.getElementById('minesweeper').children[y].children[x].classList.add('clicked');
			}
			if (minesweeper[y][x] == 'M') {
				document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('mine');
			} else if (minesweeper[y][x] != 'E' && minesweeper[y][x] != undefined) {
				document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('m' + minesweeper[y][x]);
				document.getElementById('minesweeper').children[y].children[x].children[0].innerHTML = minesweeper[y][x];
			}
		}
	}
	/*if (win == false) {
		win = true;
		is_win();
	}*/
}

// Fonction action/désactivation du mode Debug
function toggleDebug(event) { 
	if (debug == true) {
		debug = false;
		document.getElementById('cogs').children[0].classList.remove('toggleOn');
		document.getElementById('cogs').children[0].classList.add('toggleOff');
		if (win == false) {
			var items = document.querySelectorAll('.mine');
			for (let item of items) {
				item.classList.remove('mine');
			}
		}
	} else {
		debug = true;
		document.getElementById('cogs').children[0].classList.remove('toggleOff');
		document.getElementById('cogs').children[0].classList.add('toggleOn');
		for (var x = 0; x < 16; x++) {
			for (var y = 0; y < 10; y++) {
				if (minesweeper[y][x] == 'M') {
					document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('mine');
				}
			}
		}
	}
}

// Fonction action/désactivation du mode Drapeau
function toggleFlag(event) {
	if (flag == true) {
		flag = false;
		document.getElementById('flag').children[0].classList.remove('toggleOn');
		document.getElementById('flag').children[0].classList.add('toggleOff');
	} else {
		flag = true;
		document.getElementById('flag').children[0].classList.remove('toggleOff');
		document.getElementById('flag').children[0].classList.add('toggleOn');
	}
}

// Fonction pour recommencer
// Ne pas modifier cette fonction
function restart() {
	completerGrille(x,y);
	minesweeper = [[],[],[],[],[],[],[],[],[],[]];
	flags = [[],[],[],[],[],[],[],[],[],[]];
	mines = -1;
	win = false;
	clique= 0;
	for (var x = 0; x < 16; x++) {
		for (var y = 0; y < 10; y++) {
			document.getElementById('minesweeper').children[y].children[x].classList.remove('clicked');
			document.getElementById('minesweeper').children[y].children[x].classList.remove('explose');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('mine');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('flag');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('m1');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('m2');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('m3');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('m4');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('m5');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('m6');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('m7');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('m8');
			document.getElementById('minesweeper').children[y].children[x].children[0].innerHTML = '';
		}
	}
	document.getElementById('infos').children[0].innerHTML = '';
}

// Fonction pour dessiner une mine qui a explosée si on clique sur une mine
// Ne pas modifier cette fonction
function dessinerMineExplose(x, y) {
	document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('mine');
	document.getElementById('minesweeper').children[y].children[x].classList.remove('clicked');
	document.getElementById('minesweeper').children[y].children[x].classList.add('explose');
	document.getElementById('infos').children[0].innerHTML = 'BOOM !!!';
	win = 'mine';
}

// Fonction pour dessiner un drapeau si on clique sur une case
// Ne pas modifier cette fonction
function dessinerFlag(x, y, toggle) {
	if (toggle == 1) {
		document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('flag');
	} else {
		document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('flag');
	}
}

// Fonction pour dessiner une case vide si on clique sur une case vide
// Ne pas modifier cette fonction
function dessinerCaseVide(x, y) {
	document.getElementById('minesweeper').children[y].children[x].classList.add('clicked');
}

// Fonction pour dessiner le nombre de mine si on clique sur une case qui a des mines autour d'elle
// Ne pas modifier cette fonction
function dessinerNbMine(x, y) {
	document.getElementById('minesweeper').children[y].children[x].classList.add('clicked');
	document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('m' + minesweeper[y][x]);
	document.getElementById('minesweeper').children[y].children[x].children[0].innerHTML = minesweeper[y][x];
}

// Fonction pour jouer
function play(x, y) {
	count=0;
	if (mines >= 0 && win === false) {
		if (flag == true) {
			if (flags[y][x] == 1) {
				flags[y][x] = 0;
				dessinerFlag(x, y, 0);
				mines++;
				document.getElementById('infos').children[0].innerHTML = 'Il reste ' + mines + ' mine' + (mines > 1 ? 's' : '');
			} else if (minesweeper[y][x] === undefined || minesweeper[y][x] == 'M') {
				flags[y][x] = 1;
				dessinerFlag(x, y, 1);
				mines--;
				document.getElementById('infos').children[0].innerHTML = 'Il reste ' + mines + ' mine' + (mines > 1 ? 's' : '');
			}
		}
		else if (minesweeper[y][x] == 'M' && flags[y][x] != 1) {
			dessinerMineExplose(x, y);
		}
		else if (flags[y][x] != 1) {
		// Ne rien modifier au dessus de ce commentaire
		if (!minesweeper[y][x]){
		clique++;
		}
		// test colonne
	if (y-1 >=0) {
		if (minesweeper[y-1][x] == 'M') {
			count++;
		}
	}
	if (y+1<=9) {
		if (minesweeper[y+1][x] == 'M') {
			count++;
		}
	}
	// test lignes
	if (x-1 >=0) {
		if (minesweeper[y][x-1] == 'M') {
			count++;
		}
	}
	if (x+1<=15) {
		if (minesweeper[y][x+1] == 'M') {
			count++;
		}
	}
	// test diagonales montante
	if (y-1 >=0 && x+1<=15 ) {
		if (minesweeper[y-1][x+1] == 'M') {
			count++;
		}
	}
	if (y+1 <=9 && x-1 >=0) {
		if (minesweeper[y+1][x-1] == 'M') {
			count++;
		}
	}
	// test diagonal decendante
	if (y-1 >=0 && x-1>=0 ) {
		if (minesweeper[y-1][x-1] == 'M') {
			count++;
		}
	}
	if (y+1 <=9 && x+1 <=15) {
		if (minesweeper[y+1][x+1] == 'M') {
			count++;
		}
	}
	// verif vide
	if(count == 0){
		minesweeper[y][x] = 'E'
	}
	if (count != 0) {
		minesweeper[y][x] = count
	}
	// dessiner case
	if (minesweeper[y][x] == 'E') {
		dessinerCaseVide(x,y);
	}
	if (minesweeper[y][x] == count) {
		dessinerNbMine(x,y);
	}
	// verif win
	// Ne rien modifier au dessous de ce commentaire
	}
		is_win();
	}
}

// Fonction pour completer automatiquement la grille
function completerGrille(y,x) {
	// Ne rien modifier au dessus de ce commentaire
for (var x = 0; x < 16; x++) {
		for (var y = 0; y < 10; y++){
			if (minesweeper[y][x] == undefined) {
				play(x,y);
			}
			if(count== 0){
				minesweeper[y][x] = 'E'
			}
		}
	}
	// Ne rien modifier au dessous de ce commentaire
	dessinerGrille();
	}
// Fonction de vérification de victoire
function is_win() {
	// Ne rien modifier au dessus de ce commentaire
	if (mines== 0){
		win=true;
	}
	if (clique == 160-mines){
		win=true;
	}
	// Ne rien modifier au dessous de ce commentaire
	if (win == 'mine') {
		verify();
	}
	else if (win !== false && win != 'mine') {
		document.getElementById('infos').children[0].innerHTML = 'Partie gagnée';
	}
}