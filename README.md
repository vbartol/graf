Ovaj projekt je napravljen kao zadatak za Visoku školu za informacijske tehnologije Zagreb - Računalna grafika.

Igrica je pojednostavljena verzija "Data wing" igrice i sastoji se od:

-   Track - u njemu su pohranjene koordinate za iscrtavanje polygona.
-   Polygon - sastavljen od koordirana Track-a
-   Graphics - metoda koja iscrtava polygon na ekran
-   Rect - (Rectangle) - obilježava pravokutnik koji predstavlja finish line(kraj utrke)
-   Sprite - učitava asset (this.load.image('ship', 'ship.png')) i postaje raketa kojom upravljamo kursorima kroz polygon

Program funkcionira na ovaj način:

1) U preload-u se učita raketa(asset)
2) U create dijelu se učitaju koordinate, predaju se polygonu, iscrta se polygon i pravokutnik, učita se i postavi sprite i dodaje se kursor(pomoću njega upravljamo spritom)
3) U update dijelu se provjerava jer sprite ušao u finish line (ako je vrijeme se zaustavlja),
    jer sprite unutar polygona (ako je onda ima mogućnost micanja),
    ako nije provjerava se gdje se collision dogodio i
    ovisno gdje se collision dogodio odbija se sprite od polygona i brzina mu se smanji,
    na kraju update-a postavljeno je izraćunavanje vremena u sekundama
