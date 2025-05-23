package com.nativetoasty

import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.os.Handler
import android.os.Looper
import android.view.Gravity
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule

class NativeToastyModuleNew(reactContext: ReactApplicationContext) : NativeToastySpec(reactContext) {

  override fun getName() = NAME

  override fun show(options: ReadableMap) = showToast(options, "custom")

  override fun normal(options: ReadableMap) = showToast(options, "normal")

  override fun info(options: ReadableMap) = showToast(options, "info")

  override fun success(options: ReadableMap) = showToast(options, "success")

  override fun warn(options: ReadableMap) = showToast(options, "warn")

  override fun error(options: ReadableMap) = showToast(options, "error")

  private fun showToast(options: ReadableMap, type: String) {
    val title = options.getStringOrDefault("title", "Toast")
    val position = options.getStringOrDefault("position", "bottom")
    val duration = options.getIntOrDefault("duration", 3000)
    val withIcon = options.getBooleanOrDefault("withIcon", true)
    val tintColor = options.getStringOrNull("tintColor")
    val textColor = options.getStringOrNull("textColor")
    val fontFamily = options.getStringOrNull("fontFamily")

    Handler(Looper.getMainLooper()).post {
      createCustomToast(title, position, duration, type, withIcon, tintColor, textColor, fontFamily)
    }
  }

  @Suppress("DEPRECATION")
  private fun createCustomToast(
    title: String,
    position: String,
    duration: Int,
    type: String,
    withIcon: Boolean,
    tintColor: String?,
    textColor: String?,
    fontFamily: String?
  ) {
    val context = currentActivity ?: reactApplicationContext

    val toastLayout = LinearLayout(context).apply {
      orientation = LinearLayout.HORIZONTAL
      setPadding(40, 32, 40, 32)
      elevation = 12f
    }

    val background = GradientDrawable().apply {
      shape = GradientDrawable.RECTANGLE
      cornerRadius = 24f
      setColor(getBackgroundColor(type, tintColor))
    }
    toastLayout.background = background

    if (withIcon) {
      val iconView = ImageView(context).apply {
        setImageResource(getIconResource(type))
        setColorFilter(Color.WHITE)
        layoutParams = LinearLayout.LayoutParams(48, 48).apply {
          setMargins(0, 0, 24, 0)
          gravity = Gravity.CENTER_VERTICAL
        }
      }
      toastLayout.addView(iconView)
    }

    val textView = TextView(context).apply {
      text = title
      maxLines = 3
      textSize = 16f
      setTextColor(parseColor(textColor) ?: Color.WHITE)
      typeface = getFontTypeface(fontFamily)
      layoutParams = LinearLayout.LayoutParams(
        LinearLayout.LayoutParams.WRAP_CONTENT,
        LinearLayout.LayoutParams.WRAP_CONTENT
      ).apply {
        gravity = Gravity.CENTER_VERTICAL
      }
    }
    toastLayout.addView(textView)

    Toast(context).apply {
      view = toastLayout
      setGravity(getGravity(position), 0, getVerticalOffset(position))
      setDuration(if (duration > 2500) Toast.LENGTH_LONG else Toast.LENGTH_SHORT)
      show()
    }
  }

  private fun getBackgroundColor(type: String, customColor: String?) =
    parseColor(customColor) ?: when (type) {
      "success" -> Color.parseColor("#4CAF50")
      "error" -> Color.parseColor("#F44336")
      "warn" -> Color.parseColor("#FF9800")
      "info" -> Color.parseColor("#2196F3")
      else -> Color.parseColor("#757575")
    }

  private fun getIconResource(type: String) = when (type) {
    "success" -> android.R.drawable.ic_dialog_info
    "error" -> android.R.drawable.stat_notify_error
    "warn" -> android.R.drawable.stat_sys_warning
    "info" -> android.R.drawable.ic_menu_info_details
    else -> android.R.drawable.ic_dialog_info
  }

  private fun getGravity(position: String) = when (position) {
    "top" -> Gravity.TOP or Gravity.CENTER_HORIZONTAL
    "center" -> Gravity.CENTER
    else -> Gravity.BOTTOM or Gravity.CENTER_HORIZONTAL
  }

  private fun getVerticalOffset(position: String) = when (position) {
    "top", "bottom" -> 100
    else -> 0
  }

  private fun getFontTypeface(fontFamily: String?) =
    if (fontFamily.isNullOrEmpty()) Typeface.DEFAULT_BOLD
    else try { Typeface.create(fontFamily, Typeface.NORMAL) } catch (e: Exception) { Typeface.DEFAULT_BOLD }

  private fun parseColor(colorString: String?) =
    if (colorString.isNullOrEmpty()) null
    else try { Color.parseColor(colorString) } catch (e: Exception) { null }

  private fun ReadableMap.getStringOrDefault(key: String, default: String) =
    if (hasKey(key)) getString(key) ?: default else default

  private fun ReadableMap.getStringOrNull(key: String) =
    if (hasKey(key)) getString(key) else null

  private fun ReadableMap.getIntOrDefault(key: String, default: Int) =
    if (hasKey(key)) getInt(key) else default

  private fun ReadableMap.getBooleanOrDefault(key: String, default: Boolean) =
    if (hasKey(key)) getBoolean(key) else default

  companion object {
    const val NAME = "NativeToasty"
  }
}
