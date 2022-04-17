# Dokument specifikace požadavků <!-- omit in toc -->
## Komunikační aplikace se serverem <!-- omit in toc -->

* Verze 1.0
* Vytvořil Tomáš Novotný
* FM TUL
* 16\. 4\. 2022

# Obsah <!-- omit in toc -->
- [1. Úvod](#1-úvod)
  - [1.1 Účel](#11-účel)
  - [1.2 Rozsah](#12-rozsah)
  - [1.3 Glosář](#13-glosář)
  - [1.4 Zdroje](#14-zdroje)
  - [1.5 Přehled dokumentu](#15-přehled-dokumentu)
- [2. Celkový popis](#2-celkový-popis)
  - [2.1 Prostředí produktu](#21-prostředí-produktu)
  - [2.2 Funkční požadavky](#22-funkční-požadavky)
    - [2.1.1 Získání aktuálního času](#211-získání-aktuálního-času)
    - [2.2.2 Získání jména serveru](#222-získání-jména-serveru)
    - [2.2.3 Aktuální kurz EUR vůči CZK](#223-aktuální-kurz-eur-vůči-czk)
    - [2.2.4 Nápověda](#224-nápověda)
  - [2.3 Chrakteristiky uživatelů](#23-chrakteristiky-uživatelů)
  - [2.4 Doplňkové požadavky](#24-doplňkové-požadavky)
- [3 Specifikace požadavků](#3-specifikace-požadavků)
  - [3.1 Externí rozhraní](#31-externí-rozhraní)
    - [3.1.1 Uživatelské rozhraní](#311-uživatelské-rozhraní)
    - [3.1.2 Softwarové rozhraní](#312-softwarové-rozhraní)
      - [3.1.2.1 Zdroje dat](#3121-zdroje-dat)
      - [3.1.2.2 Použité nástroje a software](#3122-použité-nástroje-a-software)
    - [3.1.3 Hardwarové požadavky](#313-hardwarové-požadavky)
  - [3.2 Funkční požadavky](#32-funkční-požadavky)
    - [3.2.1 Získání aktuálního času](#321-získání-aktuálního-času)
    - [3.2.2 Získání jména serveru](#322-získání-jména-serveru)
    - [3.2.3 Aktuální kurz EUR vůči CZK](#323-aktuální-kurz-eur-vůči-czk)
  - [3.3 Detailní doplňkové požadavky](#33-detailní-doplňkové-požadavky)
    - [3.3.1 Výkonostní požadavky](#331-výkonostní-požadavky)
    - [3.3.2 Bezpečnost](#332-bezpečnost)
    - [3.3.3 Spolehlivost](#333-spolehlivost)
    - [3.3.4 Dostupnost](#334-dostupnost)
    - [3.3.5 Časová náročnost](#335-časová-náročnost)
    - [3.3.6 Uzávěrka](#336-uzávěrka)

## 1. Úvod
### 1.1 Účel
V rámci tohoto dokumentu se budeme zabývat specifikováním požadavků webové aplikace, jejíž
účelem je simulace komunikace mezi klientem a serverem.

### 1.2 Rozsah
Aplikaci s pracovním návzem ChatoB bude moci využít každý, nebude vyžadována autentizace uživatele.
Aplikace bude sloužit ke komunikaci se vzdáleným serverem. Ten bude odpovídat na přednastavené zprávy. Server bude komunikovat v českém jazyce.

### 1.3 Glosář
| Pojem | Popis |
| -- | -- |
| Node.js| Softwarový systém pro psaní vysoce škálovatelných aplikací (především webových serverů) |
| React.js | JavaScriptová knihovna pro tvorbu uživatelského rozhraní |
| GraphQL | Dotazovací jazyk pro tvorbu API |
| HTML | Hypertext Markup Language - značkovací jazyk používaný pro tvorbu webových stránek |
| API | Application Programming Interface - rozhraní pro programování aplikací |

### 1.4 Zdroje
IEEE 830-1998, 1998. IEEE Recommended Practice for Software Requirements Specifications. New York, US: The Institute of Electrical and Electronics Engineers.

### 1.5 Přehled dokumentu
Kapitola Celkový popis poskytuje informace přehled funkcionality programu. Popisuje obecné požadavky a jednotlivé funkce.
Kapitola Specifikace požadavků, která slouží primárně vývojářům, popisuje detaily funkcionality programu.

## 2. Celkový popis
### 2.1 Prostředí produktu
Uživatel může komunikovat přes formulář pomocí předem vytvořených dotazů na webové stránce se serverem, který odpovídá zpět v přednastavených odpovědích.
### 2.2 Funkční požadavky
Aplikace bude mít několik jednoduchých funkcí, které může uživatel využít.

(obrázek)

#### 2.1.1 Získání aktuálního času
**Popis:** Uživatel bude chtít od serveru aktuální čas.

* Uživatel napíše do formuláře *jaká je čas*.
* Uživatel klikne na tlačítko *odeslat*.
* Klient pošle dotaz na server.
* Server zpracuje zprávu od uživatele.
* Server pošle zprávu zpět klientovi.
* Uživateli se na webové stránce zobrazí odpověď.

#### 2.2.2 Získání jména serveru
**Popis:** Uživatel bude chtít znát název serveru.

* Uživatel napíše do formuláře *jak se jmenuješ*.
* Uživatel klikne na tlačítko *odeslat*.
* Klient pošle dotaz na server.
* Server zpracuje zprávu od uživatele.
* Server pošle zprávu zpět klientovi.
* Uživateli se na webové stránce zobrazí odpověď.

#### 2.2.3 Aktuální kurz EUR vůči CZK

**Popis:** Uživatel bude chtít znát aktuální kurz EUR/CZK.

* Uživatel napíše do formuláře *kurz EUR/CZK* nebo *kurz EUR na CZK*.
* Uživatel klikne na tlačítko *odeslat*.
* Klient pošle dotaz na server.
* Server zpracuje zprávu od uživatele.
* Server si stáhne aktulní kurz z API České národní banky.
* Server pošle zprávu zpět klientovi.
* Uživateli se na webové stránce zobrazí odpověď.

#### 2.2.4 Nápověda

**Popis:** Uživatel si bude chtít nechat zobrazit příkazy (nápovědu), které má server přednastavené.

* Uživatel napíše do formuláře *help* nebo *nápověda*.
* Uživatel klikne na tlačítko *odeslat*.
* Klient pošle dotaz na server.
* Server zpracuje zprávu od uživatele.
* Server pošle nápovědu zpět klientovi.
* Uživateli se na webové stránce zobrazí odpověď.

### 2.3 Chrakteristiky uživatelů
Uživatel by měl umět zacházet s webovým prohlížečem včetně vyplňování formulářů. Očekává se, že bude znát tuto aplikaci a její funkce.

### 2.4 Doplňkové požadavky
Server a klient musí běžet na jiném hostu.

## 3 Specifikace požadavků
### 3.1 Externí rozhraní
Tato kapitola definuje všechny vstupy a výstupy aplikace a jednotlivé řešení.

#### 3.1.1 Uživatelské rozhraní
Aplikace bude mít jednoduché webové rozhraní. Většinu obrazovky zabere okno pro textové odpovědi serveru. Zprávy se budou zobrazovat pod sebou, vždy se jménem odesílatele. Pod ním se bude nacházet html formulář pro odeslání dat na server. Ten se skládá z tetxového inputu a tlačítka.

(obrázek)

#### 3.1.2 Softwarové rozhraní
Aplikace bude porovnávat vstup zadaný uživatelem z předem nastavenými možnostmi. 

##### 3.1.2.1 Zdroje dat

[ČNB Kurzy](https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt)\
**Popis:** Aktualizace dat probíhá vždy v pracovní den po 14:30. Kurzy jsou aktuální pro aktuální pracovní den a případnou následující sobotu, neděli nebo státní svátek. Data jsou v textovém formátu *.txt*.

**Struktura dat:**
14.04.2022 #74\
země|měna|množství|kód|kurz\
EMU|euro|1|EUR|24,420

##### 3.1.2.2 Použité nástroje a software

* Javascript
  * programovací jazyk
* [React.js](https://reactjs.org/)
  * klientská část apliakce
* [Node.js](https://nodejs.org/en/)
  * serverová část aplikace
* [GraphQL](https://graphql.org/)
  * dotazovací jazyk pro komunikaci mezi serverem a klietem

#### 3.1.3 Hardwarové požadavky
Počítač by měl splňovat [základní požadavky pro běh systému Windows 10](https://support.microsoft.com/cs-cz/windows/po%C5%BEadavky-na-syst%C3%A9m-windows-10-6d4e9a79-66bf-7950-467c-795cf0386715) a být připojen k internetu.

### 3.2 Funkční požadavky
Tato kapitola popisuje funkce, které aplikace má.

#### 3.2.1 Získání aktuálního času
Server bude reagovat na klíčová slova *jaký je čas* kdekoli v textu, který uživatel posílá. Text může být psaný verzálkama i minuskama. Server odpoví uživateli aktuální čas v běžném formátu *hh:mm:ss*.

**Tok událostí**
1. Uživatel zadá v aplikaci text, který bude obsahovat slova *jaký je čas*.
2. Text se odešle pomocí GraphQL requestu na server.
3. Text se rozloží na jednotlivá slova.
4. Hledají se klíčová slova
   1. úspešně - uživateli se odešle aktuální čas ve formátu hh:mm:ss
   2. neúspěšně - uživateli se odešle náhodně přednastavená zpráva
5. Aplikace zobrazí výsledek


#### 3.2.2 Získání jména serveru
Server bude reagovat na klíčová slova *jak se jmenuješ* kdekoli v textu, který uživatel posílá. Text může být verzálkama i minuskama. Server odpoví uživateli svoje jméno.

**Tok událostí**
1. Uživatel zadá v aplikaci text, který bude obsahovat slova *jak se jmenuješ*.
2. Text se odešle pomocí GraphQL requestu na server.
3. Text se rozloží na jednotlivá slova.
4. Hledají se klíčová slova
   1. úspešně - uživateli se odešle jméno serveru
   2. neúspěšně - uživateli se odešle náhodně přednastavená zpráva
5. Aplikace zobrazí výsledek


#### 3.2.3 Aktuální kurz EUR vůči CZK
Server bude reagovat na klíčová slova jaký je *kurz EUR na CZK* kdekoli v textu, který uživatel posílá. Text může být verzálkama i minuskama. Server odpoví uživateli aktuální kurz.

**Tok událostí**
1. Uživatel zadá v aplikaci text, který bude obsahovat slova *kurz EUR/CZK* nebo *kurz EUR na CZK*.
2. Text se odešle pomocí GraphQL requestu na server.
3. Text se rozloží na jednotlivá slova.
4. Hledají se klíčová slova
   1. úspešně - uživateli se odešle aktuální kurz
   2. neúspěšně - uživateli se odešle náhodně přednastavená zpráva
5. Aplikace zobrazí výsledek


### 3.3 Detailní doplňkové požadavky

#### 3.3.1 Výkonostní požadavky
Server by měl odpovědět do méně než vteřiny. Pokud by v jeden čas bylo poslalo dotaz více klientů, čas odpovědi může být v jednotkách sekund. Jelikož se jedná o chatovací aplikaci, zpozdění serveru může simulovat čas odpovědi v reálném světě. 

#### 3.3.2 Bezpečnost
Uživatel má přístup k zobrazování dat. Vstup aplikace by měl být ošetřen vůči spamování a chybným dotazům.

#### 3.3.3 Spolehlivost
Aplikace by měla fungovat bez nutnosti zásahu a sama vyhodnotit špatně zadané vstupy.

#### 3.3.4 Dostupnost
Aplikace bude veřejně dostupná a v neustálém provozu. Případná aktualizace nebo údržba bude probíhat v předem oznámeném termínu.

#### 3.3.5 Časová náročnost
Odhad tvorby aplikace (klientské i serverové části) je přibližně 30 hodin.

#### 3.3.6 Uzávěrka
Zápočtový týden letního semestru 2021/2022.