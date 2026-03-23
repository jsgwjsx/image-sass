"use client";

import Link from "next/link";
import { trpcClientReact } from "@/utils/api";
import { Button } from "@/components/ui/Button";
import { redirect, useRouter } from "next/navigation";

export default function DashboardAppList() {
    const getAppsResult = trpcClientReact.apps.listApps.useQuery(void 0, {
        gcTime: Infinity,
        staleTime: Infinity,
    });

    const { data: apps, isLoading } = getAppsResult;

    const router = useRouter();

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-6 flex w-full flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-5 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/70">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        应用列表
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        管理你的应用，快速进入设置页面。
                    </p>
                </div>
                <Button
                    asChild
                    onClick={() => {
                        router.push("/dashboard/apps/new");
                    }}
                    className="h-10"
                >
                    <Link href="/dashboard/apps/new">创建新应用</Link>
                </Button>
            </div>

            {isLoading ? (
                <div className="rounded-xl border border-border bg-card p-10 text-center text-base text-muted-foreground">
                    加载中...
                </div>
            ) : (
                <div className="grid gap-4">
                    {apps?.length ? (
                        apps.map((app) => (
                            <div
                                key={app.id}
                                className="rounded-xl border border-border bg-card p-4 transition hover:shadow-lg hover:border-primary dark:hover:border-primary"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-medium text-foreground">
                                            {app.name}
                                        </h2>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {app.description || "未填写描述"}
                                        </p>
                                    </div>
                                    <Button asChild variant="secondary">
                                        <Link href={`/dashboard/apps/${app.id}`}>
                                            进入
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="rounded-xl border border-border bg-card p-8 text-center text-base text-muted-foreground">
                            暂无应用，请点击“创建新应用”。
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
