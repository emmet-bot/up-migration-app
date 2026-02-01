'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { AddressWithIdenticon } from '@/components/shared/ProfileDisplay';
import { getActivePermissions, PERMISSION_LABELS, PERMISSIONS } from '@/constants/permissions';
import type { AuthorizationPackage } from '@/types/auth-package';

interface AuthorizationReviewProps {
  authPackage: AuthorizationPackage;
  isAuthorizing: boolean;
  onAuthorize: () => void;
  onCancel: () => void;
}

export function AuthorizationReview({
  authPackage,
  isAuthorizing,
  onAuthorize,
  onCancel,
}: AuthorizationReviewProps) {
  const permissions = BigInt(authPackage.requestedPermissions);
  const activePermissions = getActivePermissions(permissions);

  // Check for dangerous permissions
  const hasDangerousPermissions =
    (permissions & PERMISSIONS.CHANGEOWNER) !== 0n ||
    (permissions & PERMISSIONS.EDITPERMISSIONS) !== 0n ||
    (permissions & PERMISSIONS.ADDCONTROLLER) !== 0n;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Authorize Controller</CardTitle>
        <CardDescription>
          Review the authorization request from {authPackage.targetApp.name}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Target App Info */}
        <div className="flex items-center justify-center gap-3 p-4 bg-muted rounded-lg">
          {authPackage.targetApp.icon ? (
            <Image
              src={authPackage.targetApp.icon}
              alt={authPackage.targetApp.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-lg"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          )}
          <div>
            <p className="font-semibold">{authPackage.targetApp.name}</p>
            <p className="text-sm text-muted-foreground">wants access to your profile</p>
          </div>
        </div>

        <Separator />

        {/* Profile & Controller Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Profile</span>
            <AddressWithIdenticon address={authPackage.profileAddress} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">New Controller</span>
            <AddressWithIdenticon address={authPackage.controllerAddress} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Network</span>
            <Badge variant="outline" className="capitalize">
              {authPackage.network}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Permissions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Requested Permissions</h4>
          <div className="flex flex-wrap gap-2">
            {activePermissions.map((perm) => {
              const isDangerous =
                perm === 'CHANGEOWNER' ||
                perm === 'EDITPERMISSIONS' ||
                perm === 'ADDCONTROLLER';

              return (
                <Badge
                  key={perm}
                  variant={isDangerous ? 'destructive' : 'secondary'}
                >
                  {PERMISSION_LABELS[perm]}
                </Badge>
              );
            })}
          </div>
        </div>

        {hasDangerousPermissions && (
          <Alert variant="destructive">
            <AlertDescription>
              <strong>Warning:</strong> This authorization includes sensitive permissions
              that could allow the new controller to modify your profile&apos;s security settings.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>

      <CardFooter className="flex gap-3">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isAuthorizing}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          onClick={onAuthorize}
          disabled={isAuthorizing}
          className="flex-1"
        >
          {isAuthorizing ? 'Authorizing...' : 'Authorize'}
        </Button>
      </CardFooter>
    </Card>
  );
}
