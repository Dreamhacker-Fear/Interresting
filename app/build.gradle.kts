plugins { id("com.android.application") }

android {
    namespace = "com.kilil.app"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.kilil.app"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "0.1.0"
    }
    buildFeatures { buildConfig = true }
}

dependencies { implementation("androidx.webkit:webkit:1.12.1") }

tasks.register("prepareKililWeb") {
    doLast {
        val sourceMenu = file("../../menu.html")
        val sourceScript = file("../../script.js")
        val assetDir = file("src/main/assets")
        assetDir.mkdirs()
        sourceMenu.copyTo(file("$assetDir/menu.html"), overwrite = true)
        sourceScript.copyTo(file("$assetDir/script.js"), overwrite = true)
    }
}

tasks.named("preBuild") { dependsOn("prepareKililWeb") }
