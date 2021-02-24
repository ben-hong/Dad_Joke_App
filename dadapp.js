const $list = $('ol');
$(function() {
    console.log('page loaded')
    getDadJokes();
})

async function getDadJokes() {
    let jokeList = await axios.get("https://icanhazdadjoke.com/search", {
        headers: {
            Accept: "application/json"
        },
        params: {
            limit: 10
        }
    })
    let jokes = jokeList.data.results;
    console.log(jokes);
    displayJokes(jokes);
}

function displayJokes(jokes) {
    let score = 0;
    for (let jokeObj of jokes) {
        let $newJoke = $(`
        <div>
            <li>${jokeObj.joke}</li>
            <button class="up">^</button>
            <button class="down">v</button>
            <span>${score}</span>
        <div>
            `);
        $list.append($newJoke);
    }
    clickUp();
    clickDown();
} 

function clickUp() {
    $('.up').on('click', function(e) {
        let $parent = $(e.target).parent();
        let num = +$parent.find('span').text();
        num++;
        let $score = +$parent.find('span').text(num);
    });
}

function clickDown() {
    $('.down').on('click', function(e) {
        let $parent = $(e.target).parent();
        let num = +$parent.find('span').text();
        num--;
        let $score = +$parent.find('span').text(num);
    });
}

// target parent
// if we click #up, score goes up
// if we click #down, score goes down
