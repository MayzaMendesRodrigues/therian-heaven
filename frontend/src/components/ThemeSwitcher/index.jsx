import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { setCustomTheme } from '@/utils/ThemeManager';

export function getRandomHue() {
  return Math.floor(Math.random() * 360);
}

export function applyRandomTheme() {
  const huePrimary = getRandomHue();
  const hueNeutral = getRandomHue();
  setCustomTheme(huePrimary, hueNeutral);
}

export default function ThemeSwitcher() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-full bg-background/60 text-muted-foreground hover:bg-background hover:text-foreground"
      onClick={applyRandomTheme}
      aria-label="Alterar cores aleatórias"
      title="Alterar cores aleatórias"
    >
      <Sparkles className="h-4 w-4" aria-hidden="true" />
    </Button>
  );
}
