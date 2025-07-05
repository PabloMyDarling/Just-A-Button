let click_count = 0;
let playing = false;
let game_clicks = 0;
let can_click = true;
let need_to_click = 50;
let time = 10;
let streak_wins = 0;
const increaseClicksBy = parseInt(sessionStorage.getItem("increaseClicksBy")) || 40;
const increaseTimeBy = parseInt(sessionStorage.getItem("increateTimeBy")) || 10

console.log(increaseClicksBy);
console.log(increaseTimeBy);

document.getElementById("winLabel").textContent = `Streak Wins: ${streak_wins}`;

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function mainButtonClick() {
    if (can_click) {
        click_count++;
        document.getElementById("clickSound").play();

        if (click_count == 1) { document.getElementById("mainButton").textContent = "Hey, I'm ticklish!"; }
        if (click_count == 2) { document.getElementById("mainButton").textContent = "Could you stop?"; }
        if (click_count == 3) { document.getElementById("mainButton").textContent = "I said stop, it's annoying!"; }
        if (click_count == 4) { document.getElementById("mainButton").textContent = "Dude, stop it! It hurts!!"; }
        if (click_count == 5) { document.getElementById("mainButton").textContent = "Stop it!! You're tickling me!!"; }
        if (click_count == 6) { document.getElementById("mainButton").textContent = "Stop it."; }
        if (click_count == 7) { document.getElementById("mainButton").textContent = "STOP it."; }
        if (click_count >= 8) {
            document.getElementById("mainButton").textContent = "I SAID STOP.";
            document.getElementById("mainButton").style.borderColor = "white";
            document.body.style.background = `rgb(225, 0, 0)`;
            if (!playing) {
                document.getElementById("angrySound").play();
                playing = true;
            }

            const element = document.getElementById('mainButton');
            element.style.animation = 'MoveBottom 1s ease-out forwards';
            boss();
            can_click = false;
        }
    } else {
        game_clicks++;
        document.getElementById("clicksLabel").textContent = game_clicks.toString();
    }
}

async function boss() {
    const clicks_counter = document.createElement("div");
    clicks_counter.id = "clicksCounterDiv";
    
    clicks_counter.style.position = "fixed";
    clicks_counter.style.padding = "10px";
    clicks_counter.style.display = "block";
    clicks_counter.style.top = "50%";
    clicks_counter.style.left = "50%";
    clicks_counter.style.width = "52%";
    clicks_counter.style.height = "300px";
    clicks_counter.style.transform = "translate(-50%, -50%)";
    clicks_counter.style.background = "rgb(195, 0, 0)";
    clicks_counter.style.borderRadius = "15px";
    clicks_counter.style.animation = 'showBossFrame 1s ease-out forwards';
    
    document.body.appendChild(clicks_counter);

    const clicksTopLabel = document.createElement("label");
    clicksTopLabel.textContent = `Get to ${need_to_click.toString()} clicks in ${time.toString()} seconds to calm Button down!`;
    clicksTopLabel.style.fontFamily = "Roboto, sans-serif";
    clicksTopLabel.style.display = "block";
    clicksTopLabel.style.fontFamily = "Roboto, sans-serif";
    clicksTopLabel.style.textAlign = "center";
    clicksTopLabel.style.fontWeight = "bolder";
    
    clicks_counter.appendChild(clicksTopLabel);

    const clicks_label = document.createElement("label");
    clicks_label.id = "clicksLabel";
    clicks_label.textContent = game_clicks;
    
    clicks_counter.appendChild(clicks_label);

    // the time label
    const time_label = document.createElement("label");
    time_label.id = "timeLabel";
    time_label.textContent = time.toString();
    clicks_counter.appendChild(time_label);
    let game_time = time.valueOf();

    while (game_time > 0) {
        await sleep(1000);
        game_time -= 1;
        time_label.textContent = game_time.toString();

        if (Number(game_clicks.valueOf()) >= Number(need_to_click.valueOf())) {
            document.body.style.backgroundColor = "#333";
            document.getElementById("mainButton").style.borderColor = "black";
            document.getElementById("mainButton").textContent = "This is a button.";
            document.getElementById("mainButton").style.animation = "MoveOrigin 1s ease-out forwards";
            document.getElementById("clicksCounterDiv").remove();
            document.getElementById("angrySound").pause();
            document.getElementById("angrySound").currentTime = 0;

            // reset everything
            can_click = true;
            need_to_click = Math.round(need_to_click + increaseClicksBy);
            time += increaseTimeBy;
            game_clicks = 0;
            click_count = 0;
            playing = false;
            streak_wins += 1;
            document.getElementById("winLabel").textContent = `Streak Wins: ${streak_wins}`;

            break;
        }
        if (game_time == 0) {
            document.body.style.backgroundColor = "#333";
            const loseTitleLabel = document.createElement("label");
            loseTitleLabel.textContent = "You failed, but don't give up!";
            loseTitleLabel.id = "loseTitleLabel";
            document.body.appendChild(loseTitleLabel);
            loseTitleLabel.style.animation = "loseLabelMove 1s ease-out forwards";

            document.getElementById("mainButton").style.borderColor = "black";
            document.getElementById("mainButton").style.animation = "MoveOrigin 1s ease-out forwards";
            document.getElementById("mainButton").textContent = "Play Again";
            document.getElementById("mainButton").onclick = function() { window.location.reload(); };
            document.getElementById("clicksCounterDiv").remove();
            document.getElementById("angrySound").pause();
            document.getElementById("angrySound").currentTime = 0;
            document.getElementById("loseSound").play();
            playing = false;

            break;
        }
    }
}

document.getElementById("mainButton").addEventListener("click", mainButtonClick);

