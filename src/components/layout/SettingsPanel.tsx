import React from 'react';
import { X, Palette, Monitor, Moon, Sun } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { useTheme } from '../../contexts/ThemeContext';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
  ];

  const accentColors = [
    { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
    { name: 'Green', value: 'green', color: 'bg-green-500' },
    { name: 'Purple', value: 'purple', color: 'bg-purple-500' },
    { name: 'Orange', value: 'orange', color: 'bg-orange-500' },
    { name: 'Red', value: 'red', color: 'bg-red-500' },
    { name: 'Pink', value: 'pink', color: 'bg-pink-500' },
  ];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Settings
          </SheetTitle>
          <SheetDescription>
            Customize the appearance of your dashboard
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Theme Selection */}
          <div>
            <Label className="text-base font-medium">Theme Mode</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {themeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={theme === option.value ? "default" : "outline"}
                  className="h-12 flex flex-col gap-1"
                  onClick={() => setTheme(option.value as 'light' | 'dark')}
                >
                  <option.icon className="h-4 w-4" />
                  <span className="text-xs">{option.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Accent Colors */}
          <div>
            <Label className="text-base font-medium">Accent Color</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {accentColors.map((color) => (
                <Button
                  key={color.value}
                  variant="outline"
                  className="h-12 flex flex-col gap-1"
                  onClick={() => {
                    // This would update the CSS custom properties for accent colors
                    console.log('Accent color changed to:', color.value);
                  }}
                >
                  <div className={`w-4 h-4 rounded-full ${color.color}`} />
                  <span className="text-xs">{color.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Additional Settings */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Preferences</Label>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Compact Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Reduce padding and spacing
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Animations</Label>
                <p className="text-sm text-muted-foreground">
                  Enable smooth transitions
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-save</Label>
                <p className="text-sm text-muted-foreground">
                  Save preferences automatically
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <Separator />

          {/* Reset Button */}
          <Button variant="outline" className="w-full">
            Reset to Default
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}