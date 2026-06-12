"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";

export function AuthModal() {
  const { t } = useLocale();
  const {
    isOpen,
    authView,
    pendingCode,
    closeAuth,
    setAuthView,
    login,
    register,
    verifyCode,
    resendCode,
    requestPasswordReset,
  } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [verifyMethod, setVerifyMethod] = useState<"email" | "sms">("email");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const titles: Record<string, string> = {
    login: t("auth.loginTitle"),
    register: t("auth.registerTitle"),
    forgot: t("auth.forgotTitle"),
    verify: t("auth.verifyTitle"),
  };

  const subtitles: Record<string, string> = {
    login: t("auth.loginSubtitle"),
    register: t("auth.registerSubtitle"),
    forgot: t("auth.forgotSubtitle"),
    verify: t("auth.verifySubtitle"),
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (authView === "login") {
        const result = await login(email, password);
        if (!result.ok && result.error === "invalidCredentials") {
          setError(t("auth.invalidCredentials"));
        }
      } else if (authView === "register") {
        if (password !== confirmPassword) {
          setError(t("auth.passwordMismatch"));
          return;
        }
        await register({ firstName, lastName, email, phone, password, verifyMethod }).then((result) => {
          if (!result.ok && result.error === "emailExists") {
            setError(t("auth.invalidCredentials"));
          }
        });
      } else if (authView === "forgot") {
        await requestPasswordReset(email);
        setSuccess(t("auth.resetSent"));
      } else if (authView === "verify") {
        const result = await verifyCode(code);
        if (!result.ok) setError(t("auth.invalidCredentials"));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
        onClick={closeAuth}
        aria-label="Close"
      />
      <div className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-w-md sm:rounded-2xl dark:bg-ink-800 dark:ring-1 dark:ring-ink-700">
        <div className="shrink-0 bg-gradient-to-r from-ink-900 via-ink-800 to-brand-700 px-5 py-4 text-white sm:px-6 sm:py-5">
          <h2 className="font-heading text-xl font-bold">{titles[authView]}</h2>
          <p className="mt-1 text-sm text-white/80">{subtitles[authView]}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto p-5 pb-safe dark:text-neutral-100 sm:p-6">
          {authView === "register" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Field label={t("auth.firstName")} value={firstName} onChange={setFirstName} required />
                <Field label={t("auth.lastName")} value={lastName} onChange={setLastName} required />
              </div>
              <Field label={t("auth.email")} type="email" value={email} onChange={setEmail} required />
              <Field label={t("auth.phone")} type="tel" value={phone} onChange={setPhone} required />
              <Field label={t("auth.password")} type="password" value={password} onChange={setPassword} required />
              <Field
                label={t("auth.confirmPassword")}
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                required
              />
              <fieldset>
                <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                  {t("auth.verifyMethod")}
                </legend>
                <div className="flex gap-2">
                  <MethodBtn
                    active={verifyMethod === "email"}
                    onClick={() => setVerifyMethod("email")}
                    label={t("auth.verifyEmail")}
                  />
                  <MethodBtn
                    active={verifyMethod === "sms"}
                    onClick={() => setVerifyMethod("sms")}
                    label={t("auth.verifySms")}
                  />
                </div>
              </fieldset>
              <p className="text-xs text-stone-500">{t("auth.checkoutNote")}</p>
            </>
          )}

          {authView === "login" && (
            <>
              <Field label={t("auth.email")} type="email" value={email} onChange={setEmail} required />
              <Field label={t("auth.password")} type="password" value={password} onChange={setPassword} required />
              <button
                type="button"
                className="text-sm font-medium text-brand-600 hover:text-brand-700"
                onClick={() => setAuthView("forgot")}
              >
                {t("auth.forgotPassword")}
              </button>
            </>
          )}

          {authView === "forgot" && (
            <Field label={t("auth.email")} type="email" value={email} onChange={setEmail} required />
          )}

          {authView === "verify" && (
            <>
              <Field
                label={t("auth.verificationCode")}
                value={code}
                onChange={setCode}
                required
                maxLength={6}
                placeholder="000000"
              />
              {pendingCode && (
                <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  {t("auth.demoCodeHint")}: <strong className="font-mono">{pendingCode}</strong>
                </p>
              )}
              <button
                type="button"
                className="text-sm font-medium text-brand-600 hover:text-brand-700"
                onClick={resendCode}
              >
                {t("auth.resendCode")}
              </button>
            </>
          )}

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          {success && <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-ocean-950 py-3 text-sm font-bold text-white transition hover:bg-brand-600 disabled:opacity-60"
          >
            {authView === "login" && t("auth.signIn")}
            {authView === "register" && t("auth.signUp")}
            {authView === "forgot" && t("auth.resetPassword")}
            {authView === "verify" && t("auth.verifyTitle")}
          </button>

          {authView === "login" && (
            <p className="text-center text-sm text-stone-600">
              {t("auth.noAccount")}{" "}
              <button
                type="button"
                className="font-semibold text-brand-600 hover:text-brand-700"
                onClick={() => setAuthView("register")}
              >
                {t("auth.signUp")}
              </button>
            </p>
          )}

          {authView === "register" && (
            <p className="text-center text-sm text-stone-600">
              {t("auth.hasAccount")}{" "}
              <button
                type="button"
                className="font-semibold text-brand-600 hover:text-brand-700"
                onClick={() => setAuthView("login")}
              >
                {t("auth.signIn")}
              </button>
            </p>
          )}

          {(authView === "forgot" || authView === "verify") && (
            <button
              type="button"
              className="w-full text-sm font-medium text-stone-500 hover:text-ocean-950"
              onClick={() => setAuthView("login")}
            >
              {t("auth.backToLogin")}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  maxLength,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  );
}

function MethodBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
        active
          ? "border-brand-500 bg-brand-50 text-brand-700"
          : "border-stone-200 text-stone-600 hover:border-stone-300"
      }`}
    >
      {label}
    </button>
  );
}
