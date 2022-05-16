# Příloha č. 1 dokumentu specifikace požadavků <!-- omit in toc -->
## Komunikační aplikace se serverem (semestrální práce STI)<!-- omit in toc -->

* Verze 1.0
* Vytvořil Tomáš Novotný
* FM TUL
* 14\. 5\. 2022

# Obsah <!-- omit in toc -->
- [1. Úvod](#1-úvod)
  - [1.1 Účel](#11-účel)
- [2. Celkový popis](#2-celkový-popis)
  - [2.1 Funkční požadavky](#21-funkční-požadavky)
    - [2.1.1 Doporučení nákupu EUR](#211-doporučení-nákupu-eur)
- [3 Specifikace požadavků](#3-specifikace-požadavků)
  - [3.1 Funkční požadavky](#31-funkční-požadavky)
    - [3.1.1 Doporučení nákupu EUR](#311-doporučení-nákupu-eur)
  - [3.2 Časová náročnost](#32-časová-náročnost)

## 1. Úvod
### 1.1 Účel
V rámci tohoto dokumentu se budeme zabývat specifikováním **rozšiřujících** požadavků webové aplikace.

## 2. Celkový popis
### 2.1 Funkční požadavky
Aplikace bude mít novou funkci, kterou může uživatel využít.

#### 2.1.1 Doporučení nákupu EUR
**Popis:** Uživatel bude chtít od serveru doporučit nákup EUR.

* Uživatel napíše do formuláře ***mám koupit eur***.
* Uživatel klikne na tlačítko *odeslat*.
* Klient pošle dotaz na server.
* Server zpracuje zprávu od uživatele.
* Server pošle zprávu zpět klientovi.
* Uživateli se na webové stránce zobrazí odpověď.

## 3 Specifikace požadavků

### 3.1 Funkční požadavky
Tato kapitola popisuje funkce, které aplikace má.

#### 3.1.1 Doporučení nákupu EUR
Server bude reagovat na klíčová slova ***mám koupit eur*** kdekoli v textu, který uživatel posílá. Text může být psaný verzálkami i minuskami.
Server odpoví, zda doporučuje nákup nebo nikoli. Zároveň vypíše kurzy z kterých čepral (3), rozdíl prvního a posledního kurzu, hranu nákupu a průměr posledních 3 kurzů.

**Tok událostí**
* Uživatel zadá v aplikaci text, který bude obsahovat slova ***mám koupit eur***.
* Text se odešle pomocí GraphQL requestu na server.
* Text se rozloží na jednotlivá slova.
* Hledají se klíčová slova:
   1. úspěšně - Server se pokusí stáhnout aktuální kurz (z posledních 3 dní) z API České národní banky
   2. neúspěšně - uživateli se odešle náhodně přednastavená zpráva.
1. Pokud máme úspěšně stažená data z API (včetně aktuálního dne) pozn. ČNB **již vydala** kurz (přibližně po 15:00)
   * Server vypočítá průměrý kurz s posledních 3 dní (aktuální den + 2 předchozí)
   * Server vypočítá 110 % z hodnoty průměru - práh
   * Server vypočítá procentuální rozdíl mezi prvním a posledním kurzem
   * Server zjistí o kolik se liší práh od průměru:
      1. Server zjistí, že cena kurzů klesá nebo se rovná - uživateli se odešle zpráva o **DOPORUČENÍ** nákupu
      2. Práh není překročen - uživateli se odešle zpráva o **DOPORUČENÍ** nákupu
      3. Práh je překročen - uživateli se odešle zpráva o **NE**doporučení nákupu
2. Pokud máme úspěšně stažená data z API (bez aktuálního dne) pozn. ČNB **nevydala** kurz (přibližně do 15:00, včetně víkendu a svátků)
   * Server vypočítá průměrý kurz s posledních 3 dní (včerejší den + 2 předchozí)
   * Server vypočítá 110 % z hodnoty průměru - práh
   * Server vypočítá procentuální rozdíl mezi prvním a posledním kurzem
   * Server zjistí o kolik se liší práh od průměru:
      1. Server zjistí, že cena kurzů klesá nebo se rovná - uživateli se odešle zpráva o **DOPORUČENÍ** nákupu
      2. Práh není překročen - uživateli se odešle zpráva o **DOPORUČENÍ** nákupu
      3. Práh je překročen - uživateli se odešle zpráva o **NE**doporučení nákupu
3. Pokud nemáme úspěšně stažená data z API - uživateli se odešle zpráva o nemožnosti stáhnout informace z API České národní banky.    
* Aplikace zobrazí výsledek.

Pozn.:
* *O víkendech a svátcích ČNB nevydává kurzy. Pro tyto dny API vrací nejbližší vydaný kurz (z pravidla všední den).*
* *ČNB vydává nový kurz přibližně kolem 15:00*
* *Může se stát, že v pondělí do 15:00 budou poslední 3 kurzy stejné (neděle, sobota, pátek). Pro neděli a sobotu platí, že nejbližší vydaný kurz je páteční.*


### 3.2 Časová náročnost
Odhad tvorby rozšiřujících funkcí je přibližně 20 hodin.


