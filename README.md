# QM-Guru Angebots-Formular 📋

Automatisches Angebots-Formular für BAFA-Berater Zulassung mit PDF-Generierung und Email-Versand.

## 🎯 Features

✅ **Automatische PDF-Generierung** - Basierend auf Google Docs Template
✅ **Email-Versand** - Mit PDF-Anhang an Kunden
✅ **Download-Option** - Zusätzlicher Download-Link auf der Website
✅ **Responsive Design** - Perfekt auf Mobile, Tablet, Desktop
✅ **0 Wartungskosten** - Läuft auf Netlify (kostenlos)
✅ **Einfache Verwaltung** - Alle Angebote in Google Drive

---

## 🚀 Deployment auf Netlify (5 Minuten)

### Voraussetzungen

- [GitHub Account](https://github.com) (kostenlos)
- [Netlify Account](https://netlify.com) (kostenlos)
- Dieses Repository

### Schritt 1: GitHub Repo erstellen

```bash
# 1. GitHub Repository erstellen
#    Gehe zu https://github.com/new
#    Name: "qm-guru-angebote"
#    Public
#    Erstelle Repository

# 2. Lokal vorbereiten
git init
git add .
git commit -m "Initial commit: QM-Guru Angebots-Formular"
git branch -M main
git remote add origin https://github.com/DEIN_USERNAME/qm-guru-angebote.git
git push -u origin main
```

### Schritt 2: Zu Netlify deployen

1. Öffne https://app.netlify.com
2. Klick "Add new site" → "Import an existing project"
3. Wähle "GitHub"
4. Autorisiere Netlify
5. Suche "qm-guru-angebote"
6. **Konfiguration:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Klick "Deploy site"

### Schritt 3: Fertig! 🎉

Deine Website läuft jetzt unter:
```
https://qm-guru-angebote.netlify.app
```

---

## 🔧 Lokal testen

```bash
# Installation
npm install

# Development Server starten
npm run dev

# Im Browser öffnen
# http://localhost:3000
```

---

## 📊 Wie es funktioniert

```
Kunde füllt Formular aus
        ↓
    Daten → Google Apps Script
        ↓
Script befüllt Google Docs Template
        ↓
Konvertiert zu PDF
        ↓
     ↙️        ↘️
  Email      Download-Link
 (mit PDF)   (auf Website)
```

---

## 🔗 Google Drive Setup

Deine Konfiguration:

```javascript
// google-apps-script.gs
const TEMPLATE_FILE_ID = '1ZF9xCnywmVHWGSq-oYODf6PlZobZfY0EdU4i3Hy2xPM';
const OUTPUT_FOLDER_ID = '1WDemhfIM24ZKX_oKBvITpMvo_ac3bVut';
const HOLGER_EMAIL = 'Holger.Grosser@iso9001.info';
```

### PDFs speichern

Alle generierten PDFs werden hier gespeichert:
→ Google Drive → Ordner "Angebote_Output"

---

## 📧 Email Template

Der Kunde erhält eine professionelle Email mit:

- ✅ Persönliche Anrede
- ✅ Alle Services aufgelistet
- ✅ Festpreis (1.500€)
- ✅ PDF als Anhang
- ✅ Kontaktinformation

---

## 📱 Formular Felder

Das Angebots-Formular enthält:

| Feld | Typ | Erforderlich |
|------|-----|-------------|
| Unternehmensname | Text | ✅ |
| Ansprechpartner | Text | ✅ |
| Email | Email | ✅ |
| Telefon | Tel | ❌ |
| Nachricht | Textarea | ❌ |

---

## 🛠️ Änderungen vornehmen

### Design ändern

Bearbeite `src/App.jsx` und pushe zu GitHub:

```bash
git add .
git commit -m "Update: Design angepasst"
git push
```

Netlify deployed automatisch! (2-3 Minuten)

### Angebots-Template ändern

1. Öffne dein Angebots-Template in Google Drive
2. Bearbeite den Text/Design
3. **Alle neuen PDFs bekommen diese Änderungen automatisch!**

---

## 📊 Anfragen verwalten

### Wo sehe ich die Anfragen?

**Option 1: Google Drive**
- Ordner "Angebote_Output"
- Alle PDFs sind dort gespeichert

**Option 2: Email**
- Jede Anfrage → Email an dich (CC)

**Option 3: Google Sheet (Optional)**
- Setup in `google-apps-script.gs`
- Alle Anfragen automatisch loggen

---

## 🔒 Sicherheit

### Daten-Schutz

- ✅ HTTPS (automatisch durch Netlify)
- ✅ Google Drive Integration (sicher)
- ✅ Keine Daten-Speicherung auf Server
- ✅ Alles läuft über Google (DSGVO-konform)

---

## 🚨 Troubleshooting

### Problem: Keine Email erhalten

**Lösung:**
1. Überprüfe Spam-Ordner
2. Überprüfe HOLGER_EMAIL in google-apps-script.gs
3. Gib Google Apps Script Berechtigung zum Mailen

### Problem: PDF hat falsche Daten

**Lösung:**
1. TEMPLATE_FILE_ID in google-apps-script.gs korrekt?
2. Google Docs Template hat {{PLATZHALTER}} ?
3. Template ist schreibgeschützt?

### Problem: Formular reagiert nicht

**Lösung:**
1. Öffne Browser Console (F12)
2. Überprüfe auf Errors
3. Überprüfe Google Apps Script URL

---

## 📈 Nächste Schritte

- [ ] Auf deine Domain verlinken (Custom Domain bei Netlify)
- [ ] Analytics einrichten (Google Analytics)
- [ ] Weitere Services hinzufügen (ISO 14001, etc)
- [ ] CRM integrieren (HubSpot, Pipedrive)
- [ ] Automatische Follow-Up Emails (Gmail API)

---

## 📞 Support

- Email: Holger.Grosser@iso9001.info
- Tel: 0911-49522541
- Website: https://www.qm-guru.de

---

## 📄 Lizenz

© 2025 QM-Guru | Alle Rechte vorbehalten

---

## 🎉 Viel Erfolg mit deinen Angeboten!

Deine automatisierte Angebots-Maschine läuft jetzt 24/7 🚀
