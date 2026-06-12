"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import i18nStrings from "@/lib/i18n-strings.json";

interface WhatsAppMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function WhatsAppButton() {
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([
    {
      id: "1",
      text: (i18nStrings.whatsapp as Record<string, string>)[locale] || i18nStrings.whatsapp.en,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  async function sendMessage() {
    if (!inputValue.trim()) return;

    const userMsg: WhatsAppMessage = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputValue,
          language: locale,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg: WhatsAppMessage = {
          id: `bot-${Date.now()}`,
          text: data.response || "Message received! We'll respond via WhatsApp shortly.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMsg: WhatsAppMessage = {
        id: `error-${Date.now()}`,
        text: (i18nStrings.whatsapp_error as Record<string, string>)[locale] || "Sorry, an error occurred.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }

  const placeholderText = (i18nStrings.whatsapp_placeholder as Record<string, string>)[locale] || "Type a message...";
  const sendButtonText = (i18nStrings.whatsapp_send as Record<string, string>)[locale] || "Send";
  const onlineText = (i18nStrings.whatsapp_online as Record<string, string>)[locale] || "Online";

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col z-40 dark:bg-ink-900">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-400 to-brand-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">🤖</span>
                </div>
                <div>
                  <h3 className="font-bold">Thailand Moto Rent</h3>
                  <p className="text-xs text-white/80">AI Support - Instant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1 rounded text-lg"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50 dark:bg-ink-800">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-brand-500 text-white rounded-br-none"
                      : "bg-white text-neutral-900 rounded-bl-none dark:bg-ink-700 dark:text-white border border-neutral-200 dark:border-ink-600"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-neutral-200 dark:bg-ink-700 dark:border-ink-600 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-neutral-200 p-3 dark:border-ink-700">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={placeholderText}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                disabled={isLoading}
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-ink-800 dark:border-ink-600 dark:text-white"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="px-3 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
              >
                {sendButtonText}
              </button>
            </div>
            <p className="text-xs text-neutral-500 mt-2 dark:text-neutral-100 text-center">
              🤖 AI Powered Support
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-gradient-to-br from-brand-400 to-brand-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group relative"
            title="AI Chat"
          >
            <svg
              className="w-7 h-7 group-hover:scale-110 transition-transform"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.969 1.523A9.9 9.9 0 003.64 12.124a9.864 9.864 0 001.525 4.97 9.87 9.87 0 004.97 1.523h.004a9.858 9.858 0 009.855-9.855 9.838 9.838 0 00-1.525-4.969A9.836 9.836 0 0012.05 6.98m0-2a11.884 11.884 0 0111.88 11.88c0 6.547-5.334 11.88-11.88 11.88a11.880 11.880 0 01-11.88-11.88c0-6.547 5.333-11.88 11.88-11.88z" />
            </svg>
            <span className="absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75 animate-ping" />
          </button>
        )}

        {/* Status Indicator */}
        {!isOpen && (
          <div className="text-xs bg-brand-500 text-white px-2 py-1 rounded-full font-semibold whitespace-nowrap">
            {onlineText}
          </div>
        )}
      </div>

      {/* Direct WhatsApp Link (Fallback) */}
      <Link
        href="https://wa.me/66991234567"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden"
        title="Open WhatsApp"
      />
    </>
  );
}
