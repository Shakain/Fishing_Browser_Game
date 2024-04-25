//Hier S´stehe Alle Konstanten die nicht in levelfläche sind und damit dann nicht aktiv zum main speil beitragegen

const startSeite = document.querySelector('#startseite');
const startHintergrundBild = document.querySelector('#hintergrund');
const startButton = document.querySelector('#start');
const nickInput = document.querySelector('#nickname');
const tutorial = document.querySelector("#tutorial");
const fragezeichen = document.querySelector('#fragezeichen');


const levelAuswahlSeite = document.querySelector('#levelauswahl');
const levelAuswahlHintergrundBild = document.querySelector('#levelAuswahlHintergrund');
const levelauswahlFlaeche = document.querySelector('#levelauswahlFlaeche');
const leveldivs = document.querySelectorAll('#levelauswahlFlaeche div');
const levelOffen = document.querySelectorAll(".levelOffen");
const levelauswahlVorschau = document.querySelector('#vorschau');
const levelauswahlButton = document.querySelector("#levelauswahlButton");

const hauptSeite = document.querySelector('#hauptSeite');
const spielSeite = document.querySelector('#levelflaeche');
const spielZurueckButton = document.querySelector('#zurueckWahl');

const endScreenSeite = document.querySelector("#endScreen");
const endScreenBild = document.querySelector("#endScreenBild");
const endScreenButton = document.querySelector("#endScreenZureck");
const endScreenText = document.querySelector("#endScreenText");
const platzName = document.querySelector("#platzName");


startbildschirm();

// Die funtionen sind die Parameter einstellung dür die Hauptseiten
function startbildschirm() {
    startSeite.style.display = "initial";
    startHintergrundBild.style.height = window.innerHeight + "px";
    startHintergrundBild.style.width = window.outerWidth + "px";

    tutorial.style.height = window.innerHeight * 0.8 + "px";
    tutorial.style.width = window.outerWidth * 0.8  + "px";
    tutorial.style.left = window.outerWidth*0.1 + "px";
    tutorial.style.top = window.innerHeight*0.1 + "px";

    fragezeichen.style.height = window.innerHeight*0.1 + "px";
    fragezeichen.style.width = window.innerHeight*0.1  + "px";
    fragezeichen.style.top = window.innerHeight*0.89 + "px";
    fragezeichen.style.left = window.outerWidth*0.03 + "px";

    startButton.style.top = window.innerHeight/2 + "px";
    startButton.style.left = window.outerWidth/2 - startButton.offsetWidth/2  + "px";
    nickInput.style.top = startButton.offsetTop + startButton.offsetHeight + "px";
    nickInput.style.left = window.outerWidth/2 - nickInput.offsetWidth/2  + "px";
}

function levelAuswahlbildschirm() {
    levelAuswahlHintergrundBild.style.height = window.innerHeight + "px";
    levelAuswahlHintergrundBild.style.width = window.outerWidth + "px";

    levelAuswahlZurueckButtonPlatzieren()
    
    levelAuswahlSeite.style.display = "flex";
    levelauswahlFlaeche.style.left = window.outerWidth / 2 - levelauswahlFlaeche.offsetWidth / 2  + "px";
}

function endScreen() {
    levelAuswahlSeite.style.display = "none";
    endScreenSeite.style.display = "initial";

    endScreenBild.style.height = window.innerHeight + "px";
    endScreenBild.style.width = window.outerWidth + "px";
    

    endScreenButton.style.top = (window.innerHeight - endScreenButton.offsetHeight) + "px";
    endScreenButton.style.left = 0 + "px";

    platzName.innerText = nickname + ",";
    endScreenText.style.fontSize = window.innerHeight * 0.06 + "px";

    endScreenText.style.height= window.innerHeight * 0.2 + "px";
    endScreenText.style.width = window.outerWidth * 0.4 + "px";

    endScreenText.style.top= window.innerHeight * 0.06 + "px";
    endScreenText.style.left= window.outerWidth * (0.5 - 0.2) + "px";
}






//Alle die EventListenr wurden hier ausgelagert damit sie sich nur einmal aufrufen können diese funktion wird kann am anfang einaml Gestertet
function aktiviereEventListener() {
    startButton.addEventListener("click",(startButtonEvent));

    levelauswahlButton.addEventListener("click",(zurueckZumStart));

    endScreenButton.addEventListener("click",(endScreenButtonEvent));

    leveldivs.forEach((div) =>
    {
        div.addEventListener("click",()=> levelStartenEvent(div));
    });

    spielZurueckButton.addEventListener("click",()=>
    {
        if(darfZurueck2)
        {
            levelBeenden()
        }
    });

    levelAuswahlMouseover(document.querySelector("#level1"));

    levelAuswahlMousout(document.querySelector("#level1"));
}

//Das hier Sind die Methoden die durch die die EventListener aktivieren
function levelAuswahlbildschirmHover() {


    levelOffen.forEach((div) =>
    {
        div.addEventListener("mouseover",()=>
        {
            div.style.transform = "scale(1.05, 1.05)";
            let levelZahl = Number.parseInt(Number.parseInt((div.id.replace('level','')))) - 1;
            levelauswahlVorschau.insertAdjacentHTML("beforeend", '<img src="pics/schatzkarten/schatzkarte_welt_' + (levelZahl + 1) + '.png" id="karte"><div id="kartenName"><p>' + kartenNameArray[levelZahl] + '</p></div>');
            document.querySelector("#kartenName").style.marginTop = window.innerHeight*0.02 + "px";
            document.querySelector("#kartenName").style.marginLeft = window.outerWidth*0.02 + "px";

            document.querySelector("#karte").style.width = window.outerWidth * 0.2 + "px";
            levelauswahlVorschau.style.height = window.innerHeight + "px";
            levelauswahlVorschau.style.width = window.outerWidth * 0.2 + "px";
            levelauswahlVorschau.style.display = "initial";


            //document.querySelector("#karte").style.height = window.innerHeight*0.2 + "px";
        })
        div.addEventListener("mouseout",()=>
        {
            div.style.transform = "scale(1, 1)";
            levelauswahlVorschau.innerHTML = "";
            levelauswahlVorschau.style.display = "none";
        })
    })
}

function levelAuswahlMouseover(div)
{
    div.addEventListener("mouseover",()=>
        {
            div.style.transform = "scale(1.1, 1.1)";
            let levelZahl = Number.parseInt(Number.parseInt((div.id.replace('level','')))) - 1;
            levelauswahlVorschau.insertAdjacentHTML("beforeend", '<img src="pics/schatzkarten/schatzkarte_welt_' + (levelZahl + 1) + '.png" id="karte"><div id="kartenName"><p>' + kartenNameArray[levelZahl] + '</p></div>');
            document.querySelector("#kartenName").style.marginTop = window.innerHeight*0.02 + "px";
            document.querySelector("#kartenName").style.marginLeft = window.outerWidth*0.02 + "px";

            document.querySelector("#karte").style.width = window.outerWidth * 0.2 + "px";
            levelauswahlVorschau.style.height = window.innerHeight + "px";
            levelauswahlVorschau.style.width = window.outerWidth * 0.2 + "px";
            levelauswahlVorschau.style.display = "initial";
        });
}

function levelAuswahlMousout(div)
{
    div.addEventListener("mouseout",()=>
    {
        div.style.transform = "scale(1, 1)";
        levelauswahlVorschau.innerHTML = "";
        levelauswahlVorschau.style.display = "none";
    });
}

function endScreenButtonEvent() 
{
    endScreenSeite.style.display = "none";
    levelAuswahlbildschirm();   
}

function startButtonEvent()
{
    nickname = nickInput.value
    startSeite.style.display = "none";
    levelAuswahlbildschirm();
}

function zurueckZumStart()
{
    levelAuswahlSeite.style.display = "none";
    startbildschirm();
    startSeite.style.display = "initial";
    nickInput.focus();
}

function levelStartenEvent(div)
{
    if(eventCheck) {
        eventCheck = false;
        hauptseiteZurueckButtonPlatzieren()
        levelZahl = Number.parseInt(Number.parseInt((div.id.replace('level',''))))-1;
        if(levelArrayCheck[levelZahl]) {
            levelAuswahlSeite.style.display = "none";
            hauptSeite.style.display = "initial";
            mainLevelMethode(levelArray[levelZahl],tierSpeicherArray[levelZahl],hintergruende[levelZahl]);
        } else {
            eventCheck = true;
        }
    }
}





// Die Methoden wenn das Level egal wie beendet wird
function levelBeenden() {
    if(darfZurueck) {
      
        if (!netz.netzAuswerfbar) {
            netz.netzAufloesen();
        }
        booleanReset();
        codeClear();
        levelAuswahlbildschirm();
    }
}

function booleanReset() {
    eventCheck = true;
    level.wirdAbgebrochen = true;
    levelBeendet = true;
    darfZurueck2 = true;
}

function codeClear() {
    clearTimeout(netz.timerTiergefangen);
    clearTimeout(netz.timerKeinTiergefangen);
    schatzkarteDiv.innerHTML = "";
    hauptSeite.style.display = "none";
    level.tiereLoeschen();
    level.gitterLoeschen()
}


//Plazierungs Methoden
function hauptseiteZurueckButtonPlatzieren()
{
    buttonBild = document.querySelector("#zurueckWahl img");
    buttonBild.style.width = window.outerWidth * 0.1 + "px";
    spielZurueckButton.style.left = window.outerWidth * 0.02 + "px";
    spielZurueckButton.style.top = window.outerHeight * 0.01 + "px";
}

function levelAuswahlZurueckButtonPlatzieren()
{
    buttonBild = document.querySelector("#levelauswahlButton img");
    buttonBild.style.width = window.outerWidth * 0.1 + "px";
    levelauswahlButton.style.top = 0 + "px";
    levelauswahlButton.style.left = window.outerWidth * 0.02 + "px";
}