import { useThemePreference } from '@/context/ThemePreference';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const { effectiveScheme } = useThemePreference();
  return effectiveScheme;
}
