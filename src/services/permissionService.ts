import { PermissionsAndroid, Platform, PermissionStatus } from 'react-native';

export const requestNotificationPermission = async (): Promise<void> => {
  // শুধুমাত্র অ্যান্ড্রয়েড প্ল্যাটফর্মের জন্য কাজ করবে
  if (Platform.OS !== 'android') return;

  try {
    // অ্যান্ড্রয়েড ১৩ (API 33) বা তার উপরের ভার্সনের জন্য চেক
    if (Number(Platform.Version) >= 33) {
      const status: PermissionStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted ✅');
      } else if (status === PermissionsAndroid.RESULTS.DENIED) {
        console.log('Notification permission denied ❌');
      } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('Notification permission blocked by user 🚫');
      }
    } else {
      console.log('Android version is below 13, no explicit permission needed.');
    }
  } catch (err) {
    console.warn('Permission Error: ', err);
  }
};