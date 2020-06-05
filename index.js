


// Isključuje prikaz korpe

// na ovaj nacin se dogadjaj vezuje za ceo dokument
// dogadjaje (onclick i slicno) vezujemo za elemente 
// tako sto ih navedemo u okviru HTML atributa,
// da bi dogadjaj vezali za celu stranicu koristimo ovaj nacin
// jer nemamo HTML element koji je pogodan za to
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        stilizujKorpu();
    }
};


if (!localStorage.korpa) {
    localStorage.korpa = "";
}

korpaBrojac();







function prikazInstrumenata() {
    // sekcija je html element section unutar koga prikazujemo sve instrumente
    var sekcija = document.getElementById('instrumenti');
    sekcija.innerHTML = "<h2>Najnovije u ponudi</h2><hr>";

    instrumenti.forEach(instrument => {
        sekcija.innerHTML += `
            <div class="instrument">
                <h3><a href="pojedinacno.html">${instrument.naziv}</a></h3>
                <img src="${instrument.slika}">
                <h3>Cena: <span> ${cenaFormat(instrument.cena)}</span></h3>
                <button onclick="korpaPlus(${instrument.id})" ><img src="img/cart.ico"> Dodaj u korpu</button>
            </div>
        `;
    });
}




function preuzmiInstrument(id){

    for (let i = 0; i < instrumenti.length; i++) {
        if (instrumenti[i].id == id) {
            return {
                naziv : instrumenti[i].naziv,
                slika : instrumenti[i].slika,
                cena  : instrumenti[i].cena,
                id : instrumenti[i].id
            };
        }
        
    }
}

// dobija kao ulazni parametar bool vrednost
// ukoliko je true, bice prikazana korpa
// ukoliko je false, sklanja prikaz korpe
function stilizujKorpu(prikaz) {
    let korpa = document.getElementById('korpa');
    let korpaProzor = document.getElementById('korpa-prozor');

    if (prikaz) {
        korpa.style.display = "block";
    } else {korpa.style.display = "none" }

    var korpaNiz = localStorage.korpa;
    
    korpaNiz = korpaNiz.split(',');
    korpaNiz.pop();
   
    
    if (korpaNiz.length > 0) {

        korpaProzor.innerHTML = "<h2>Vaša korpa</h2>";
        korpaProzor.innerHTML += `<table>
                                    <thead>
                                        <tr>
                                            <td>Naziv instrumenta</td>
                                            <td>Slika</td>
                                            <td>Cena</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody id="tabela"></tbody>
                                    
                                  </table>`;
        let tabela = document.getElementById("tabela");
        tabela.innerHTML = "";
        korpaNiz.forEach(id => {
            
            instrument =  preuzmiInstrument(id);
           
            tabela.innerHTML += `
                <tr>
                    <td><a href="pojedinacno.html">${instrument.naziv}</a></td>
                    <td><img src="${instrument.slika}"></td>
                    <td>${cenaFormat(instrument.cena)}</td>
                    <td><button onclick="brisanjeIzKorpe(${instrument.id})">X</button></td>
                </tr> 
            `
            
        });
    } else {
        korpaProzor.innerHTML = `
            <h2>Trenutno nema proizvoda u korpi</h2>
        `
    }
   
    
}


function brisanjeIzKorpe(id){
    let korpaNiz = localStorage.korpa;
    let zaIzmenu = id + ",";
    
    korpaNiz = korpaNiz.replace(zaIzmenu, '');

    
    localStorage.korpa = korpaNiz;
    korpaBrojac();
    stilizujKorpu(true);

}


// Ova funkcija ima ulogu da nam formatira 
// prikaz brojeva, tako da svake 3 cifre budu odvojene tackom
// a decimalni brojevi zarezom

function cenaFormat(cena) { // 169943
    let novaCena = cena.toFixed(2).toString(); // "169943.00"
    let iznos = novaCena.split("."); // ["169943", "00"] 
    let bezOstatka = iznos[0]; // "169943"
    let ostatak = iznos[1]; // "00"
    let niz = bezOstatka.split(''); // ["1", "6", "9", "9", "4", "3"]

    niz = niz.reverse();  // ["3", "4", "9", "9", "6","1"]
    niz.splice(3, 0, "."); // ["3", "4", "9", ".", "9", "6","1"]
    if (niz.length > 7) { niz.splice(7, 0, "."); }
    
    niz = niz.reverse(); //  ["1", "6", "9", ".", "9", "4", "3"]
    bezOstatka = niz.join(""); // "169.945"

    novaCena = bezOstatka + "," + ostatak + ' rsd'; // "169.945,00 rsd"
    return novaCena;
    
}


function korpaPlus(id) {
    localStorage.korpa += id + ","; 
    korpaBrojac();
}





function prikazKorpe() {
    stilizujKorpu(true);
}

function korpaBrojac() {
    var e = document.getElementById("korpa-brojac");
    var korpaNiz = localStorage.korpa; // "1,5,7,11,"
    korpaNiz = korpaNiz.split(','); // ["1", "5", "7", "11", ""]
    
    // delimo string na niz, tamo gde je zarez 

    korpaNiz.pop(); // brise poslednji element iz niza
    e.innerHTML = korpaNiz.length;  
}

prikazInstrumenata();
stilizujKorpu();


