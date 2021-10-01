const readline = require('readline'). createInterface({
    input: process.stdin,
    output: process.stdout
})

let dead = 0;
let wounded = 0;
let computer_guess = []
let won = false
while(computer_guess.length < 4) {
    let guess = Math.floor(Math.random() * 10)
    if(computer_guess.includes(guess)) {
        computer_guess[computer_guess.indexOf(guess)] = guess
    }
    else {
        computer_guess.push(guess)
    }
}
    
let user_guess = []
let readinput = function (){
    readline.question('Please enter a four digit guess: ', your_guess => {
        user_guess = your_guess.split('').map(num => {
            return parseInt(num)
        })
        if(user_guess.length !== 4){
            console.log('guess must be four digit')
            dead = 0;
            wounded = 0
            readinput()
        }
        else if(user_guess.includes(NaN)){
            console.log('only numbers are allowed')
            readinput()
        }
        else{
            let isDuplicate = false
            const s = new Set(user_guess)
            if(s.size !== user_guess.length){
                isDuplicate = true
            }
            if(isDuplicate){
                console.log('No duplicate values allowed')
                dead = 0;
                wounded = 0
                readinput()
            } else{
                showresult()
            }
        }
    })
}

function showresult() {
    for(let digits of user_guess){
        for(let i = 0; i < 4; i++){
            if(digits === computer_guess[i]){
                if(computer_guess.indexOf(digits) === user_guess.indexOf(digits)){
                    dead++
                }
                else {
                    wounded++
                }
            }
        }
    }
    if(dead < 4) {
        console.log(`dead : ${dead} | wounded: ${wounded}`)
        dead = 0;
        wounded = 0
        readinput()
    }
    else{
        console.log('You win, all dead')
        readline.close()
    }
}

readinput()