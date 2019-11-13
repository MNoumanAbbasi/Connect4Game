/**     Assignment 3: Connect 4 Game (BROWSER SIDE)
 *              @author Nouman Abbasi
*/



new Vue({                   // Grid start from bottom left cornor (indexing according to that)
    template: `
        <div>
            <table id='gameboard'>
                <tr id='row5'>
                    <td v-on:click='makeMove(0)'>{{board[5][0]}}</td>
                    <td v-on:click='makeMove(1)'>{{board[5][1]}}</td>
                    <td v-on:click='makeMove(2)'>{{board[5][2]}}</td>
                    <td v-on:click='makeMove(3)'>{{board[5][3]}}</td>
                    <td v-on:click='makeMove(4)'>{{board[5][4]}}</td>
                    <td v-on:click='makeMove(5)'>{{board[5][5]}}</td>
                    <td v-on:click='makeMove(6)'>{{board[5][6]}}</td>
                </tr>  
                <tr id='row4'>
                    <td v-on:click='makeMove(0)'>{{board[4][0]}}</td>
                    <td v-on:click='makeMove(1)'>{{board[4][1]}}</td>
                    <td v-on:click='makeMove(2)'>{{board[4][2]}}</td>
                    <td v-on:click='makeMove(3)'>{{board[4][3]}}</td>
                    <td v-on:click='makeMove(4)'>{{board[4][4]}}</td>
                    <td v-on:click='makeMove(5)'>{{board[4][5]}}</td>
                    <td v-on:click='makeMove(6)'>{{board[4][6]}}</td>
                </tr>
                <tr id='row3'>
                    <td v-on:click='makeMove(0)'>{{board[3][0]}}</td>
                    <td v-on:click='makeMove(1)'>{{board[3][1]}}</td>
                    <td v-on:click='makeMove(2)'>{{board[3][2]}}</td>
                    <td v-on:click='makeMove(3)'>{{board[3][3]}}</td>
                    <td v-on:click='makeMove(4)'>{{board[3][4]}}</td>
                    <td v-on:click='makeMove(5)'>{{board[3][5]}}</td>
                    <td v-on:click='makeMove(6)'>{{board[3][6]}}</td>
                </tr>
                <tr id='row2'>
                    <td v-on:click='makeMove(0)'>{{board[2][0]}}</td>
                    <td v-on:click='makeMove(1)'>{{board[2][1]}}</td>
                    <td v-on:click='makeMove(2)'>{{board[2][2]}}</td>
                    <td v-on:click='makeMove(3)'>{{board[2][3]}}</td>
                    <td v-on:click='makeMove(4)'>{{board[2][4]}}</td>
                    <td v-on:click='makeMove(5)'>{{board[2][5]}}</td>
                    <td v-on:click='makeMove(6)'>{{board[2][6]}}</td>
                </tr>
                <tr id='row1'>
                    <td v-on:click='makeMove(0)'>{{board[1][0]}}</td>
                    <td v-on:click='makeMove(1)'>{{board[1][1]}}</td>
                    <td v-on:click='makeMove(2)'>{{board[1][2]}}</td>
                    <td v-on:click='makeMove(3)'>{{board[1][3]}}</td>
                    <td v-on:click='makeMove(4)'>{{board[1][4]}}</td>
                    <td v-on:click='makeMove(5)'>{{board[1][5]}}</td>
                    <td v-on:click='makeMove(6)'>{{board[1][6]}}</td>
                </tr>
                <tr id='row0'>
                    <td v-on:click='makeMove(0)'>{{board[0][0]}}</td>
                    <td v-on:click='makeMove(1)'>{{board[0][1]}}</td>
                    <td v-on:click='makeMove(2)'>{{board[0][2]}}</td>
                    <td v-on:click='makeMove(3)'>{{board[0][3]}}</td>
                    <td v-on:click='makeMove(4)'>{{board[0][4]}}</td>
                    <td v-on:click='makeMove(5)'>{{board[0][5]}}</td>
                    <td v-on:click='makeMove(6)'>{{board[0][6]}}</td>
                </tr>
            </table>
            <input v-model='colChoice' placeholder='Enter row number'></input>
            <button v-on:click='sendChoice'> Send Message </button>
            <p>{{colChoice}}</p>
            <p>{{infoMsg}}</p>
        </div>
    `,
    data: {
        ROW_NUM: 6,
        COL_NUM: 7,
        colChoice: -1,
        myChoicePos: [],       // stores the position at where the new piece is placed
        oppChoicePos: [],
        myPieceColor: 'X',      // color of piece assigned to this user by the server. Player 1: X. Player 2: O.
        board: [],
        infoMsg: '',
        startGame: false,
        myTurn: false,
        ws: new WebSocket('ws://localhost:5000')
    },
    methods: {
        async sendChoice() {
            this.ws.send(JSON.stringify(this.myChoicePos))
        },

        makeMove(column) {
            this.infoMsg = ''
            if (!this.startGame || !this.myTurn) {
                infoMsg = 'Please wait for your turn.'
                return;
            }

            this.colChoice = column
            if (this.board[this.ROW_NUM-1][column] !== ' ') {   // If no more space left in that column
                this.infoMsg = 'No more space left. Choose another column.'
            } else {
                // Finding the next empty space to add the piece
                for (let i = 0; i < this.COL_NUM; i++) {
                    if (this.board[i][column] === ' ') {
                        this.board[i][column] = this.myPieceColor
                        this.myChoicePos = [i, column]
                        break
                    }
                }
            }
            this.colChoice = -1
            this.myTurn = false
            this.sendChoice(this.myChoicePos)
        },

    },
    created() {
        this.board  = Array(this.ROW_NUM).fill().map(() => Array(this.COL_NUM).fill(' '));
        this.board = Array(this.ROW_NUM).fill().map(() => Array(this.COL_NUM).fill(' '));
    },
    mounted() {
        this.ws.onmessage = event => {
            if (!this.startGame) {
                console.log(event.data)
                if (event.data === '1') {         // If this is player 1
                    console.log('Connected with Server.')
                    console.log('You are player 1. Waiting for player 2...')
                    this.myPieceColor = 'X'     // player 1 assigned color 'X'
                    this.myTurn = true
                }
                else if (event.data === '2') {         // If this is player 2
                    console.log('Connected with Server.')
                    console.log('You are player 2.')
                    this.myPieceColor = 'O'     // player 2 assigned color 'O'
                    this.myTurn = false
                }
                else if (event.data === '3') {    // 3 is indication from server to start game
                    console.log('Starting Game.')
                    this.startGame = true
                }
            } else {            // If game started
                // Now game has started, we recieve positions of opponent player
                oppChoicePos = JSON.parse(event.data)
                let [oppRow, oppCol] = JSON.parse(event.data)
                console.log('Opponent choice received', oppRow, oppCol)
                if (this.myPieceColor === 'X')
                    this.board[oppRow][oppCol] = 'O'
                else
                    this.board[oppRow][oppCol] = 'X'
                this.myTurn = true
                oppChoicePos = []
            }
        }
    }

}).$mount('#game')

