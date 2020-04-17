import './styles/style.scss';
import Board from './board';
import Gameplay from './gameplay';

const board = new Board();
board.createBoard();

const gameplay = new Gameplay(board.cards);
