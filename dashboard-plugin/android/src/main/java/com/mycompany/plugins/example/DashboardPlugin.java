package com.mycompany.plugins.example;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Vibrator;
import android.util.Log;
import com.getcapacitor.JSObject;

public class DashboardPlugin implements SensorEventListener {
    private final DashboardPluginPlugin plugin;
    private SensorManager sensorManager;
    private Sensor accelerometer;
    private Vibrator vibrator;

    // Shake detection parameters (improved algorithm)
    private static final float SHAKE_THRESHOLD = 3.0f;  // Acceleration change threshold
    private static final int SHAKE_TIMEOUT = 500;       // Time between shake events
    private static final int SHAKE_DURATION = 1000;     // Total time window for counting shakes
    private static final int SHAKE_COUNT = 3;           // Number of shakes needed

    private long lastShakeTime;
    private long firstShakeTime;
    private int shakeCount;
    private boolean isListening = false;
    
    // For improved shake detection
    private float lastAcceleration = 9.8f;  // Start with gravity
    private float currentAcceleration = 9.8f;

    public DashboardPlugin(DashboardPluginPlugin plugin) {
        this.plugin = plugin;
        Context context = plugin.getContext();
        sensorManager = (SensorManager) context.getSystemService(Context.SENSOR_SERVICE);
        accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);

        vibrator = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
    }

    public void enableListening() {
        if (accelerometer != null && !isListening) {
            sensorManager.registerListener(this, accelerometer, SensorManager.SENSOR_DELAY_UI);
            isListening = true;
            Log.d("DashboardPlugin", "Shake detection enabled - looking for acceleration changes > " + SHAKE_THRESHOLD);
        } else {
            Log.e("DashboardPlugin", "Accelerometer not available or already listening");
        }
    }

    public void stopListening() {
        if (isListening) {
            sensorManager.unregisterListener(this);
            isListening = false;
            Log.d("DashboardPlugin", "Shake detection stopped");
        }
    }

    public void removeAllListeners() {
        stopListening();
        resetShakeDetection();
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        if (event.sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
            float x = event.values[0];
            float y = event.values[1];
            float z = event.values[2];

            // Calculate total acceleration magnitude (includes gravity)
            float totalAcceleration = (float) Math.sqrt(x*x + y*y + z*z);
            
            // Smooth the acceleration values to reduce noise
            lastAcceleration = currentAcceleration;
            currentAcceleration = totalAcceleration * 0.1f + lastAcceleration * 0.9f;
            
            // Calculate the change in acceleration (this filters out constant gravity)
            float accelerationDelta = Math.abs(totalAcceleration - currentAcceleration);

            // Debug: Log only when there's significant movement
            if (accelerationDelta > 1.0f) {
                Log.d("DashboardPlugin", String.format("Accel: total=%.1f, smooth=%.1f, delta=%.1f (threshold=%.1f)",
                    totalAcceleration, currentAcceleration, accelerationDelta, SHAKE_THRESHOLD));
            }

            // Detect shake based on acceleration change, not absolute value
            if (accelerationDelta > SHAKE_THRESHOLD) {
                long currentTime = System.currentTimeMillis();

                if (firstShakeTime == 0) {
                    firstShakeTime = currentTime;
                    shakeCount = 1;
                    Log.d("DashboardPlugin", "First shake detected, starting count");
                } else if (currentTime - lastShakeTime > SHAKE_TIMEOUT) {
                    // Reset if too much time has passed between shakes
                    firstShakeTime = currentTime;
                    shakeCount = 1;
                    Log.d("DashboardPlugin", "Shake timeout, restarting count");
                } else if (currentTime - firstShakeTime < SHAKE_DURATION) {
                    shakeCount++;
                    Log.d("DashboardPlugin", "Shake count: " + shakeCount + "/" + SHAKE_COUNT);

                    if (shakeCount >= SHAKE_COUNT) {
                        onShakeDetected();
                        resetShakeDetection();
                    }
                } else {
                    // Reset if duration exceeded
                    Log.d("DashboardPlugin", "Shake duration exceeded, resetting");
                    resetShakeDetection();
                }

                lastShakeTime = currentTime;
            }
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        // Not used, but required by SensorEventListener interface
    }

    private void onShakeDetected() {
        Log.d("DashboardPlugin", "SHAKE SEQUENCE COMPLETED! Triggering logout...");

        // Ensure UI thread for notifications
        plugin.getBridge().getActivity().runOnUiThread(() -> {
            if (vibrator != null) {
                vibrator.vibrate(200); // Vibrate for 200ms
            }

            JSObject result = new JSObject();
            result.put("type", "shake");
            result.put("timestamp", System.currentTimeMillis());
            plugin.notifyShakeDetected(result);
        });
    }
    
    private void resetShakeDetection() {
        firstShakeTime = 0;
        shakeCount = 0;
        lastShakeTime = 0;
        Log.d("DashboardPlugin", "Shake detection reset");
    }

    public boolean isCurrentlyListening() {
        return isListening;
    }
}