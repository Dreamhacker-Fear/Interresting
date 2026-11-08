package com.kilil.app

import android.app.Activity
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import org.json.JSONObject

class MainActivity : Activity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        webView = WebView(this).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.allowFileAccess = true
            settings.allowContentAccess = true
            webViewClient = WebViewClient()
            webChromeClient = WebChromeClient()
            addJavascriptInterface(KililBridge(), "KililAndroid")
        }
        setContentView(webView)
        webView.loadUrl("file:///android_asset/menu.html")
    }

    private inner class KililBridge {
        @JavascriptInterface fun ready() {}
        @JavascriptInterface fun status(): String = JSONObject()
            .put("state", "root-ready")
            .put("external", false)
            .toString()
        @JavascriptInterface fun send(message: String) {}
        @JavascriptInterface fun exportProfiles(data: String) {}
        @JavascriptInterface fun importProfiles() {}
        @JavascriptInterface fun failed(message: String) {}
    }
}
