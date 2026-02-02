'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ProfileIdentityCard } from '@/components/shared/ProfileIdentityCard';
import { copyToClipboard } from '@/lib/utils/format';
import type { AuthorizationPackage } from '@/types/auth-package';

interface QRGeneratorProps {
  authPackage: AuthorizationPackage;
  deepLinkUrl: string;
}

export function QRGenerator({ authPackage, deepLinkUrl }: QRGeneratorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(deepLinkUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Scan on Source Device</CardTitle>
        <CardDescription>
          Open this on the device with existing access to authorize the new controller
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* QR Code */}
        <div className="flex justify-center">
          <div className="p-4 bg-white rounded-lg border">
            <QRCodeSVG
              value={deepLinkUrl}
              size={200}
              level="M"
              includeMargin={false}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">or share link</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Link Copy */}
        <div className="flex gap-2">
          <Input
            type="text"
            value={deepLinkUrl}
            readOnly
            className="font-mono text-sm"
          />
          <Button onClick={handleCopy} variant={copied ? 'default' : 'outline'}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>

        {/* Profile & Controller Info */}
        <div className="p-4 bg-muted rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Target App</span>
            <Badge variant="secondary">{authPackage.targetApp.name}</Badge>
          </div>

          {/* Profile Identity */}
          <div>
            <span className="text-xs text-muted-foreground block mb-2">Profile</span>
            <ProfileIdentityCard 
              address={authPackage.profileAddress}
              network={authPackage.network}
              size="sm"
            />
          </div>

          {/* Controller Identity */}
          <div>
            <span className="text-xs text-muted-foreground block mb-2">New Controller</span>
            <ProfileIdentityCard 
              address={authPackage.controllerAddress}
              network={authPackage.network}
              size="sm"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-sm text-muted-foreground">Network</span>
            <Badge variant="outline" className="capitalize">
              {authPackage.network}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
