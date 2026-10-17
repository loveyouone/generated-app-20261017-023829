package com.liquidglass

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.graphics.PixelFormat
import android.graphics.drawable.GradientDrawable
import android.os.Build
import android.os.IBinder
import android.provider.Settings
import android.util.Log
import android.view.Gravity
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.app.NotificationCompat

class OverlayService : Service() {

    private val TAG = "OverlayService"
    private var windowManager: WindowManager? = null
    private var overlayView: View? = null
    private var params: WindowManager.LayoutParams? = null
    private var isExpanded = false
    private var currentThemeColor: String = "#00E5FF"

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onCreate() {
        super.onCreate()
        try {
            startForegroundServiceNotification()
            windowManager = getSystemService(Context.WINDOW_SERVICE) as? WindowManager
            createOverlayView()
        } catch (e: Exception) {
            Log.e(TAG, "Error in onCreate: ${e.message}", e)
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        try {
            val action = intent?.action
            val colorHex = intent?.getStringExtra("themeColor")

            if (colorHex != null && colorHex.isNotEmpty()) {
                currentThemeColor = colorHex
                updateOverlayColor(colorHex)
            }

            when (action) {
                "ACTION_SHOW_OVERLAY" -> showOverlay()
                "ACTION_HIDE_OVERLAY" -> hideOverlay()
                "ACTION_UPDATE_THEME" -> updateOverlayColor(currentThemeColor)
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error in onStartCommand: ${e.message}", e)
        }

        return START_STICKY
    }

    private fun startForegroundServiceNotification() {
        try {
            val channelId = "yiy_injection_overlay_channel"
            val channelName = "YIy注入 系统悬浮窗服务"

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                val channel = NotificationChannel(
                    channelId,
                    channelName,
                    NotificationManager.IMPORTANCE_LOW
                )
                val manager = getSystemService(Context.NOTIFICATION_SERVICE) as? NotificationManager
                manager?.createNotificationChannel(channel)
            }

            val notification: Notification = NotificationCompat.Builder(this, channelId)
                .setContentTitle("YIy注入 系统悬浮灵动岛")
                .setContentText("悬浮窗服务正常运行中")
                .setSmallIcon(android.R.drawable.ic_menu_compass)
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .build()

            startForeground(1001, notification)
        } catch (e: Exception) {
            Log.e(TAG, "Error starting notification: ${e.message}", e)
        }
    }

    private fun createOverlayView() {
        try {
            val layoutType = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            } else {
                @Suppress("DEPRECATION")
                WindowManager.LayoutParams.TYPE_PHONE
            }

            params = WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                layoutType,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
                        WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN or
                        WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
                PixelFormat.TRANSLUCENT
            ).apply {
                gravity = Gravity.TOP or Gravity.CENTER_HORIZONTAL
                y = 60
            }

            val rootLayout = LinearLayout(this).apply {
                orientation = LinearLayout.VERTICAL
                gravity = Gravity.CENTER
                setPadding(36, 20, 36, 20)
                background = createGlassBackground(currentThemeColor, isExpanded = false)
            }

            val textView = TextView(this).apply {
                text = "💧 YIy注入 灵动岛 (已就绪)"
                setTextColor(Color.WHITE)
                textSize = 12f
            }

            rootLayout.addView(textView)

            rootLayout.setOnClickListener {
                toggleExpandedState(rootLayout, textView)
            }

            // Drag to move functionality safely
            var initialY = 0
            var initialTouchY = 0f

            rootLayout.setOnTouchListener { _, event ->
                try {
                    when (event.action) {
                        MotionEvent.ACTION_DOWN -> {
                            initialY = params?.y ?: 0
                            initialTouchY = event.rawY
                            true
                        }
                        MotionEvent.ACTION_MOVE -> {
                            params?.y = initialY + (event.rawY - initialTouchY).toInt()
                            overlayView?.let { view ->
                                params?.let { p ->
                                    windowManager?.updateViewLayout(view, p)
                                }
                            }
                            true
                        }
                        else -> false
                    }
                } catch (e: Exception) {
                    Log.e(TAG, "Touch event error: ${e.message}")
                    false
                }
            }

            overlayView = rootLayout
        } catch (e: Exception) {
            Log.e(TAG, "Error creating overlay view: ${e.message}", e)
        }
    }

    private fun toggleExpandedState(container: LinearLayout, textView: TextView) {
        try {
            isExpanded = !isExpanded
            if (isExpanded) {
                params?.flags = WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN
                params?.width = 620
                container.setPadding(48, 32, 48, 32)
                textView.text = "💧 YIy注入 系统悬浮灵动岛 v2.6\n注入进程: Roblox (PID: 8492)\n运行状态: 稳定 60 FPS"
                container.background = createGlassBackground(currentThemeColor, isExpanded = true)
            } else {
                params?.flags = WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
                        WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN
                params?.width = WindowManager.LayoutParams.WRAP_CONTENT
                container.setPadding(36, 20, 36, 20)
                textView.text = "💧 YIy注入 灵动岛 (已就绪)"
                container.background = createGlassBackground(currentThemeColor, isExpanded = false)
            }

            overlayView?.let { view ->
                params?.let { p ->
                    windowManager?.updateViewLayout(view, p)
                }
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error toggling expanded state: ${e.message}", e)
        }
    }

    private fun createGlassBackground(strokeColorHex: String, isExpanded: Boolean): GradientDrawable {
        return GradientDrawable().apply {
            shape = GradientDrawable.RECTANGLE
            cornerRadius = if (isExpanded) 50f else 36f
            try {
                setColor(Color.parseColor("#E60A0F1D")) // High opacity dark glass background
                setStroke(3, Color.parseColor(strokeColorHex))
            } catch (e: Exception) {
                setColor(Color.BLACK)
                setStroke(3, Color.CYAN)
            }
        }
    }

    private fun updateOverlayColor(colorHex: String) {
        try {
            overlayView?.let { view ->
                if (view is LinearLayout) {
                    view.background = createGlassBackground(colorHex, isExpanded)
                }
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error updating color: ${e.message}")
        }
    }

    private fun showOverlay() {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(this)) {
                Log.w(TAG, "Cannot show overlay: Permission not granted")
                return
            }

            if (overlayView != null && overlayView?.parent == null && windowManager != null) {
                windowManager?.addView(overlayView, params)
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error showing overlay: ${e.message}", e)
        }
    }

    private fun hideOverlay() {
        try {
            if (overlayView != null && overlayView?.parent != null && windowManager != null) {
                windowManager?.removeView(overlayView)
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error hiding overlay: ${e.message}", e)
        }
    }

    override fun onDestroy() {
        hideOverlay()
        super.onDestroy()
    }
}
