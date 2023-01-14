# REST-webbtjänst med NodeJS och Express - För företaget Lost Treasures

Det här en REST-webbtjänst som använder CRUD. Den är skapad med NodeJS, Express och Mongoose.
Webbtjänsten hanterar lagerfunktionalitet för företaget Lost Treasures där anropen GET, POST, PUT och DELETE kan göras. 

| Metod    | Ändpunkt | Beskrivning  |
| :---        |    :----:   |          ---: |
| GET      | /products      | Hämtar alla produkter |
| GET   | /products/id      | Hämtar en produkt med id    |
| POST | /products  | Lägger till en ny produkt. Kräver att ojekt skickas med |
| PUT | /products/id | Uppdaterar en produkt. Kräver att ojekt skickas med |
| DELETE | /product/id | Raderar en existerande produkt med id|