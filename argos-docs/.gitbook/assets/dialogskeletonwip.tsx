import * as React from 'react';

import { Icon } from '@gitbook/spine-icons';
import {
    Dialog,
    DialogSkeletonBody,
    DialogSkeletonFooter,
    DialogSkeletonHeader,
    LoadingPanel,
    Skeleton,
} from '@gitbook/spine-react';

const InvitesDialogContent = React.lazy(() =>
    import('./InvitesDialogContent').then((m) => ({
        default: m.InvitesDialogContent,
    }))
);

/**
 * A reusable skeleton component that matches the Dialog structure with header, body, and footer.
 */
export function DialogSkeleton(props: { children: React.ReactNode; className?: string }) {
    const { children, className } = props;

    return <div className={className}>{children}</div>;
}

/**
 * Dialog to invite members to an organization.
 * */
export function InvitesOrganizationScreen(props: { organizationId: string }): React.ReactElement {
    const { organizationId } = props;

    return (
        <Dialog>
            <React.Suspense fallback={<LoadingPanel />}>
                <InvitesDialogContent organizationId={organizationId} />
            </React.Suspense>
        </Dialog>
    );
}

function InvitesOrganizationSkeleton() {
    return (
        <DialogSkeleton className="min-h-112 min-w-128">
            <DialogSkeletonHeader
                heading="Invite teammates"
                description="GitBook is better with some friendly faces. Add members to your organization and start collaborating straight away."
            />

            <DialogSkeletonBody>
                {/* Invite form skeleton */}
                <div className="mb-6">
                    <Skeleton className="mb-3 h-4 w-24" />
                    <div className="mb-4 flex gap-2">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                </div>

                {/* Pending invites list skeleton */}
                <div className="mb-6">
                    <Skeleton className="mb-4 h-5 w-32" />
                    <div className="space-y-3">
                        {Array.from({ length: 3 }, (_, index) => (
                            <div
                                key={`skeleton-invite-${index}`}
                                className="flex items-center justify-between rounded-lg border border-base p-3"
                            >
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                    <div>
                                        <Skeleton className="mb-1 h-4 w-32" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                </div>
                                <Skeleton className="h-8 w-16" />
                            </div>
                        ))}
                    </div>
                </div>
            </DialogSkeletonBody>

            <DialogSkeletonFooter
                buttons={[
                    {
                        label: 'Invite by links',
                        kind: 'secondary',
                        icon: Icon.Link,
                    },
                    {
                        label: 'Close',
                        kind: 'secondary',
                    },
                    {
                        label: 'Invite',
                        kind: 'primary',
                    },
                ]}
            />
        </DialogSkeleton>
    );
}
