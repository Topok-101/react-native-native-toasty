package com.nativetoasty

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class NativeToastyPackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    val modules = mutableListOf<NativeModule>()

    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      try {
        val clazz = Class.forName("com.nativetoasty.NativeToastyModuleNew")
        val ctor = clazz.getConstructor(ReactApplicationContext::class.java)
        modules.add(ctor.newInstance(reactContext) as NativeModule)
      } catch (e: Exception) {
        e.printStackTrace()
      }
    } else {
      try {
        val clazz = Class.forName("com.nativetoasty.NativeToastyModuleOld")
        val ctor = clazz.getConstructor(ReactApplicationContext::class.java)
        modules.add(ctor.newInstance(reactContext) as NativeModule)
      } catch (e: Exception) {
        e.printStackTrace()
      }
    }

    return modules
  }

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return emptyList()
  }
}
