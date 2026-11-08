# Kilil

A clean Android host for the Kilil project, built around the existing web UI.

## 📱 Download

**[Download the latest Android build](https://github.com/Dreamhacker-Fear/Interresting/actions)**

Open the latest successful **Android Build** run and download the APK from **Artifacts**.

> The APK is currently provided as a debug build for testing.

## ✨ What is included

- Kilil web interface
- Android WebView host
- Android ↔ JavaScript bridge
- Local profile import/export support
- GitHub Actions APK builds
- Existing `menu.html` and `script.js` packaged into the app
- Clean separation between the Android host and the original project files

## 🚀 Build status

The Android project lives on the **`build/android-host`** branch so the original `main` branch stays safe.

Every push to the Android host branch can build an APK through GitHub Actions.

## 🧪 Current scope

This build provides the Android application shell and local runtime for Kilil.

It does **not** inject into, modify, or control a live game process.

## 🛠️ Project structure

```
menu.html       → Kilil web UI
script.js       → Kilil JavaScript
app/             → Android application
.github/         → GitHub Actions build workflow
```

## ❤️ Credits

Built from the project supplied to this repository, with the Android host added around the existing Kilil UI.

---

**Repository:** [Dreamhacker-Fear/Interresting](https://github.com/Dreamhacker-Fear/Interresting)  
**Builds:** [GitHub Actions](https://github.com/Dreamhacker-Fear/Interresting/actions)
