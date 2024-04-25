


//Start (allgemeine Funktionen und wichtige Konstanten und Durchführungen von Funktionen)
aktiviereEventListener();

let netz = new Netz();
netz.vorschau();


function mainLevelMethode(kollisionsArray,levelTierSpeicherArray,hintergruend)
{
    level = new Level(kollisionsArray, hintergruend);
    level.tierArray = tiereArrayErschaffen(levelTierSpeicherArray);
    netz.netzAuswerfbar = true;
    levelStarten();
}

function levelStarten()
{
    level.levelflaecheScale();
    level.gitterErschaffen();
    level.tiereStartklarMachen();
    level.tiereBewegen();
}

//Abschnitt 0 Level
function Level(kollisionsArray, hintergrundBild)
{
    this.bounceList = kollisionsArray;

    this.anzahlX = this.bounceList[0].length; 
    this.anzahlY = this.bounceList.length;

    this.platzAmRand = 2;
    this.animation;

    //Variable um nicht fascherweiße das Level als geschaft abzuschließen wenn man zurück geht
    this.wirdAbgebrochen = false;


    this.bekommeKleineresMaS = function()
    {

        if(window.outerWidth / (this.anzahlX + this.platzAmRand) < window.innerHeight / (this.anzahlY + this.platzAmRand))
        {
            return Math.floor(window.innerWidth / (this.anzahlX + this.platzAmRand));
        }
        else
        {
            return Math.floor(window.innerHeight / (this.anzahlY + this.platzAmRand));
        }
    }

    this.blockMaSeVerhaeltnis //faktor um was ein block kleiner oder groesser geworden ist;
    this.blockMaSe = this.bekommeKleineresMaS();
    this.alteBlockMaSe




    this.felderBreite = this.anzahlX * this.blockMaSe;
    this.felderHoehe = this.anzahlY * this.blockMaSe;


    this.tierArray = [];


    //Anfang der Funktionen
    this.weltPlatzieren = function()
    {
        hintergruendBild.innerHTML = "";
        hintergruendBild.insertAdjacentHTML("beforeend", '<img id="welt" src="' + hintergrundBild + '" width="' + this.felderBreite + '" height="' + this.felderHoehe + '"></img>');
        document.querySelector("#welt").style.zIndex = "-10";
    }

    this.weltPlatzieren();




    this.levelflaecheScale = function()
    {
        spielSeite.style.position = "absolute";
        spielSeite.style.width = this.felderBreite + "px";
        spielSeite.style.height = this.felderHoehe + "px";
        spielSeite.style.top = ((window.innerHeight - this.felderHoehe) / 2) + "px";
        spielSeite.style.left = ((window.outerWidth - this.felderBreite) / 2) + "px";
    }






    this.gitterErschaffen = function()
    {
        for(let i = 0; i < this.bounceList.length; i++)
        {
            for(let j = 0; j < this.bounceList[0].length; j++)
            {
                feldID = "y" + i + "x" + j;
                gitter.insertAdjacentHTML("beforeend", '<img id="gitter' + feldID + '" src="pics/gitter.png" width="' + this.blockMaSe + '" height="' + this.blockMaSe + '"></img>');
                        
                let objekt = document.querySelector("#gitter" + feldID);
                
                objekt.style.position = "absolute";
                objekt.style.top = i * this.blockMaSe + "px";
                objekt.style.left = j * this.blockMaSe + "px";
                objekt.style.opacity = "0.25";
            }
        }
    }

    this.gitterLoeschen = function()
    {
        gitter.innerHTML = "";
    }

    





    this.tiereStartklarMachen = function()
    {
        for(let i = 0; i < this.tierArray.length; i++)
        {
            this.tierArray[i].positionieren();
            this.tierArray[i].statsGenerieren();
            this.tierArray[i].kollisionsLinie();
            this.tierArray[i].drehen(this.tierArray[i].winkel);
            this.tierArray[i].statsVeraendern(5000);
        }
    }

    /*Diese Variabelm dienen Dazu die FPS der von request animation frame zu regulieren da bei zu viel fps die Tiere zu Schnell sind und es zu problemen in Arbeit Speicher führen kann
      Quelle von wo ich den Code habe https://gist.github.com/elundmark/38d3596a883521cb24f5
      weil sie spezifisch nur hier verwendet werden sind sie nicht bei den anderen angelelgt*/
    var fps = 60;
    var now;
    var then = Date.now();
    var interval = 1000/fps;
    var delta;
    this.tiereBewegen = function()
    {
        now = Date.now();
        delta = now - then;
        if (delta > interval) {

            then = now - (delta % interval);
            for(let i = 0; i < this.tierArray.length; i++)
            {
                this.tierArray[i].einfachBewegen();
            }

        }
        this.animation = requestAnimationFrame(()=>{this.tiereBewegen()});
    }


    this.tiereLoeschen = function ()
    {
        for(let i = 0; i < this.tierArray.length; i++)
        {
            clearInterval(this.tierArray[i].veraendern);
            //console.log(this.tierArray[i]);
            this.tierArray[i].bildLoeschen();

        }

        tiere.innerHTML = "";
        this.tierArray = [];
    }

    //geschafft wird immer aufgerufen wenn es keine Tiere mehr im Array gibt also auch wenn abgebrochen wird deswegen die if bedingung hier die verhinder das die sachen passieren wenn das Level geschafft wäre. levelBeenden wir noch aufgerufen wenn die karte auf
    //gesammelt wird
    this.geschafft = function()
    {

        if(level.wirdAbgebrochen) {
            ;
        } else {
            netz.netzAuswerfbar = false;
            netz.netzBeweglich = false;
            levelBeendet = false;
            if (levelZahl + 1 < levelArrayCheck.length) {
                if(!levelArrayCheck[levelZahl + 1]) {
                    console.log("gehst du hier rein?")
                    levelArrayCheck[levelZahl + 1] = true;
                document.querySelector("#level" + (levelZahl + 2)).className = "levelOffen";
                
                levelAuswahlMouseover(document.querySelector("#level" + (levelZahl + 2)));

                levelAuswahlMousout(document.querySelector("#level" + (levelZahl + 2)));
                }
                this.kartenEvent();
            } else {
                levelBeenden()
                endScreen();
            }
            //levelBeenden();
        }
    }

    //wenn alle Level geschaft sind wir diese Funktoin ausgerufen
    this.kartenEvent = function()
    {
        //das + 1 Muss noch mit level Zahl ausgetauscht werden
        schatzkarteDiv.insertAdjacentHTML("beforeend", '<img id="schatzkarte"' + '" src="pics/schatzkarten/schatzkarte_welt_' + (levelZahl + 2) + '.png" width="' + this.blockMaSe * 3 + '" height="' + this.blockMaSe * 3 + '"></img>');
        let karte = document.querySelector('#schatzkarte');

        let kleinereWert;
        if(this.anzahlX < this.anzahlY) {
            kleinereWert = this.anzahlX;
        } else {
            kleinereWert = this.anzahlY;
        }

        karte.style.left = (spielSeite.offsetWidth - karte.offsetWidth) * Math.random() + "px";
        karte.style.top = (spielSeite.offsetHeight - karte.offsetHeight) * Math.random() + "px";
        karte.addEventListener("click", ()=>
        {
                karte.width = (level.blockMaSe * (kleinereWert));
                karte.height = (level.blockMaSe * (kleinereWert ));
                karte.style.left = spielSeite.offsetWidth /2 - karte.offsetWidth / 2 + "px" ;
                karte.style.top = spielSeite.offsetHeight /2 - karte.offsetHeight / 2 + "px" ;
                this.kartenCountDown();
        });
    }

    this.kartenCountDown = function() {
        if(darfZurueck2)
        {
            darfZurueck2 = false;
            this.countdown = setTimeout(function()
            {
                console.log("hier");
                levelBeenden();
            },4000);
        }
    }
}


function tiereArrayErschaffen(tierSpeicherArray) {

    let tierArray =[];
    for(let i = 0; i < tierSpeicherArray.length; i++) {

        tierArray[i] = new Tier(tierSpeicherArray[i].id, tierSpeicherArray[i].tierArt, tierSpeicherArray[i].x, tierSpeicherArray[i].y, tierSpeicherArray[i].width, tierSpeicherArray[i].height,
                                tierSpeicherArray[i].winkel, tierSpeicherArray[i].winkelVariation, tierSpeicherArray[i].minGeschwindigkeit,
                                tierSpeicherArray[i].maxGeschwindigkeit, tierSpeicherArray[i].bildSrc);
    }
    return tierArray;
}




















//Abschnitt 1 (Netz)
function Netz()
{
    this.erstesFeld;
    this.zweitesFeld;


    this.obereKoordinate;
    this.untereKoordinate;
    this.linkeKoordinate;
    this.rechteKoordinate;



    this.stabilitaet = 275; //In millisekunden Pro Feld
    this.grundStabilitaet = 320000; //In millisekunden

    this.besondereFelder = 0;


    this.netzBeweglich = false;
    this.netzAuswerfbar = true;
    this.netzNochKeinMslGestartet = true;
    this.einmal1 = true;
    this.einmal2 = true;

    this.timerTiergefangen;
    this.timerKeinTiergefangen;

    this.gefangeneTiereArray = [];


    this.ergebnis = 0;



    this.clearNetz = function()
    {
        netzDiv.innerHTML = ""; 
    }


    this.vorschau = function()
    {

        spielSeite.addEventListener("mousedown", (event)=>
        {
            if(this.netzAuswerfbar)
            {

                let mouseX = event.clientX - levelflaeche.offsetLeft;
                let mouseY = event.clientY - levelflaeche.offsetTop;

                let spalte = Math.floor(mouseX / level.blockMaSe);
                let zeile = Math.floor(mouseY / level.blockMaSe);

                //console.log(spalte + "|" + zeile);

                this.netzBeweglich = true;

                this.erstesFeld = spalte + "|" + zeile;

                if (this.netzNochKeinMslGestartet) {
                    this.schattenWerfen();
                    this.netzWerfen();
                    this.netzNochKeinMslGestartet = false;
                }
                

                //damit etwas erscheint auch wenn du die Maus sich nicht bewegt hat
                this.zweitesFeld = spalte + "|" + zeile;
                this.koordinatenGenerieren(); //einfach aus Gewohnheit und Regelmaessigkeit
                this.schattenErscheint();
            }
        })
        
    }


    this.schattenWerfen = function()
    {
        spielSeite.addEventListener('mousemove', (event) =>
        {
            if(this.netzBeweglich)
            {
                let mouseX = event.clientX - levelflaeche.offsetLeft;
                let mouseY = event.clientY - levelflaeche.offsetTop;

                let spalte = mouseX / level.blockMaSe;
                let zeile = mouseY / level.blockMaSe;

                this.zweitesFeld = spalte + "|" + zeile;
                this.clearNetz();
                this.koordinatenGenerieren();
                this.schattenErscheint();
            } 
        })   
    }


    this.netzWerfen = function()
    {
        
        spielSeite.addEventListener("mouseup",(event)=>
        {
            if(this.netzAuswerfbar)
            {
                this.netzBeweglich = false;
                this.netzAuswerfbar = false;

                let mouseX = event.clientX - levelflaeche.offsetLeft;
                let mouseY = event.clientY - levelflaeche.offsetTop;

                let spalte = mouseX / level.blockMaSe;
                let zeile = mouseY / level.blockMaSe;

                
                this.zweitesFeld = spalte + "|" + zeile;
                this.clearNetz();
                this.koordinatenGenerieren();
                this.netzErscheint();
                this.fangen();
            }
        })
        
    }

    




    this.koordinatenGenerieren = function()
    {
        //die ersten beiden ziffern einer id stellen den y-Wert dar (z.b f0211 => y = 02 => drittes Kästchen von oben wegen 00, 01, 02, ...)
        //die letzten beiden ziffern stellen den x-Wert dar.
        //die zahl wird mit parseInt verändert damit man sie besser auswerten kann (z.b 02 wird zu 2)


        //yAchse
        this.obereKoordinate = parseInt(this.erstesFeld.split("|")[1]);
        this.untereKoordinate = parseInt(this.zweitesFeld.split("|")[1]);


        //ueberpruefung der Koordinaten 
        if(this.obereKoordinate > this.untereKoordinate)
        {
            let zwischenspeicher = this.obereKoordinate;
            this.obereKoordinate = this.untereKoordinate;
            this.untereKoordinate = zwischenspeicher;
        }


        if(this.obereKoordinate < 0)
        {
            this.obereKoordinate = 0;
        }
        if(this.untereKoordinate >= level.bounceList.length)
        {
            this.untereKoordinate = level.bounceList.length - 1;
        }


        //xAchse
        this.linkeKoordinate = parseInt(this.erstesFeld.split("|")[0]);
        this.rechteKoordinate = parseInt(this.zweitesFeld.split("|")[0]);

        if(this.linkeKoordinate > this.rechteKoordinate)
        {
            let zwischenspeicher = this.linkeKoordinate;
            this.linkeKoordinate = this.rechteKoordinate;
            this.rechteKoordinate = zwischenspeicher;
        }

        if(this.linkeKoordinate < 0)
        {
            this.linkeKoordinate = 0;
        }
        if(this.rechteKoordinate >= level.bounceList[0].length)
        {
            this.rechteKoordinate = level.bounceList[0].length - 1;
        }

    }






    this.netzErscheint = function()
    {
        
        
        let zaehler = 0;

        for(let i = this.obereKoordinate - 1; i <= this.untereKoordinate + 1; i++)
        {
            for(let j = this.linkeKoordinate - 1 ; j <= this.rechteKoordinate + 1; j++)
            {
                feldID = "img" + zaehler;
                zaehler++;

                //let bildSrc = "pics/netz/netz.png";
                let bildSrc

                
                
                
                
                if(i == this.obereKoordinate - 1)
                {
                    if(j == this.linkeKoordinate - 1)
                    {
                        bildSrc = "pics/netz/obereLinkeEcke.png";
                    }
                    else
                    {
                        if(j == this.rechteKoordinate + 1)
                        {
                            bildSrc = "pics/netz/obereRechteEcke.png";
                        }
                        else
                        {
                            bildSrc = "pics/netz/obereKante.png";
                        }
                    }
                }
                else
                {
                    if(i == this.untereKoordinate + 1)
                    {
                        if(j == this.linkeKoordinate - 1)
                        {
                            bildSrc = "pics/netz/untereLinkeEcke.png";
                        }
                        else
                        {
                            if(j == this.rechteKoordinate + 1)
                            {
                                bildSrc = "pics/netz/untereRechteEcke.png";
                            }
                            else
                            {
                                bildSrc = "pics/netz/untereKante.png";
                            }
                        }
                    }
                    else
                    {
                        if(j == this.linkeKoordinate - 1)
                        {
                            bildSrc = "pics/netz/linkeKante.png";
                        }
                        else
                        {
                            if(j == this.rechteKoordinate + 1)
                            {
                                bildSrc = "pics/netz/rechteKante.png";
                            }
                            else
                            {
                                bildSrc = "pics/netz/netz.png";
                                if(level.bounceList[i][j] == 1)
                                {
                                    document.querySelector("#netz").insertAdjacentHTML("beforeend", '<img id="' + feldID + 'Fuellung" src="pics/netz/dunkleFuellung.png" width="' + level.blockMaSe + '" height="' + level.blockMaSe + '"></img>');
                                    let objekt = document.querySelector("#" + feldID + "Fuellung");
                                    objekt.style.position = "absolute";
                                    objekt.style.top = i * level.blockMaSe + "px";
                                    objekt.style.left = j * level.blockMaSe + "px";
                                    objekt.style.opacity = "0.5";

                                    this.besondereFelder++;
                                }
                                else
                                {
                                    document.querySelector("#netz").insertAdjacentHTML("beforeend", '<img id="' + feldID + 'Fuellung" src="pics/netz/helleFuellung.png" width="' + level.blockMaSe + '" height="' + level.blockMaSe + '"></img>');
                                    let objekt = document.querySelector("#" + feldID + "Fuellung");
                                    objekt.style.position = "absolute";
                                    objekt.style.top = i * level.blockMaSe + "px";
                                    objekt.style.left = j * level.blockMaSe + "px";
                                    objekt.style.opacity = "0.25";
                                }
                            }
                        }
                    }
                }
                


                netzDiv.insertAdjacentHTML("beforeend", '<img id="' + feldID + '" src="' + bildSrc + '" width="' + level.blockMaSe + '" height="' + level.blockMaSe + '"></img>');
                
                let objekt = document.querySelector("#" + feldID);
                
                objekt.style.position = "absolute";
                objekt.style.top = i * level.blockMaSe + "px";
                objekt.style.left = j * level.blockMaSe + "px";

                
            }
        }
    }






    this.fangen = function()
    {
        let tierGefangen = false;
        let anzahlGefangenerTiere = 0;
        for(let i = 0; i < level.tierArray.length; i++)
        {
            

            if(level.tierArray[i].istVorhanden(this.obereKoordinate, this.untereKoordinate, this.linkeKoordinate, this.rechteKoordinate))
            {
                for(let j = 0; j < level.tierArray[i].bounceArray.length; j++)
                {
                    if(this.obereKoordinate - 1 <= j && this.untereKoordinate + 1 >= j)
                    {
                        //console.log(this.linkeKoordinate - 1);
                        if(this.linkeKoordinate - 1 >= 0)
                        {
                            level.tierArray[i].bounceArray[j][this.linkeKoordinate - 1] = 1;
                        }
                        
                        if(this.rechteKoordinate + 1 <= level.tierArray[i].bounceArray[0].length - 1)
                        {
                            level.tierArray[i].bounceArray[j][this.rechteKoordinate + 1] = 1;
                        }
                    }
                }


                for(let j = 0; j < level.tierArray[i].bounceArray[0].length; j++)
                {
                    
                    if(this.linkeKoordinate - 1 <= j && this.rechteKoordinate + 1 >= j)
                    {
                        if(this.obereKoordinate - 1 >= 0)
                        {
                            level.tierArray[i].bounceArray[this.obereKoordinate - 1][j] = 1;
                        }
                        if(this.untereKoordinate + 1 <= level.tierArray[i].bounceArray.length - 1)
                        {
                            level.tierArray[i].bounceArray[this.untereKoordinate + 1][j] = 1;
                        }

                    }
                }
                
                tierGefangen = true;
                anzahlGefangenerTiere++;
                this.gefangeneTiereArray.push(i);
            }
            else
            {
                for(let j = 0; j < level.tierArray[i].bounceArray.length; j++)
                {
                    if(this.obereKoordinate <= j && this.untereKoordinate >= j)
                    {
                        level.tierArray[i].bounceArray[j][this.linkeKoordinate] = 1;
                        level.tierArray[i].bounceArray[j][this.rechteKoordinate] = 1;
                    }
                }

                for(let j = 0; j < level.tierArray[i].bounceArray[0].length; j++)
                {
                    if(this.linkeKoordinate<= j && this.rechteKoordinate >= j)
                    {
                        level.tierArray[i].bounceArray[this.obereKoordinate][j] = 1;
                        level.tierArray[i].bounceArray[this.untereKoordinate][j] = 1;
                    }
                }

            }
        }

        if(tierGefangen)
        {
            let anzahlFelder = (this.untereKoordinate - this.obereKoordinate + 1) * (this.rechteKoordinate - this.linkeKoordinate + 1);
            
            this.rechnungErscheint();

            this.timerTiergefangen = setTimeout(()=>
            {
                this.eingabeUeberpruefen(0);
                this.einmal1 = true;
                //this.netzAuswerfbar = true;
            }, anzahlFelder * this.stabilitaet + (this.grundStabilitaet * anzahlFelder / 12) / Math.pow(anzahlFelder, 1.65));

        }
        else
        {
            setTimeout(()=>
            {
                //this.eingabeUeberpruefen(0);
                this.netzAufloesen();
                this.netzAuswerfbar = true;
            }, this.grundStabilitaet / 320);
        }
    }






    this.rechnungErscheint = function()
    {

        let wertX = Math.abs(this.rechteKoordinate - this.linkeKoordinate) + 1;
        let wertY = Math.abs(this.untereKoordinate - this.obereKoordinate) + 1;

        rechnungsFeld.style.display = "initial";
        this.seiteBeschriften(wertY, "Y");
        this.seiteBeschriften(wertX, "X");


        this.ergebnis = wertX * wertY - this.besondereFelder;
        console.log(this.ergebnis);
        if(this.einmal1)
        {
            this.rechnungSchreiben(wertX, wertY);
            this.einmal1 = false;
        }
    }






    this.seiteBeschriften = function(wert, seite)
    {
        for(let i = 0; i < wert; i++)
        {
            let id = "wert"+ seite + i;
            seiten.insertAdjacentHTML("beforeend", '<div id="' + id + '" class="rechnung"><p> ' + (i + 1) + '</p></div>');
            
            let element = document.querySelector("#" + id);

            if(seite == "X")
            {
                element.style.top = (this.obereKoordinate - 1.25) * level.blockMaSe + "px";
                element.style.left = (this.linkeKoordinate + i) * level.blockMaSe + "px";
                element.style.width = level.blockMaSe + "px";
            }
            else
            {
                element.style.top = (this.obereKoordinate + i) * level.blockMaSe + "px";
                element.style.left = (this.linkeKoordinate - 1.25) * level.blockMaSe + "px";
                element.style.width = level.blockMaSe + "px";
            }

            document.querySelector("#" + id + " p").style.fontSize = level.blockMaSe * 0.9 + "px";
            document.querySelector("#" + id + " p").style.color = "#00000077"; //class?
            
            if(i + 1 == wert)
            {
                element.style.width = level.blockMaSe + "px";
                element.style.borderRadius = level.blockMaSe / 8 + "px";
                element.style.backgroundColor = "#FFFFFFAA";
                document.querySelector("#" + id + " p").style.color = "#000000";
            }
        }
    }






    this.rechnungSchreiben = function(wertX, wertY)
    {   
        //let string = '<form>   <input type="text" id="eingabeFeld" maxlength="3" autocomplete="off">   <input id="bestaetigungsFeld" type="submit" value="Fertig">   </form>'; //&bull; &times; sind Multiplikations-Zeichen
        formInput.insertAdjacentHTML("beforeend", '<form id="form"></form>');
        document.querySelector("#form").insertAdjacentHTML("beforeend", '<input type="text" id="eingabeFeld" maxlength="3" autocomplete="off">  <input id="bestaetigungsFeld" type="submit" value="Fertig">');
        formInput.style.marginLeft = level.blockMaSe / 6 + "px"
        

        let ergebnisFeldBreite = level.felderBreite * 0.5;
        let ergebnisFeldHoehe = level.felderHoehe * 0.5;
        let abstandXZumRand = (level.felderBreite - ergebnisFeldBreite) / 2;
        let abstandYZumRand = (level.felderHoehe - ergebnisFeldHoehe) / 2;

        let elementRechnung = document.querySelector("#rechnung");
        let elementText = document.querySelector("#rechnungsText");
        let elementEingabe = document.querySelector("#eingabeFeld");
        let elementBestaetigung = document.querySelector("#bestaetigungsFeld");
        


        elementRechnung.style.left = abstandXZumRand + "px";
        elementRechnung.style.top = abstandYZumRand + "px";
        elementRechnung.style.width = ergebnisFeldBreite + "px";
        elementRechnung.style.height = ergebnisFeldHoehe + "px";
        elementRechnung.style.borderRadius = level.blockMaSe + "px";
        elementRechnung.style.display = "flex";


        this.eingabePlatzieren(elementEingabe);
        this.submitPlatzieren(elementBestaetigung);


        if(this.besondereFelder == 0)
        {
            elementText.innerHTML = wertY + " &bull; " + wertX + " = ";

            elementRechnung.style.padding = ((ergebnisFeldHoehe / 2) - (level.blockMaSe / 2)) + "px " + 0 + "px"; 
            elementText.style.fontSize = level.blockMaSe * 0.9 + "px";
        }
        else
        {
            elementText.innerHTML = wertY + " &bull; " + wertX + " - " + this.besondereFelder + " = ";
        
            elementRechnung.style.padding = ((ergebnisFeldHoehe / 2) - (level.blockMaSe / 2)) + "px " + 0 + "px"; 
            elementText.style.fontSize = level.blockMaSe * 0.9 + "px";
        }

        
        document.querySelector("form").addEventListener("submit", (event)=>
        {
            this.eingabeUeberpruefen(event);
            //event.preventDefault();
        });
    }



    this.eingabePlatzieren = function(element)
    {
        element.style.width = level.blockMaSe * 1.6 + "px";
        element.style.height = level.blockMaSe + "px";
        element.style.fontSize = level.blockMaSe * 0.9 + "px";
        element.style.border = "2px solid #000000"; //class input
        element.style.borderRadius = level.blockMaSe * 0.2 + "px";
        element.focus();
    }


    this.submitPlatzieren = function(element)
    {
        element.style.width = level.blockMaSe * 2.75 + "px";
        element.style.height = level.blockMaSe * 1.2 + "px";
        element.style.fontSize = level.blockMaSe * 0.9 + "px";
        element.style.border = "2px solid #000000"; //class input
        element.style.borderRadius = level.blockMaSe * 0.2 + "px";
    }

    




    this.eingabeUeberpruefen = function(event)
    {
        clearTimeout(this.timerTiergefangen);

        this.kommentarPlatzieren(rechnungsKommentar);
        

        let eingabe = document.querySelector("#eingabeFeld").value;
        darfZurueck = false;

        if(eingabe == "")
        {
            if(event == 0)
            {
                rechnungsKommentar.innerText = "Du hast leider kein Ergebnis eingegeben.";

                formInput.innerHTML = "";
                formInput.insertAdjacentHTML("beforeend", '<input id="verstandenFeld" type="submit" value="Weiter">');
                this.submitPlatzieren(document.querySelector("#verstandenFeld"));

                rechnungsText.innerText += "    " + eingabe;

                document.querySelector("#verstandenFeld").addEventListener("click",()=>
                {
                    this.netzAufloesen();
                })
            }
            else
            {
                rechnungsKommentar.innerText = "Du musst ein Ergebnis eingeben.";
                document.querySelector("#eingabeFeld").focus();
            }

        }
        else
        {
            if(eingabe == this.ergebnis)
            {
                rechnungsKommentar.innerText = "Super du hast das richtige Ergebnis ausgerechnet.";
                formInput.innerHTML = "";
                rechnungsText.innerText += " " + eingabe;
                rechnungsText.color = "#22CC22";

                
                
                let array = this.gefangeneAuswerten();



                setTimeout(()=>
                {
                    rechnungsText.style.display = "initial";
                    gefangenBild.innerHTML = "";
                    level.tierArray = array;
                    this.netzAufloesen()
                }, 2500 * this.gefangeneTiereArray.length + 2500);
            }
            else
            {
                rechnungsKommentar.innerHTML = "Leider ist das Ergebnis falsch. Das richtige Ergebnis lautet: " + this.ergebnis;
                formInput.innerHTML = "";
                
                formInput.insertAdjacentHTML("beforeend", '<input id="verstandenFeld" type="submit" value="Weiter">');
                this.submitPlatzieren(document.querySelector("#verstandenFeld"));

                rechnungsText.innerText += " " + eingabe;
                rechnungsText.color = "#CC2222";


                document.querySelector("#verstandenFeld").addEventListener("click",()=>
                {
                    this.netzAufloesen();
                })
                //setTimeout(()=>{this.netzAufloesen()}, 1000);
            }
        }
        if(event != 0)
        {
            event.preventDefault();
        }
    }






    this.kommentarPlatzieren = function(element)
    {
        element.style.display       =   "initial";
        element.style.left          =   level.felderBreite / 2.12 + "px";
        element.style.top           =   level.felderHoehe / 3.9 + "px";;
        element.style.width         =   level.blockMaSe * 8 + "px";
        element.style.height        =   level.blockMaSe * 2.1 + "px";;
        element.style.fontSize      =   level.blockMaSe * 0.55 + "px";
        element.style.border        =   "2px solid #000000";
        element.style.borderRadius  =   level.blockMaSe / 8 + "px";
        element.style.zIndex        =   "10";
        element.style.padding       =   "5px"; //????
    }






    this.gefangeneAuswerten = function()
    {   
        let array = [];
        zaehler = 0;

        setTimeout(()=>
        {
            rechnungsText.style.display = "none";
        }, 2500);

        for(let i = 0; i < level.tierArray.length; i++)
        {
            //console.log(level.tierArray);
            let gefangen = false;
            for(let j = 0; j < this.gefangeneTiereArray.length; j++)
            {
                if(this.gefangeneTiereArray[j] == i)
                {
                    gefangen = true;
                    zaehler++;
                }
            }


            if(!gefangen)
            {
                array.push(level.tierArray[i]);
            }
            else
            {
                clearInterval(level.tierArray[i].veraendern);
                setTimeout(()=>
                {
                    level.tierArray[i].bildLoeschen();
                    gefangenBild.innerHTML = "";
                    
                    setTimeout(()=>
                    {
                        level.tierArray[i].tierBildZeigen(zaehler);
                    }, 100)
                }, zaehler * 2500);
            }
        }
        return array;
    }







    this.netzAufloesen = function()
    {
        this.netzAuswerfbar = true;
        for(let i = 0; i < level.tierArray.length; i++)
        {
            level.tierArray[i].bounceArray = JSON.parse(JSON.stringify(level.bounceList));
        }

        this.clearNetz();
        this.rechnungAufloesen()

        if(level.tierArray <= 0 && levelBeendet)
        {
            level.geschafft();
        }
    }






    this.rechnungAufloesen = function()
    {
        //this.clearNetz();
        //document.querySelector("#rechnung").innerHTML = "";
        formInput.innerHTML = "";
        rechnungsText.innerHTML = "";
        rechnungsText.style.display = "initial";
        seiten.innerHTML = "";
        rechnungsKommentar.innerHTML = "";
        rechnungsKommentar.style.display = "none";
        rechnungsFeld.style.display = "none";
        this.besondereFelder = 0;
        this.ergebnis = 0;
        this.einmal1 = true;
        this.einmal2 = true;
        darfZurueck = true;
        this.gefangeneTiereArray = [];
    }






    this.schattenErscheint = function()
    {
        let zaehler = 0;

        for(let i = this.obereKoordinate - 1; i <= this.untereKoordinate + 1; i++)
        {
            for(let j = this.linkeKoordinate - 1 ; j <= this.rechteKoordinate + 1; j++)
            {
                feldID = "img" + zaehler + "schatten";
                zaehler++;

                let bildSrc

        
                if(i == this.obereKoordinate - 1)
                {
                    if(j == this.linkeKoordinate - 1)
                    {
                        bildSrc = "pics/schatten/obereLinkeEcke.png";
                    }
                    else
                    {
                        if(j == this.rechteKoordinate + 1)
                        {
                            bildSrc = "pics/schatten/obereRechteEcke.png";
                        }
                        else
                        {
                            bildSrc = "pics/schatten/obereKante.png";
                        }
                    }
                }
                else
                {
                    if(i == this.untereKoordinate + 1)
                    {
                        if(j == this.linkeKoordinate - 1)
                        {
                            bildSrc = "pics/schatten/untereLinkeEcke.png";
                        }
                        else
                        {
                            if(j == this.rechteKoordinate + 1)
                            {
                                bildSrc = "pics/schatten/untereRechteEcke.png";
                            }
                            else
                            {
                                bildSrc = "pics/schatten/untereKante.png";
                            }
                        }
                    }
                    else
                    {
                        if(j == this.linkeKoordinate - 1)
                        {
                            bildSrc = "pics/schatten/linkeKante.png";
                        }
                        else
                        {
                            if(j == this.rechteKoordinate + 1)
                            {
                                bildSrc = "pics/schatten/rechteKante.png";
                            }
                            else
                            {
                                bildSrc = "pics/schatten/schatten.png";
                            }
                        }
                    }
                }
                


                netzDiv.insertAdjacentHTML("beforeend", '<img id="' + feldID + '" src="' + bildSrc + '" width="' + level.blockMaSe + '" height="' + level.blockMaSe + '"></img>');
                
                let objekt = document.querySelector("#" + feldID);
                
                objekt.style.position = "absolute";
                objekt.style.top = i * level.blockMaSe + "px";
                objekt.style.left = j * level.blockMaSe + "px";
                objekt.style.opacity = "0.5";

                
            }
        }
    }
}



















//Abschnitt 3 Tier und der damit zusammen hängende Punkt
function Punkt(id, x, y)
{
    this.id = id;
    this.x = x;
    this.y = y;
    this.spalte = Math.floor(x / level.blockMaSe);
    this.zeile  = Math.floor(y / level.blockMaSe);
}






//                                    zwischen -180 und 180 DEG
function Tier(id, tierArt, x, y, width, height, winkel, winkelVariation, minGeschwindigkeit, maxGeschwindigkeit, bildSrc)
{
    //Stats

    this.id = id;

    this.tierArt =  tierArt;

    this.positionspunkt = new Punkt(id + "positionspunkt", (x / level.anzahlX)  * level.felderBreite, (y / level.anzahlY) * level.felderHoehe);

    
    this.width = level.blockMaSe * width;
    this.height = level.blockMaSe * height;


    this.mittelpunkt = new Punkt(id + "mittelpunkt", this.positionspunkt.x + (this.width / 2), this.positionspunkt.y + (this.height / 2));

    this.mittelpunktErmitteln = function()
    {
        return new Punkt(id + "mittelpunkt", this.positionspunkt.x + (this.width / 2), this.positionspunkt.y + (this.height / 2));
    }


    this.winkel = (winkel / 360 * (Math.PI * 2)); 
    this.winkelVariation = winkelVariation / 360 * (Math.PI * 2);
    this.aktuellerWinkel = 0;


    this.minGeschwindigkeit = level.blockMaSe * minGeschwindigkeit / 60;
    this.maxGeschwindigkeit = level.blockMaSe * maxGeschwindigkeit / 60;
    this.allgemeineGeschwindigkeit = Math.random() * (this.maxGeschwindigkeit - this.minGeschwindigkeit) + this.minGeschwindigkeit;
    

    this.richtungX = 0;
    this.richtungY = 0;
    

    this.geschwindigkeitX = 0;
    this.geschwindigkeitY = 0;


    this.bildSrc = bildSrc;
    document.querySelector("#tiere").insertAdjacentHTML("beforeend", '<img id="' + id + '" src="' + this.bildSrc + '" width="' + this.width + '" height="' + this.height + '"></img>');
    
    
    this.element = document.querySelector("#" + id);
    this.element.style.transition = "transform 0.5s";
    

    this.kollisionsPunktArray = []; //kollisionsLinie
    this.anzahlPunkte = 5; //mit wie vielen Punkten der kollisionsPunktArray gefuellt wird
    

    this.bounceArray = JSON.parse(JSON.stringify(level.bounceList));


    this.veraendern;








//Abschnitt (Tier-Funktionen)
    
    this.einfachBewegen = async function()
    {
        await this.bewegen();
        this.kollision(this.bounceArray);
    }



    this.positionieren = function()
    {
        this.element.style.left = this.positionspunkt.x + "px";
        this.element.style.top = this.positionspunkt.y + "px";
    }



    this.bewegen = async function()
    {
        this.positionspunkt.x = this.positionspunkt.x + this.geschwindigkeitX * this.richtungX;
        this.positionspunkt.y = this.positionspunkt.y + this.geschwindigkeitY * this.richtungY;

        this.mittelpunkt.x = this.mittelpunkt.x + this.geschwindigkeitX * this.richtungX;
        this.mittelpunkt.y = this.mittelpunkt.y + this.geschwindigkeitY * this.richtungY;
        
        this.positionieren();
        

        for(let i = 0; i < this.kollisionsPunktArray.length; i++)
        {
            this.kollisionsPunktArray[i].x = this.kollisionsPunktArray[i].x + this.geschwindigkeitX * this.richtungX;
            this.kollisionsPunktArray[i].y = this.kollisionsPunktArray[i].y + this.geschwindigkeitY * this.richtungY;
            //this.kollisionsPunktArray[i].positionieren();
        }
    }







    this.kollision = async function(kollisionsArray)
    {
        for(let i = 0; i < this.kollisionsPunktArray.length; i++)
        {
            let kollision = false;

            if(this.kollisionsPunktArray[i].zeile != Math.floor(this.kollisionsPunktArray[i].y / level.blockMaSe) || this.kollisionsPunktArray[i].spalte != Math.floor(this.kollisionsPunktArray[i].x / level.blockMaSe))
            {
                let differenzX = Math.floor(this.kollisionsPunktArray[i].x / level.blockMaSe) - this.kollisionsPunktArray[i].spalte;
                let differenzY = Math.floor(this.kollisionsPunktArray[i].y / level.blockMaSe) - this.kollisionsPunktArray[i].zeile;

                if(!(this.kollisionsPunktArray[i].spalte + differenzX >= 0 && this.kollisionsPunktArray[i].spalte + differenzX < kollisionsArray[0].length))
                {
                    this.winkelAktualisieren(this.richtungX * this.geschwindigkeitX, this.richtungY * this.geschwindigkeitY);
                    this.richtungX = this.richtungX * -1;
                    kollision = true;
                }
                else
                {
                    if(kollisionsArray[this.kollisionsPunktArray[i].zeile][this.kollisionsPunktArray[i].spalte + differenzX] == 1)
                        
                    {
                        this.winkelAktualisieren(this.richtungX * this.geschwindigkeitX, this.richtungY * this.geschwindigkeitY);
                        this.richtungX = this.richtungX * -1;
                        kollision = true;
                    }
                    else
                    {
                        this.kollisionsPunktArray[i].spalte = this.kollisionsPunktArray[i].spalte + differenzX;
                    }
                }
                
                if(!(this.kollisionsPunktArray[i].zeile + differenzY >= 0 && this.kollisionsPunktArray[i].zeile + differenzY < kollisionsArray.length))
                {
                    this.richtungY = this.richtungY * -1;
                        this.winkelAktualisieren(this.richtungY * this.geschwindigkeitY, this.richtungX * this.geschwindigkeitX);
                        kollision = true;
                }
                else
                {
                    if(kollisionsArray[this.kollisionsPunktArray[i].zeile + differenzY][this.kollisionsPunktArray[i].spalte] == 1)
                    {
                        
                        this.richtungY = this.richtungY * -1;
                        this.winkelAktualisieren(this.richtungY * this.geschwindigkeitY, this.richtungX * this.geschwindigkeitX);
                        kollision = true;
                        
                    }
                    else
                    {
                        this.kollisionsPunktArray[i].zeile = this.kollisionsPunktArray[i].zeile + differenzY;
                    }
                }
            }

            if(kollision)
            {
                await this.bewegen();
                break;
            }
        } 
    }







    this.kollisionsLinie = function()
    {
        let piAbstand = Math.PI / (this.anzahlPunkte - 1);

        let halbeTierLaenge = this.height / 2;
        let halbeTierBreite = this.width / 2;

        

        for(let i = 0; i < this.anzahlPunkte; i++)
        {
            this.kollisionsPunktArray[i] = new Punkt(this.id + "p" + i, Math.cos(i * piAbstand) * halbeTierBreite + this.mittelpunkt.x, Math.sin(i * piAbstand) * halbeTierLaenge + this.mittelpunkt.y);

            this.kollisionsPunktArray[i].winkelZumPunkt = Math.PI + Math.atan((this.kollisionsPunktArray[i].x - this.mittelpunkt.x) / (this.kollisionsPunktArray[i].y - this.mittelpunkt.y));
           
            

            this.kollisionsPunktArray[i].drehenUmPunkt = function(mittelpunkt, teilWinkel)
            {
                let hypotenuse = Math.sqrt(Math.pow((this.x - mittelpunkt.x), 2) + Math.pow((this.y - mittelpunkt.y), 2));
                this.winkelZumPunkt = this.winkelZumPunkt + teilWinkel;
                this.y = mittelpunkt.y + Math.cos(this.winkelZumPunkt) * hypotenuse;
                this.x = mittelpunkt.x + Math.sin(this.winkelZumPunkt) * hypotenuse;
            }
        }
    }   






    this.winkelAktualisieren = function(ankathete, gegenkathete)
    {
        let differenzWinkel = Math.atan(ankathete / gegenkathete) * 2;
        this.drehen(differenzWinkel);
    }



    this.drehen = function(differenzWinkel)
    {
        this.aktuellerWinkel = this.aktuellerWinkel + differenzWinkel;
        
        this.element.style.transform = "rotate(" + this.aktuellerWinkel + "rad)";
        this.kollisionsLinieDrehen(differenzWinkel, 20, 400);
    }



    this.kollisionsLinieDrehen = function(differenzWinkel, anzahlSchritte, gesamteZeit)
    {
        let teilWinkel = differenzWinkel / anzahlSchritte;
        let teilZeit = gesamteZeit / anzahlSchritte;

        for(let i = 1; i <= anzahlSchritte; i++)
        {
            for(let j = 0; j < this.kollisionsPunktArray.length; j++)
            {
                const drehen = setTimeout( ()=>
                {
                    this.kollisionsPunktArray[j].drehenUmPunkt(this.mittelpunkt, - teilWinkel);
                },teilZeit * i)
            }
        }
    }






    this.istVorhanden = function(obereKoordinate, untereKoordinate, linkeKoordinate, rechteKoordinate)
    {
        for(let i = 0; i < this.kollisionsPunktArray.length; i++)
        {
            if(obereKoordinate > this.kollisionsPunktArray[i].zeile || untereKoordinate < this.kollisionsPunktArray[i].zeile)
            {
                return false;
            }

            if(linkeKoordinate > this.kollisionsPunktArray[i].spalte || rechteKoordinate < this.kollisionsPunktArray[i].spalte)
            {
                return false;
            }
        }
        return true
    }






    this.statsGenerieren = function()
    {
        winkel = Math.PI - this.winkel;

        this.geschwindigkeitX = Math.abs(Math.sin(winkel) * this.allgemeineGeschwindigkeit);
        this.geschwindigkeitY = Math.abs(Math.cos(winkel) * this.allgemeineGeschwindigkeit);

        this.richtungX = (Math.sin(winkel) * this.allgemeineGeschwindigkeit) / this.geschwindigkeitX;
        this.richtungY = (Math.cos(winkel) * this.allgemeineGeschwindigkeit) / this.geschwindigkeitY;
        
    }







    this.statsVeraendern = function(zeit)
    {
        this.veraendern = setInterval(()=>
        {
            let zusaetzlicherWinkel = Math.random() * this.winkelVariation * 2 - this.winkelVariation;
            
            this.drehen(zusaetzlicherWinkel);
            
            this.allgemeineGeschwindigkeit = Math.random() * (this.maxGeschwindigkeit - this.minGeschwindigkeit) + this.minGeschwindigkeit;

            this.geschwindigkeitX = Math.abs(Math.sin(Math.PI - this.aktuellerWinkel) * this.allgemeineGeschwindigkeit);
            this.geschwindigkeitY = Math.abs(Math.cos(Math.PI - this.aktuellerWinkel) * this.allgemeineGeschwindigkeit);

            this.richtungX = (Math.sin(Math.PI - this.aktuellerWinkel) * this.allgemeineGeschwindigkeit) / this.geschwindigkeitX;
            this.richtungY = (Math.cos(Math.PI - this.aktuellerWinkel) * this.allgemeineGeschwindigkeit) / this.geschwindigkeitY;

            
        }, zeit);
    }






    this.bildLoeschen = function()
    {
        this.element.remove();
    }







    this.tierBildZeigen = function(zahl)
    {
        
        gefangenBild.insertAdjacentHTML("beforeend", '<img id="bild' + zahl + '" src="' + this.bildSrc + '">');


        let ergebnisFeldBreite = level.felderHoehe * 0.35;
        let ergebnisFeldHoehe = level.felderBreite * 0.35;
        let abstandXZumRand = (level.felderBreite - ergebnisFeldBreite) / 2;
        let abstandYZumRand = (level.felderHoehe - ergebnisFeldHoehe) / 2;
        
        let element = document.querySelector("#bild" + zahl);
        
        
        element.style.left = abstandXZumRand + "px";
        element.style.top = abstandYZumRand + "px";
        
        
        element.style.height = ergebnisFeldHoehe + "px";

        element.style.transform = "rotate(" + 90 + "deg)";
        element.style.zIndex = "15";
        

        rechnungsKommentar.innerText = "Du hast " + this.tierArt + " gefangen.";
    }
}