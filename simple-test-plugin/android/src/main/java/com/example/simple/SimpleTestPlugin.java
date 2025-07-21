package com.example.simple;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "SimpleTest")
public class SimpleTestPlugin extends Plugin {

    @PluginMethod
    public void hello(PluginCall call) {
        String name = call.getString("name", "World");

        JSObject ret = new JSObject();
        ret.put("message", "Hello " + name + " from Android!");

        call.resolve(ret);
    }
}