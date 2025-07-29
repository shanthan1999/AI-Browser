/**
 * Android Tester Example
 * Demonstrates Android device automation and testing
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');

const execAsync = promisify(exec);

class AndroidTester {
    constructor() {
        this.devices = [];
        this.currentDevice = null;
    }

    async checkAdbConnection() {
        try {
            const { stdout } = await execAsync('adb version');
            console.log('✅ ADB is available:', stdout.split('\n')[0]);
            return true;
        } catch (error) {
            console.error('❌ ADB not found. Please install Android SDK and add to PATH');
            return false;
        }
    }

    async getConnectedDevices() {
        try {
            const { stdout } = await execAsync('adb devices');
            const lines = stdout.trim().split('\n').slice(1);
            
            this.devices = lines
                .filter(line => line.trim() && !line.includes('List of devices'))
                .map(line => {
                    const [id, status] = line.split('\t');
                    return { id, status };
                });

            console.log(`📱 Found ${this.devices.length} connected device(s):`);
            this.devices.forEach(device => {
                console.log(`  - ${device.id} (${device.status})`);
            });

            return this.devices;
        } catch (error) {
            console.error('❌ Error getting devices:', error);
            return [];
        }
    }

    async selectDevice(deviceId = null) {
        if (this.devices.length === 0) {
            await this.getConnectedDevices();
        }

        if (deviceId) {
            const device = this.devices.find(d => d.id === deviceId);
            if (device) {
                this.currentDevice = device;
                console.log(`✅ Selected device: ${device.id}`);
                return device;
            } else {
                console.error(`❌ Device ${deviceId} not found`);
                return null;
            }
        } else if (this.devices.length === 1) {
            this.currentDevice = this.devices[0];
            console.log(`✅ Auto-selected device: ${this.currentDevice.id}`);
            return this.currentDevice;
        } else {
            console.log('📱 Multiple devices found. Please specify device ID:');
            this.devices.forEach(device => {
                console.log(`  - ${device.id} (${device.status})`);
            });
            return null;
        }
    }

    async installApp(apkPath) {
        if (!this.currentDevice) {
            console.error('❌ No device selected');
            return false;
        }

        try {
            console.log(`📦 Installing APK: ${apkPath}`);
            const { stdout, stderr } = await execAsync(`adb -s ${this.currentDevice.id} install "${apkPath}"`);
            
            if (stderr && !stderr.includes('Success')) {
                console.error('❌ Installation failed:', stderr);
                return false;
            }
            
            console.log('✅ App installed successfully');
            return true;
        } catch (error) {
            console.error('❌ Error installing app:', error);
            return false;
        }
    }

    async uninstallApp(packageName) {
        if (!this.currentDevice) {
            console.error('❌ No device selected');
            return false;
        }

        try {
            console.log(`🗑️ Uninstalling app: ${packageName}`);
            const { stdout, stderr } = await execAsync(`adb -s ${this.currentDevice.id} uninstall "${packageName}"`);
            
            if (stderr && !stderr.includes('Success')) {
                console.error('❌ Uninstallation failed:', stderr);
                return false;
            }
            
            console.log('✅ App uninstalled successfully');
            return true;
        } catch (error) {
            console.error('❌ Error uninstalling app:', error);
            return false;
        }
    }

    async takeScreenshot(filename = 'device-screenshot.png') {
        if (!this.currentDevice) {
            console.error('❌ No device selected');
            return false;
        }

        try {
            console.log('📸 Taking device screenshot...');
            
            // Take screenshot on device
            await execAsync(`adb -s ${this.currentDevice.id} shell screencap -p /sdcard/screenshot.png`);
            
            // Pull screenshot to local machine
            await execAsync(`adb -s ${this.currentDevice.id} pull /sdcard/screenshot.png "${filename}"`);
            
            // Clean up on device
            await execAsync(`adb -s ${this.currentDevice.id} shell rm /sdcard/screenshot.png`);
            
            console.log(`✅ Screenshot saved as: ${filename}`);
            return true;
        } catch (error) {
            console.error('❌ Error taking screenshot:', error);
            return false;
        }
    }

    async getDeviceInfo() {
        if (!this.currentDevice) {
            console.error('❌ No device selected');
            return null;
        }

        try {
            console.log('📊 Getting device information...');
            
            const commands = [
                'getprop ro.product.model',
                'getprop ro.build.version.release',
                'getprop ro.build.version.sdk',
                'getprop ro.product.manufacturer'
            ];

            const info = {};
            
            for (const command of commands) {
                const { stdout } = await execAsync(`adb -s ${this.currentDevice.id} shell ${command}`);
                const key = command.split('.').pop();
                info[key] = stdout.trim();
            }

            console.log('📱 Device Information:');
            console.log(`  Model: ${info.model}`);
            console.log(`  Android Version: ${info.release}`);
            console.log(`  SDK Level: ${info.sdk}`);
            console.log(`  Manufacturer: ${info.manufacturer}`);

            return info;
        } catch (error) {
            console.error('❌ Error getting device info:', error);
            return null;
        }
    }

    async getDeviceLogs(level = 'V') {
        if (!this.currentDevice) {
            console.error('❌ No device selected');
            return null;
        }

        try {
            console.log('📋 Getting device logs...');
            const { stdout } = await execAsync(`adb -s ${this.currentDevice.id} logcat -d -v ${level}`);
            
            const logs = stdout.split('\n').filter(line => line.trim());
            console.log(`📊 Retrieved ${logs.length} log entries`);
            
            return logs;
        } catch (error) {
            console.error('❌ Error getting device logs:', error);
            return null;
        }
    }

    async clearDeviceLogs() {
        if (!this.currentDevice) {
            console.error('❌ No device selected');
            return false;
        }

        try {
            console.log('🧹 Clearing device logs...');
            await execAsync(`adb -s ${this.currentDevice.id} logcat -c`);
            console.log('✅ Device logs cleared');
            return true;
        } catch (error) {
            console.error('❌ Error clearing device logs:', error);
            return false;
        }
    }
}

// Example usage
async function main() {
    const tester = new AndroidTester();
    
    try {
        // Check ADB availability
        const adbAvailable = await tester.checkAdbConnection();
        if (!adbAvailable) {
            console.log('Please install Android SDK and ensure ADB is in your PATH');
            return;
        }

        // Get connected devices
        const devices = await tester.getConnectedDevices();
        if (devices.length === 0) {
            console.log('No Android devices connected. Please connect a device via USB and enable USB debugging.');
            return;
        }

        // Select first device
        const device = await tester.selectDevice();
        if (!device) {
            console.log('No device selected');
            return;
        }

        // Get device information
        await tester.getDeviceInfo();

        // Take a screenshot
        await tester.takeScreenshot('android-screenshot.png');

        // Get device logs
        const logs = await tester.getDeviceLogs();
        if (logs && logs.length > 0) {
            console.log('Recent logs:', logs.slice(0, 5));
        }

    } catch (error) {
        console.error('Main error:', error);
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = AndroidTester;