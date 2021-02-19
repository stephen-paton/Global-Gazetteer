/* =====================================================================================================
LOADING
======================================================================================================== */
(function() {

    window['loadingScreenActive'] = true; // Ends the generateTrivia function when false

    // ===== Assign Loading Status Messages Based on HTML Document Status =====
    // Assign Loading Status Message
    // document.onreadystatechange = function () {

    //     let oldMessage = document.getElementsByClassName('loadingStatusMessage')[0];
    //     let newMessage = document.createElement('p');

    //     newMessage.className = 'loadingStatusMessage animated bounceIn';
    //     newMessage.innerHTML = document.readyState.charAt(0).toUpperCase() + document.readyState.slice(1) + '...';
        
    //     if (oldMessage) {

    //         oldMessage.parentNode.replaceChild(newMessage, oldMessage);
            
    //     }
        
    // }

    // Random Trivia Generator
    let randomTriviaArray = [
        `Did you know that the earth has a circumference of 40,075km?<br><br>
        If you were travelling from the earth to the moon, that distance would see you just over 10% of the way there.`,

        `Did you know that the earth's rotation is gradually slowing?<br><br>
        This means that the days are getting longer, but so slowly that we don't notice day to day.`,

        `Did you know that there are 195 UN-recognised nations in the world?<br><br>
        Africa is the continent with the most, with 54 countries in total.`,

        `Technically, there is only one ocean in the world, the World Ocean.<br><br>
        This ocean is divided up into the distinct named regions that you're probably more familiar with, such as the Atlantic and Pacific Oceans.`,

        `Taumatawhakatangihangakoauauotamateapokaiwhenuakitanatahu<br><br>
        This is the Maori name for a hill near Porangahau, and is the longest place name found in any English-speaking country.<br><br>
        It marks the spot where Tamaea played his kōauau (flute).`,

        `57.8 degrees celsius is the hottest ever temperature recorded by a weather station.<br><br>
        This was recorded at El Azizia in Libya, on 13th September 1922. There are locations on the earth's surface that have probably been hotter, but none recorded by 
        a weather station.`,

        `The coldest place on earth is Antarctica.<br><br>
        Temperatures here can fall as low as -73 degrees celsius.`
    ];

    function generateTrivia() {

        if (!window['loadingScreenActive']) {

            return;

        }

        let triviaIndex = Math.floor(Math.random() * (randomTriviaArray.length - 1));
        let triviaMessage =`<p class="loadingScreenInfoMessage animated fadeInUp slow">
        ${randomTriviaArray[triviaIndex]}
        </p>`;

        if (!(document.getElementsByClassName('loadingScreenMessageContainer'))) {

            return;

        }

        document.getElementsByClassName('loadingScreenMessageContainer')[0].innerHTML = triviaMessage;

        setTimeout(generateTrivia, 10000);
    
    }

    generateTrivia();

    // ===== Setup Loading Screen Text Animation =====
    // Wrap every letter in a span
    let loadingText = document.querySelector('.loadingScreenContainer .ml6');
    loadingText.innerHTML = loadingText.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    // Setup text animation and controller
    window['loadingTextAnimationController'] = anime.timeline({loop: true})
    .add({
        targets: '.loadingScreenContainer .ml6 .letter',
        translateY: ["1.1em", 0],
        translateZ: 0,
        duration: 550,
        delay: (el, i) => 50 * i
    }).add({
        targets: '.loadingScreenContainer .ml6',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 550
    });
    
  })();