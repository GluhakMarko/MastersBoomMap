<p align="center"><img src="client/src/components/design/boomLogo.svg" alt="boomMap" title="boomMap" width="500" height="130"/></p>

## O projektu

Namen rešitve je ozaveščanje voznikov, reševalnih služb in tistih, ki se jim mudi, kje povečati potrpljenje in zmanjšati hitrost. V službi reševanja življenj šteje vsaka sekunda, želimo biti del, ki pripomore k reševanju življenj in preprečevanju ogrožanja teh. S pomočjo naše spletne stranih, lahko reševalci preventivno pripravijo enote in proces steče hitreje.

## Uporabljene tehnologije

- front-end: React
- back-end: Node.js ft. Express
- podatkovna baza: MongoDB
- strojno učenje: Python

## Funkcionalnosti

### Zemljevid

Zemljevid prikazuje **nevarne odseke/kritične točke na slovenskih cestah**, kjer se po statističnih podatkih povzroči največ nesreč.
Omogočena je tudi možnost filtriranja po tipu kritičnosti (nizka, srednja, visoka), ter dodatni filtri glede na dan v tednu, vreme, površje, mesec v letu in čas.

### Statistika

Grafi prikazujejo predelane statistične podatke od leta 2014 do 2018. Prikazani so podatki o številu prometnih nesreč glede na različne filtre:

- vse nesreče v preteklih letih (2014-2018)
- število nesreč glede na posamezen dan v tednu
- glede na vreme, tip vozila, tip ceste, tip trčenja in nesreče, stanje prometa
- glede na intenzivnost poškodb (posebej tudi za intenzivnost v nedeljo in med prazniki)
- po spolu povzročitelja

## Namestitev rešitve

- Potrebujemo okolje z node.js(v10.15.3), npm(v6.4.1), mongodb(v4.0.9),
- Namestimo še globalne pakete "npm i -g nodemon" in "npm i -g concurrently"
- Zagotovimo delovanje MongoDB
- Postavimo se v direktorij projekta in v terminalu poženemo "npm run dev"
- Stran se naloži na localhost:3000, strežniški api pa je na voljo na localhost:5000

## Kdo smo

| [<img alt="GluhakMarko" src="client/src/components/design/markoG.svg" width="100">](https://github.com/MerceneX) | [<img alt="KonecnikMarusa" src="client/src/components/design/marusaK.svg" width="100">](https://github.com/marusakonecnik) | [<img alt="GornikPina" src="client/src/components/design/pinaG.svg" width="100">](https://github.com/Gornikpina) | [<img alt="FeherNatasa" src="client/src/components/design/natasaF.svg" width="100">](https://github.com/FeherNatasa) |
| :--------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: |
|                                   [Marko Gluhak](https://github.com/MerceneX)                                    |                                    [Maruša Konečnik](https://github.com/marusakonecnik)                                    |                                   [Pina Gornik](https://github.com/Gornikpina)                                   |                                    [Nataša Feher](https://github.com/FeherNatasa)                                    |
|                                               back-end razvijalec                                                |                                                       strojno učenje                                                       |                                               front-end razvijalka                                               |                                                 front-end razvijalka                                                 |
|                                            marko.mx.gluhak@gmail.com                                             |                                               marusa.konecnik@student.um.si                                                |                                            pina.gornik@student.um.si                                             |                                              natasa.feher@student.um.si                                              |

Smo mlada ekipa zagriženih študentov, ki želimo z našimi produkti prispevati k boljšemu jutri.

## Priprava okolja

1. Kloniranje repozitorija z "git clone https://github.com/MerceneX/BoomMap.git"
2. Odpremo nov projekt v WebStorm "EmptyProject" in kopiramo vsebino kloniranega direktorija
   v ta projekt
3. V WebStorm priporočam uporabo git bash terminala:  
   a) Setting > Tools > Terminal  
   b) Shell Path, navedemo pot do bash.exe datoteke, najdemo jo v \*/Git/bin/bash.exe
4. Zagon skript npm install, npm run client-install in npm i -g nodemon
5. Dodaja konfiguracije strežnika v WebStorm:  
   a) "Add new configuration"  
   b) "npm"  
   c) "package.json: /path-to-project-folder/package.json"  
   d) "Command: run"  
   e) "Scripts: dev"  
   f) "Ok"
6. Za posodobitev vseh paketov/odvisnosti poženemo "npm run update-all"
7. Potrebujemo tudi bazo MongoDB na portu 27017.
8. Strežnik poženemo z npm run dev
9. Napišemo .gitignore datoteko s sledečo vsebino:  
   "node_modules  
   client/node_modules  
   .idea
   README.md"

## Uporaba API

### Končne Točke

Atribut naslov poda kratek opis o tej poizvedbi, podatki vsebujejo polje objektov. Vsak od teh objektov je št. nesreč, ki ustrezajo pogoju poizvedbe, specificirane s prvim atributom objekta.

- GET api/graph/{id}  
  id: 23-37  
  Vnaprej pripravljene poizvedbe iz baze podatkov, v obliki JSON. Primer rezultata:  
  {  
   "naslov":"Nesreče glede na praznik",  
   "podatki":[
  {
  "dan":"Praznik",
  "nesrece":3222
  },
  {
  "dan":"Delovnik",
  "nesrece":119486
  }]}

## Namestitev

### FERI Portainer

1. Potrebno je zgraditi Docker slike kot je pripravljeno v Makefile po receptu "build-prod-from-master". Podatkovno bazo je potrebno namestiti samo prvič, če ne izvajamo posodobitev.
2. Za dostop do FERI Portainer rešitve, je potrebna uporaba ForcePoint VPN in prijava s študentsko identiteto.
3. Prijavimo se v Portainer na naslednji povezavi: https://zabojnik.informatika.uni-mb.si/portainer/#/auth s podatki pridobljeni od skrbnika go. Streharja.
4. Če nameščamo prvič je potrebno najprej ustvariti notranje omrežje zabojnikov.
5. Nato ustvarimo še trajni "volume" za podatkovno bazo.
6. Naložimo vse Docker slike (če namestitev posodabljamo, je potrebno ustaviti zabojnike in slike odtraniti pred ponovnim nalaganjem).
7. Ustvarimo zabojnik iz Docker slike za podatkovno bazo, ji pripnemo trajni zapis, ki smo ga predhodno ustvarili in prav tako zabojnik vključimo v ustvarjeno omrežje in dodelimo IP in hostname. Ne smemo pozabiti na izpostavitev porta navzven.
8. Enak postopek ponovimo za spletni strežnik z Node in uporabniški del React.
9. Pomembno je, da pravilno nastavimo tudi spremenljivke okolja (environment variables) v .env.production za odjemalca in strežnik. Strežnik potrebuje v spremenljivki "DBURI" IP zabojnika znotraj omrežja in "DBNAME" za ime podatkovne baze. Za .env.production odjemalca, pa potrebujemo le nastaviti "REACT_APP_SERVER" na https://varno-domov.si, da se podatko prenašajo preko HTTPS.
10. Arhitekturo si lahko ogledamo na spodnji fotografiji.

    ![Arhitektura Portainer Namestitve](/READMEAttachments/PortainerArchitecture.jpg)
