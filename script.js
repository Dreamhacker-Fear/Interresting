(() => {
  "use strict";

  // Safe replacement for the original runtime.
  // Keeps the existing HTML/menu usable without attaching to, modifying,
  // injecting into, or automating any live game client.

  const STORAGE = {
    settings: "kilil_safe_settings",
    profiles: "kilil_safe_profiles"
  };

  const state = {
    settings: load(STORAGE.settings, {}),
    profiles: load(STORAGE.profiles, []),
    status: "offline demo"
  };

  function load(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_) {
      return false;
    }
  }

  function emit(name, detail) {
    try {
      window.dispatchEvent(new CustomEvent(name, { detail }));
    } catch (_) {}
  }

  function setSetting(key, value) {
    state.settings[key] = value;
    save(STORAGE.settings, state.settings);
    emit("kilil:setting", { key, value });
  }

  function getSetting(key, fallback = null) {
    return Object.prototype.hasOwnProperty.call(state.settings, key)
      ? state.settings[key]
      : fallback;
  }

  function createProfile(name) {
    const profile = {
      id: Date.now().toString(36),
      name: String(name || "Profile"),
      settings: { ...state.settings }
    };
    state.profiles.push(profile);
    save(STORAGE.profiles, state.profiles);
    emit("kilil:profiles", state.profiles);
    return profile;
  }

  function deleteProfile(id) {
    state.profiles = state.profiles.filter(p => p.id !== String(id));
    save(STORAGE.profiles, state.profiles);
    emit("kilil:profiles", state.profiles);
  }

  function exportProfiles() {
    return JSON.stringify({
      version: 1,
      profiles: state.profiles,
      settings: state.settings
    }, null, 2);
  }

  function importProfiles(json) {
    try {
      const data = typeof json === "string" ? JSON.parse(json) : json;
      if (Array.isArray(data.profiles)) state.profiles = data.profiles;
      if (data.settings && typeof data.settings === "object") {
        state.settings = data.settings;
      }
      save(STORAGE.profiles, state.profiles);
      save(STORAGE.settings, state.settings);
      emit("kilil:profiles", state.profiles);
      emit("kilil:settings", state.settings);
      return true;
    } catch (_) {
      return false;
    }
  }

  function showStatus(message) {
    const text = String(message || state.status);
    state.status = text;
    emit("kilil:status", text);

    const selectors = [
      "[data-kilil-status]",
      "#status",
      ".status",
      ".connection-status"
    ];

    for (const selector of selectors) {
      document.querySelectorAll(selector).forEach(el => {
        el.textContent = text;
      });
    }
  }

  // Public, harmless API for the menu.
  window.Kilil = Object.freeze({
    version: "safe-demo-1.0.0",
    mode: "offline",
    isConnected: false,
    setSetting,
    getSetting,
    createProfile,
    deleteProfile,
    exportProfiles,
    importProfiles,
    showStatus,
    getState: () => ({
      settings: { ...state.settings },
      profiles: [...state.profiles],
      status: state.status
    })
  });

  // Explicitly disable any legacy live-game hooks if the page expects them.
  window.KililAndroid = window.KililAndroid || {
    ready() { return true; },
    status() {
      return JSON.stringify({ state: "offline-demo", external: false });
    },
    send() { return false; },
    failed() { return false; }
  };

  document.addEventListener("DOMContentLoaded", () => {
    showStatus("Offline demo mode");
    emit("kilil:ready", { mode: "offline" });
  });
})();
