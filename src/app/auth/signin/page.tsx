"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-900">
            <div className="max-w-md w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">欢迎登录</h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                    本系统仅支持 GitLab 登录。
                    <br />
                    请先登录 GitLab 账号，然后授权访问。登录后将会自动跳转到仪表板。
                </p>

                <div className="space-y-3 mb-5">
                    <div className="rounded-lg bg-sky-50 dark:bg-sky-800/40 p-3 text-sm text-sky-800 dark:text-sky-200">
                        贴士：
                        <ul className="list-disc list-inside mt-1">
                            <li>假如你已登录多个 GitLab 账号，可先退出后再登录当前账号。</li>
                            <li>登录过程中可能会提示授权，选择“允许”即可。</li>
                            <li>如果看不到跳转，请确认浏览器允许弹窗/重定向。</li>
                        </ul>
                    </div>
                </div>

                <button
                    onClick={() => signIn("gitlab", { callbackUrl: "/dashboard" })}
                    className="w-full rounded-lg bg-slate-900 text-white px-4 py-2 text-base font-semibold hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                    使用 GitLab 登录
                </button>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                    如果你没有 GitLab 账号，请先前往 GitLab 注册。
                </p>
            </div>
        </main>
    );
}
