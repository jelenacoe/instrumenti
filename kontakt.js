function provera(e) {
    var forma = document.forma;
    var ime = forma.ime;
    var email = forma.email;
    var poruka = forma.poruka;

    var obavestenje = document.getElementById("obavestenje");

    try {
        if (ime.value == "" ||
            email.value == "" ||
            poruka.value == "") {
                obavestenje.style.display = "block";
                throw "Neophodno je popuniti sva polja";
               
                // ukoliko se desi throw, onda se odmah skace na catch i ne
                // izvrsava se dalje kod u try bloku,
                // vrednost parametra error u catch-u postaje ono sto smo stavili nakon throw
        }
        else {
            if (ime.value.length < 4) {
                obavestenje.style.display = "block";
                throw "Potpis mora sadržati minimum 4 karaktera;"
            } else if (ime.value.length > 10) {
                obavestenje.style.display = "block";
                throw "Potpis ne može sadržati preko 10 karkatera";
            } else if (proveraMaila(email.value) == false) {
                obavestenje.style.display = "block";
                throw "E-mail adresa nije pravilno uneta"
            }
        }
        obavestenje.style.display = "none";
        ime.value = email.value = poruka.value = "";
        alert("Poruka uspesno poslata");
    } catch (error) {
        obavestenje.innerHTML = error;
    }

}

// proveraMaila prolazi kroz string koji je ulazni parametar
// uzima svaki karakter i gleda da li je '@', 
// ukoliko jeste promenljiva znak postaje true
// ukoliko ni jedan nije promenljiva znak ce ostati false

function proveraMaila(tekst) {
    var znak = false;
    for (var i = 0; i < tekst.length; i++) {
        if (tekst.charAt(i) == '@') {
           znak = true;
        }
    }
    return znak;
}


