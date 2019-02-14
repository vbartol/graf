Igrica bi trebala simulirati igricu Data wing:

assert- this.load.image('ship', 'ship.png');

Ovaj projekt je napravljen kao zadatak za Visoku školu za informacijske tehnologije Zagreb - Računalna grafika.

Projekt je definiran kao kopija igrice Data wing:

-   Track - u njemu su pohranjene koordinate za iscrtavanje polygona.
-   Polygon - sastavljen od koordirana track-a
-   Graphics - iscrtava polygon na ekran
-   Rect - (Rectangle) - obilježava pravokutnik koji predstavlja 
-   Sprite - koristi učitava assert i postaje raketa kojom upravljamo kroz polygon

Program funkcionira na ovaj način:

1) U preload-u se učita slika
2) U create dijelu se učitaju koordinate, predaju se polygonu, iscrta se polygon i pravokutnik, učita se i postavi sprite i doda se kursor     i pozicija za text
3) U update dijelu se provjerava jel sprite ušao u finish line, ako je vrijeme se zaustavlja
    jel sprite unutar polygona (ako je onda ima mogućnost micanja objekta),
    ako nije provjerava se gdje se collision dogodio i
    ovisno gdje se collision dogodio odbija se sprite od polygona pod određenim kutem i brzina mu je smanjena
4) Na kraju update-a postavljeno je izraćunavanje vremena 
