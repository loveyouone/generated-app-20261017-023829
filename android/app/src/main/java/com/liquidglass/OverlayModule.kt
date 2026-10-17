package com.liquidglass

import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class OverlayModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val TAG = "OverlayModule"

    override fun getName(): String = "OverlayModule"

    @ReactMethod
    fun checkPermission(promise: Promise) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                val hasPermission = Settings.canDrawOverlays(reactContext)
                promise.resolve(hasPermission)
            } else {
                promise.resolve(true)
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error checking permission: ${e.message}", e)
            promise.resolve(false)
        }
    }

    @ReactMethod
    fun requestPermission(promise: Promise) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(reactContext)) {
                val intent = Intent(
                    Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                    Uri.parse("package:" + reactContext.packageName)
                ).apply {
                    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                }
                reactContext.startActivity(intent)
                promise.resolve(true)
            } else {
                promise.resolve(true)
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error requesting overlay permission: ${e.message}", e)
            promise.resolve(false)
        }
    }

    @ReactMethod
    fun startOverlay(themeColor: String, promise: Promise) {
        try {
            // Permission check before starting service
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(reactContext)) {
                Log.w(TAG, "Cannot start overlay: SYSTEM_ALERT_WINDOW permission denied")
                promise.resolve(false)
                return
            }

            val intent = Intent(reactContext, OverlayService::class.java).apply {
                action = "ACTION_SHOW_OVERLAY"
                putExtra("themeColor", themeColor)
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                reactContext.startForegroundService(intent)
            } else {
                reactContext.startService(intent)
            }
            promise.resolve(true)
        } catch (e: Exception) {
            Log.e(TAG, "Error starting overlay service: ${e.message}", e)
            promise.resolve(false)
        }
    }

    @ReactMethod
    fun stopOverlay(promise: Promise) {
        try {
            val intent = Intent(reactContext, OverlayService::class.java).apply {
                action = "ACTION_HIDE_OVERLAY"
            }
            reactContext.stopService(intent)
            promise.resolve(true)
        } catch (e: Exception) {
            Log.e(TAG, "Error stopping overlay service: ${e.message}", e)
            promise.resolve(false)
        }
    }

    @ReactMethod
    fun updateThemeColor(themeColor: String) {
        try {
            val intent = Intent(reactContext, OverlayService::class.java).apply {
                action = "ACTION_UPDATE_THEME"
                putExtra("themeColor", themeColor)
            }
            reactContext.startService(intent)
        } catch (e: Exception) {
            Log.e(TAG, "Error updating overlay theme: ${e.message}", e)
        }
    }
}
