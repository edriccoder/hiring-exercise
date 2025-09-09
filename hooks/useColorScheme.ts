import { useThemePreference } from '@/context/ThemePreference';

// Return the app's effective color scheme (light/dark) based on user preference (system/light/dark).
export function useColorScheme() {
	const { effectiveScheme } = useThemePreference();
	return effectiveScheme;
}
