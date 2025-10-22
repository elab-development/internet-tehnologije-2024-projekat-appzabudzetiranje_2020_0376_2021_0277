#  Web aplikacija za budžetiranje

Aplikacija omogućava korisnicima jednostavno praćenje svojih individualnih i zajedničkih troškova.  
Cilj je da se olakša upravljanje finansijama i evidencija dugovanja između više korisnika.

---

## Funkcionalnosti

-  **Dodavanje troškova**  
  Mogućnost dodavanja pojedinačnih ili grupnih troškova, uz selektovanje kategorije za svaki trošak.

- **Pregled troškova**  
    - Pregled **svih troškova**  
    - Filtriranje po **kategorijama**  
    - Filtriranje po **datumu**


-  **Pregled prijatelja**  
    - Lista prijatelja sa mogućnošću **izmena** i **brisanja** njihovih podataka  
    - Pregled **pojedinačnog prijatelja**

-  **Pregled dugovanja**  
    - Evidencija dugovanja prema drugim korisnicima  


---

#  Instalacija
## Kloniranje projekta
 
- Klonirati repozitorijum komandom ` git clone https://github.com/elab-development/internet-tehnologije-2024-projekat-appzabudzetiranje_2020_0376_2021_0277.git` na željenu destinaciju na vašem računaru
- U željenom tekstualnom editoru otvoriti klonirani projekat (preporuka VSCode)
 
## Pokretanje Laravel backend-a
 
- Pozicionirati se u budzetiranje-app-back folder komandom `cd budzetiranje-app-back`
- Instalirati composer komandom `composer install`
- Kopirati .env.example fajl u novi .env fajl i podesiti informacije o konekciji sa bazom: DB_PORT, DB_USERNAME, DB_PASSWORD, DB_HOST
- Popuniti bazu podacima komandom `php artisan migrate:fresh --seed`
- Pokrenuti aplikaciju komandom `php artisan serve`
 
## Pokretanje React frontend-a
 
- Pozicionirati se u budzetiranje-app-front folder komandom `cd budzetiranje-app-front` (Neophodno je prvo pozicionirati se u root direktorijum komandom `cd ..`)
- Komandom `npm install` ( ili `npm i`), instalirati neophodne pakete za pokretanje same aplikacije
- Pokrenuti aplikaciju komandom `npm start`
