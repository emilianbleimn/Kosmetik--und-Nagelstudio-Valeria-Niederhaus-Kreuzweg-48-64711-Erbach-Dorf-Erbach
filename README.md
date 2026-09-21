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

Es reicht, den Ordnerinhalt auf einen Webspace zu kopieren. Getestete Wege:

- **GitHub Pages** – Repository-Einstellungen → Pages → Branch wählen, Ordner `/`
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
| **Leistungsumfang** | `index.html`, Abschnitt `#leistungen` | Vier Bereiche, die sich aus Rezensionen und Verzeichnissen belegen ließen. Weitere Leistungen (z. B. Haarentfernung) ggf. ergänzen. |
| **Preise** | – | Bewusst nicht aufgeführt, da keine belastbaren Angaben vorlagen. Siehe unten. |
| **Impressum** | `impressum.html` | Enthält Platzhalter `[…]` – zwingend ausfüllen. |
| **Datenschutz** | `datenschutz.html` | Hosting-Anbieter und E-Mail-Adresse ergänzen. |
| **Domain** | `index.html` | `www.kosmetik-niederhaus.de` ist ein Platzhalter in `canonical`, den Open-Graph-Tags und im JSON-LD. Durch die echte Domain ersetzen. |

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

## Eigene Fotos einsetzen

**Die aktuell eingebundenen Bilder sind Platzhalter von Unsplash** (siehe
`CREDITS.md`). Die Fotos aus dem Google-Unternehmensprofil konnten dafür nicht
verwendet werden: Sie liegen auf Googles CDN hinter kurzlebigen, signierten URLs,
das automatisierte Auslesen widerspricht den Nutzungsbedingungen von Google, und ein
großer Teil der Galerie stammt von Kundinnen – die Bildrechte liegen dann bei diesen,
nicht beim Studio.

Der saubere Weg: die **Originaldateien** verwenden, die die Inhaberin selbst
aufgenommen und bei Google hochgeladen hat. Diese Bilder gehören ihr und dürfen ohne
Weiteres eingesetzt werden.

So werden sie eingesetzt — die Dateinamen einfach beibehalten, dann ist keine
Code-Änderung nötig:

| Datei | Wo sie erscheint | Empfohlenes Format |
|---|---|---|
| `assets/img/hero.jpg` | Großes Bild ganz oben | quer, ca. 1800 × 1200 px |
| `assets/img/hero-sm.jpg` | dasselbe Motiv für Mobilgeräte | ca. 900 × 1100 px |
| `assets/img/behandlung.jpg` | Abschnitt „Das Studio“, großes Bogenbild | hoch, ca. 1100 × 1400 px |
| `assets/img/naegel-detail.jpg` | kleines Bild daneben | quer, ca. 1100 × 800 px |
| `assets/img/gesichtsbehandlung.jpg` | Leistung 01 | quer, ca. 1100 × 825 px |
| `assets/img/nageldesign.jpg` | Leistung 02 | quer, ca. 1100 × 825 px |
| `assets/img/augenbrauen.jpg` | Leistung 03 | quer, ca. 1100 × 825 px |
| `assets/img/makeup.jpg` | Leistung 04 | quer, ca. 1100 × 825 px |

Nach dem Austausch bitte die `alt`-Texte in `index.html` anpassen, damit sie
beschreiben, was tatsächlich zu sehen ist, und `CREDITS.md` aktualisieren.

**Ein Foto von Valeria selbst** fehlt bewusst: Ein Stockfoto einer fremden Person
als Inhaberin auszugeben wäre irreführend. Ein echtes Porträt würde den Abschnitt
„Das Studio“ deutlich aufwerten und lässt sich dort anstelle von
`behandlung.jpg` einsetzen.

---

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
