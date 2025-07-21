package com.mycompany.plugins.example;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "DashboardPlugin")
public class DashboardPluginPlugin extends Plugin {

    private DashboardPlugin implementation;

    // Explicit public constructor required for Capacitor plugin loading
    public DashboardPluginPlugin() {
        super();
    }

    @Override
    public void load() {
        // Initialize the implementation after the plugin context is available
        implementation = new DashboardPlugin(this);
        super.load();
    }

    @PluginMethod
    public void enableListening(PluginCall call) {
        try {
            implementation.enableListening();
            call.resolve();
        } catch (Exception e) {
            call.reject("Failed to enable shake detection", e);
        }
    }

    @PluginMethod
    public void stopListening(PluginCall call) {
        try {
            implementation.stopListening();
            call.resolve();
        } catch (Exception e) {
            call.reject("Failed to stop shake detection", e);
        }
    }

    @PluginMethod
    public void removeAllListeners(PluginCall call) {
        try {
            implementation.removeAllListeners();
            call.resolve();
        } catch (Exception e) {
            call.reject("Failed to remove listeners", e);
        }
    }

    @PluginMethod
    public void isListening(PluginCall call) {
        try {
            JSObject ret = new JSObject();
            ret.put("isListening", implementation.isCurrentlyListening());
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("Failed to check listening status", e);
        }
    }

    // Public method to notify listeners from DashboardPlugin
    public void notifyShakeDetected(JSObject data) {
        notifyListeners("shake", data);
    }

    @Override
    protected void handleOnDestroy() {
        if (implementation != null) {
            implementation.stopListening();
        }
        super.handleOnDestroy();
    }
}