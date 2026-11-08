## Kilil Android host

This branch adds an Android WebView host around the existing Kilil web menu.

### Build

GitHub Actions builds a debug APK automatically. The workflow copies the existing root menu.html and script.js into the APK during the Android build.

### Runtime boundary

The Android bridge exposes the interface expected by the existing menu (KililAndroid), but this host does not inject into, modify, or control a live game process. The existing local snapshot/simulation functionality remains available through the web UI.

### Layout

- menu.html — existing Kilil UI
- script.js — existing Kilil runtime/modules
- app/ — Android host
- .github/workflows/android.yml — reproducible APK build
