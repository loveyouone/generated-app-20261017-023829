import { NativeModules, Platform, ToastAndroid } from 'react-native';

const { OverlayModule } = NativeModules;

export class NativeOverlayService {
  public static async checkPermission(): Promise<boolean> {
    if (Platform.OS !== 'android' || !OverlayModule) {
      return true; // Simulate true in Web / iOS / Expo Go Preview
    }
    try {
      if (typeof OverlayModule.checkPermission === 'function') {
        const result = await OverlayModule.checkPermission();
        return !!result;
      }
      return true;
    } catch (e) {
      console.warn('NativeOverlayService.checkPermission safe catch:', e);
      return false;
    }
  }

  public static async requestPermission(): Promise<boolean> {
    if (Platform.OS !== 'android' || !OverlayModule) {
      return true; // Simulate true in Web / iOS / Expo Go Preview
    }
    try {
      if (typeof OverlayModule.requestPermission === 'function') {
        const result = await OverlayModule.requestPermission();
        return !!result;
      }
      return true;
    } catch (e) {
      console.warn('NativeOverlayService.requestPermission safe catch:', e);
      return false;
    }
  }

  public static async startOverlay(themeColorHex: string): Promise<boolean> {
    if (Platform.OS !== 'android' || !OverlayModule) {
      console.log(`[Web/iOS Simulator] YIy注入 灵动岛悬浮窗模拟已启动 (配色: ${themeColorHex})`);
      return true;
    }
    try {
      if (typeof OverlayModule.startOverlay === 'function') {
        const result = await OverlayModule.startOverlay(themeColorHex);
        if (result && Platform.OS === 'android') {
          ToastAndroid.show('YIy注入 系统悬浮灵动岛已启动', ToastAndroid.SHORT);
        }
        return !!result;
      }
      return true;
    } catch (e) {
      console.warn('NativeOverlayService.startOverlay safe catch:', e);
      return false;
    }
  }

  public static async stopOverlay(): Promise<boolean> {
    if (Platform.OS !== 'android' || !OverlayModule) {
      console.log('[Web/iOS Simulator] YIy注入 灵动岛悬浮窗模拟已关闭');
      return true;
    }
    try {
      if (typeof OverlayModule.stopOverlay === 'function') {
        const result = await OverlayModule.stopOverlay();
        if (result && Platform.OS === 'android') {
          ToastAndroid.show('YIy注入 系统悬浮灵动岛已关闭', ToastAndroid.SHORT);
        }
        return !!result;
      }
      return true;
    } catch (e) {
      console.warn('NativeOverlayService.stopOverlay safe catch:', e);
      return false;
    }
  }
}
