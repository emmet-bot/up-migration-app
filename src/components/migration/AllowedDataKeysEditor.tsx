'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DATA_KEY_PRESETS } from '@/constants/allowedCalls';
import { buildMappingKey, type DataKeyEntry } from '@/lib/lsp6/allowedCalls';

interface AllowedDataKeysEditorProps {
  entries: DataKeyEntry[];
  onChange: (entries: DataKeyEntry[]) => void;
  disabled?: boolean;
}

export function AllowedDataKeysEditor({ entries, onChange, disabled = false }: AllowedDataKeysEditorProps) {
  const [customKeyInput, setCustomKeyInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [openMappingPopover, setOpenMappingPopover] = useState<string | null>(null);
  const [specificAddressInput, setSpecificAddressInput] = useState<string | null>(null);
  const [addressValue, setAddressValue] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpenMappingPopover(null);
        setSpecificAddressInput(null);
        setAddressValue('');
      }
    }
    if (openMappingPopover || specificAddressInput) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [openMappingPopover, specificAddressInput]);

  const addPreset = (presetKey: string) => {
    const preset = DATA_KEY_PRESETS[presetKey];
    if (!preset) return;
    if (entries.some(e => e.key === preset.key)) return;
    onChange([...entries, {
      id: crypto.randomUUID(),
      name: preset.keyType === 'Mapping' ? `${preset.name} (all)` : preset.name,
      key: preset.key,
      isPreset: true,
    }]);
  };

  const addMappingSpecific = (presetKey: string) => {
    const preset = DATA_KEY_PRESETS[presetKey];
    if (!preset) return;
    const trimmed = addressValue.trim();
    if (!/^0x[a-fA-F0-9]{40}$/.test(trimmed)) return;
    const fullKey = buildMappingKey(preset.key, trimmed);
    if (entries.some(e => e.key === fullKey)) return;
    const shortAddr = `${trimmed.slice(0, 6)}...${trimmed.slice(-4)}`;
    onChange([...entries, {
      id: crypto.randomUUID(),
      name: `${preset.name} (${shortAddr})`,
      key: fullKey,
      isPreset: true,
    }]);
    setSpecificAddressInput(null);
    setOpenMappingPopover(null);
    setAddressValue('');
  };

  const handlePresetClick = (presetKey: string) => {
    if (disabled) return;
    const preset = DATA_KEY_PRESETS[presetKey];
    if (!preset) return;
    if (preset.keyType === 'Mapping') {
      if (openMappingPopover === presetKey) {
        setOpenMappingPopover(null);
        setSpecificAddressInput(null);
        setAddressValue('');
      } else {
        setOpenMappingPopover(presetKey);
        setSpecificAddressInput(null);
        setAddressValue('');
      }
    } else {
      addPreset(presetKey);
    }
  };

  const addCustomKey = () => {
    if (disabled) return;
    const trimmed = customKeyInput.trim();
    if (!trimmed || !trimmed.startsWith('0x') || trimmed.length < 4) return;
    if (entries.some(e => e.key === trimmed)) return;
    onChange([...entries, {
      id: crypto.randomUUID(),
      name: 'Custom Key',
      key: trimmed,
      isPreset: false,
    }]);
    setCustomKeyInput('');
    setShowCustomInput(false);
  };

  const removeEntry = (id: string) => {
    if (disabled) return;
    onChange(entries.filter(e => e.id !== id));
  };

  // Group presets by category
  const groups = Object.entries(DATA_KEY_PRESETS).reduce<Record<string, { key: string; preset: typeof DATA_KEY_PRESETS[string] }[]>>(
    (acc, [key, preset]) => {
      if (!acc[preset.group]) acc[preset.group] = [];
      acc[preset.group].push({ key, preset });
      return acc;
    },
    {}
  );

  const isPresetAdded = (presetKey: string) => {
    const preset = DATA_KEY_PRESETS[presetKey];
    if (!preset) return false;
    return entries.some(e => e.key === preset.key);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          Allowed Data Keys
          <Badge variant="outline" className="text-xs font-normal">Optional</Badge>
        </CardTitle>
        <CardDescription>
          Restrict which ERC725Y data keys this controller can write to.
          Leave empty to allow writing to all data keys.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick-add presets by group */}
        <div className="space-y-3">
          {Object.entries(groups).map(([groupName, presets]) => (
            <div key={groupName}>
              <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">{groupName}</p>
              <div className="flex flex-wrap gap-1.5">
                {presets.map(({ key, preset }) => {
                  const added = isPresetAdded(key);
                  const isMappingOpen = openMappingPopover === key;
                  return (
                    <div key={key} className="relative">
                      <button
                        onClick={() => !added && handlePresetClick(key)}
                        disabled={added || disabled}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                          added
                            ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 cursor-default'
                            : isMappingOpen
                              ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/30'
                              : 'border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5'
                        }`}
                        title={preset.description}
                      >
                        {added && <span className="mr-1">&#10003;</span>}
                        {preset.name}
                        {preset.keyType === 'Mapping' && !added && (
                          <span className="ml-1 opacity-60">&#9662;</span>
                        )}
                      </button>

                      {/* Mapping popover */}
                      {isMappingOpen && (
                        <div
                          ref={popoverRef}
                          className="absolute top-full left-0 mt-1 z-20 w-72 p-3 rounded-lg border bg-popover text-popover-foreground shadow-lg"
                        >
                          {specificAddressInput === key ? (
                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground">
                                Enter the address for {preset.name}:
                              </p>
                              <Input
                                type="text"
                                value={addressValue}
                                onChange={(e) => setAddressValue(e.target.value)}
                                placeholder="0x... (20-byte address)"
                                className="text-xs font-mono"
                                onKeyDown={(e) => e.key === 'Enter' && addMappingSpecific(key)}
                                autoFocus
                              />
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => addMappingSpecific(key)}
                                  disabled={!/^0x[a-fA-F0-9]{40}$/.test(addressValue.trim())}
                                  className="flex-1 text-xs"
                                >
                                  Add Specific Key
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSpecificAddressInput(null);
                                    setAddressValue('');
                                  }}
                                  className="text-xs"
                                >
                                  Back
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-1.5">
                              <button
                                onClick={() => {
                                  addPreset(key);
                                  setOpenMappingPopover(null);
                                }}
                                className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-all group"
                              >
                                <div className="text-sm font-medium group-hover:text-primary">
                                  All <span className="text-xs font-normal text-muted-foreground">(prefix)</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Allow writing to any {preset.name} entry
                                </p>
                              </button>
                              <button
                                onClick={() => setSpecificAddressInput(key)}
                                className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-all group"
                              >
                                <div className="text-sm font-medium group-hover:text-primary">
                                  Specific <span className="text-xs font-normal text-muted-foreground">(address)</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Restrict to a specific mapped address
                                </p>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Configured keys list */}
        {entries.length > 0 && (
          <div className="space-y-2">
            {entries.map(entry => {
              const byteLength = (entry.key.length - 2) / 2;
              const isFullKey = byteLength === 32;
              return (
                <div
                  key={entry.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg border bg-muted/50"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{entry.name}</span>
                      <Badge variant={isFullKey ? 'secondary' : 'outline'} className="text-xs">
                        {isFullKey ? 'full key' : `${byteLength}B prefix`}
                      </Badge>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground truncate mt-0.5">{entry.key}</p>
                  </div>
                  <button
                    onClick={() => removeEntry(entry.id)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                    title="Remove"
                    disabled={disabled}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Custom key input */}
        {showCustomInput ? (
          <div className="flex gap-2">
            <Input
              type="text"
              value={customKeyInput}
              onChange={(e) => setCustomKeyInput(e.target.value)}
              placeholder="0x... (data key or prefix)"
              className="flex-1 font-mono text-sm"
              onKeyDown={(e) => e.key === 'Enter' && addCustomKey()}
              disabled={disabled}
              autoFocus
            />
            <Button
              size="sm"
              onClick={addCustomKey}
              disabled={disabled || !customKeyInput.trim().startsWith('0x') || customKeyInput.trim().length < 4}
            >
              Add
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => { setShowCustomInput(false); setCustomKeyInput(''); }}
              disabled={disabled}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => setShowCustomInput(true)}
            disabled={disabled}
            className="w-full border-dashed"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Custom Data Key
          </Button>
        )}

        {/* Summary */}
        {entries.length > 0 && (
          <div className="p-2.5 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">{entries.length}</span> data {entries.length === 1 ? 'key' : 'keys'} configured — controller can write to {entries.length === 1 ? 'this key' : 'any of these keys'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
