# Kosmetik- & Nagelstudio Valeria Niederhaus — Website

Statische Website für das Kosmetik- und Nagelstudio Valeria Niederhaus,
Kreuzweg 48, 64711 Erbach (Dorf-Erbach) im Odenwald.

Kein Build-Schritt, kein Framework, keine Abhängigkeiten: reines HTML, CSS und
etwas JavaScript. Die Seite funktioniert auch dann, wenn JavaScript deaktiviert ist
— das Skript ergänzt nur Komfort (Menü, Einblend-Effekte, Öffnungsstatus, Karte).

---

## Vorschau

```bash
# irgendein statischer Server genügt
npx http-server . -p 8080
# oder
python3 -m http.server 8080
```

Dann http://localhost:8080 öffnen. Ein Doppelklick auf `index.html` funktioniert
ebenfalls, nur die Karte lädt dann unter Umständen nicht.

## Veröffentlichen

Die Seite wird über **GitHub Pages** veröffentlicht. Der Workflow
`.github/workflows/pages.yml` liegt bereit und läuft bei jedem Push auf den
Standard-Branch.

**Einmalig nötig:** GitHub Pages muss im Repository freigeschaltet werden. Der
Workflow kann das nicht selbst tun – der Actions-Token darf keine Pages-Seite
anlegen (`Resource not accessible by integration`). Also von Hand:

1. Repository → **Settings** → **Pages**
2. Unter *Build and deployment* bei **Source** den Eintrag
   **GitHub Actions** wählen

Danach den Workflow einmal starten: Reiter **Actions** → *Website
veröffentlichen* → **Run workflow**. Jeder weitere Push veröffentlicht dann
automatisch. Die öffentliche Adresse lautet:

    https://emilianbleimn.github.io/Kosmetik--und-Nagelstudio-Valeria-Niederhaus-Kreuzweg-48-64711-Erbach-Dorf-Erbach/

Diese Adresse kann jede Person ohne Konto öffnen – sie eignet sich also zum
Verschicken per E-Mail.

Sobald eine eigene Domain vorliegt, lässt sie sich unter Settings → Pages →
*Custom domain* eintragen. Danach bitte auch die Platzhalter-Domain in
`index.html` ersetzen (siehe Tabelle oben).

Alternativen ohne GitHub:

- **Netlify / Cloudflare Pages** – Repository verbinden, kein Build-Befehl,
  Publish-Verzeichnis `/`
- **Klassisches Webhosting** – alle Dateien per FTP in das Webverzeichnis laden

---

## Vor dem Livegang prüfen

Diese Punkte konnten aus öffentlichen Quellen nicht zweifelsfrei belegt werden und
sollten von der Inhaberin bestätigt werden:

| Was | Wo | Anmerkung |
|---|---|---|
| **Öffnungszeiten** | `index.html`, Tabelle `#hoursTable` | Aktuell Mo–Fr 09:00–17:00, Sa/So geschlossen (Angabe aus Branchenverzeichnissen). Bitte prüfen. |
| **Leistungsumfang** | `index.html`, Abschnitt `#leistungen` | Vier Bereiche, belegt aus Rezensionen, Verzeichnissen und den Studiofotos (CNC-Skincare-Banner für Micro Needling, Hollywood-Nails-Zertifikate). Weitere Leistungen (z. B. Haarentfernung) ggf. ergänzen. |
| **Preise** | – | Bewusst nicht aufgeführt, da keine belastbaren Angaben vorlagen. Siehe unten. |
| **Impressum** | `impressum.html` | Enthält Platzhalter `[…]` – zwingend ausfüllen. |
| **Datenschutz** | `datenschutz.html` | Hosting-Anbieter und E-Mail-Adresse ergänzen. |
| **Domain** | `index.html` | `www.kosmetik-niederhaus.de` ist ein Platzhalter in `canonical`, den Open-Graph-Tags und im JSON-LD. Durch die echte Domain ersetzen. |
| **Produktnamen** | `index.html`, Abschnitt `#studio` | CNC Skincare und die Hollywood-Nails-Zertifizierung stammen von den Fotos aus dem Studio. Bitte bestätigen, dass beides weiterhin aktuell ist. |

> Ein unvollständiges Impressum ist in Deutschland abmahnfähig. Bitte vor der
> Veröffentlichung ausfüllen und im Zweifel rechtlich prüfen lassen.

### Öffnungszeiten ändern

Die Zeiten stehen **nur an einer Stelle** – in der Tabelle in `index.html`:

```html
<tr data-day="1" data-open="09:00" data-close="17:00"><th scope="row">Montag</th><td>09:00 – 17:00</td></tr>
```

`data-day` ist der Wochentag (0 = Sonntag … 6 = Samstag). Das Skript liest diese
Attribute aus und erzeugt daraus die Anzeige „Jetzt geöffnet / Geschlossen“ im
Hero-Bereich sowie die Hervorhebung des heutigen Tages – die beiden können also
nicht auseinanderlaufen. Für einen Ruhetag `data-open`/`data-close` einfach weglassen.

Bitte **zusätzlich** die `openingHoursSpecification` im JSON-LD am Ende von
`index.html` anpassen, damit Google dieselben Zeiten sieht.

### Preisliste ergänzen

Derzeit steht im Leistungsbereich bewusst „Preise auf Anfrage“. Wenn eine Preisliste
gewünscht ist, lässt sich pro Leistung eine Zeile ergänzen, z. B.:

```html
<p class="service-price">ab 45 € · ca. 60 Minuten</p>
```

---

## Fotos

Alle zehn Fotos stammen vom Studio selbst – siehe `CREDITS.md`. Bei jedem wurde
unten ein schmaler Streifen abgeschnitten, auf dem die Pfeiltasten einer
Bildergalerie mit abfotografiert waren. Fremdbilder werden nicht mehr verwendet.

Auf mehreren Aufnahmen sind Kundinnen erkennbar. Bitte vor dem Livegang
sicherstellen, dass dafür Einwilligungen vorliegen.

Weitere Fotos lassen sich jederzeit ergänzen: Datei nach `assets/img/` legen, im
`index.html` referenzieren und einen `alt`-Text vergeben, der beschreibt, was zu
sehen ist. Für die Galerie genügt ein weiteres `<li>` im Abschnitt `#galerie`.

## Aufbau

```
index.html            Startseite
impressum.html        Impressum (Platzhalter ausfüllen)
datenschutz.html      Datenschutzerklärung
assets/
  css/style.css       Gestaltung der Startseite
  css/legal.css       Zusatz für die Rechtstexte
  js/main.js          Menü, Einblendungen, Öffnungsstatus, Karte
  fonts/              Cormorant Garamond + Inter (lokal, woff2)
  img/                Fotos und Favicon
CREDITS.md            Bild- und Schriftnachweise
```

## Gestaltungsraster

Farben und Maße stehen als Custom Properties in `:root` (`assets/css/style.css`)
und lassen sich dort zentral ändern:

| Token | Wert | Verwendung |
|---|---|---|
| `--porcelain` | `#FBF9F6` | Seitenhintergrund |
| `--sand` | `#F4EFE8` | abgesetzte Abschnitte |
| `--ink` | `#241F1D` | Fließtext, Schaltflächen |
| `--accent` | `#A87C68` | dekorative Akzente |
| `--accent-ink` | `#8A604D` | Akzentfarbe für Text (kontraststark) |

Schriften: **Cormorant Garamond** für Überschriften, **Inter** für Fließtext.

## Technische Entscheidungen

- **Schriften lokal**, keine Google-Fonts-Einbindung (DSGVO).
- **Karte erst auf Klick** (Zwei-Klick-Lösung), OpenStreetMap statt Google Maps.
- **Keine Cookies, kein Tracking, keine externen Skripte** – die Seite lädt
  ausschließlich eigene Dateien.
- **JSON-LD** (`BeautySalon`) mit Adresse, Geokoordinaten, Öffnungszeiten und
  Bewertung für die lokale Google-Suche.
- **Barrierefreiheit**: Sprungmarke, Tastaturbedienung, sichtbarer Fokus,
  ARIA-Auszeichnung am Menü, Beschriftung des Öffnungsstatus,
  Berücksichtigung von `prefers-reduced-motion`.
