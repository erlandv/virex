'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export interface SupportHero3DProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  appUrl?: string;
}

export const SupportHero3D: React.FC<SupportHero3DProps> = ({
  title = 'Turn Every Customer Chat into an Instant M-Pesa Sale',
  subtitle = 'Unify WhatsApp Business Cloud, Africa’s Talking Bulk SMS, Instagram DMs, and Facebook Messenger into one shared inbox. Trigger in-chat /stk PIN prompts and auto-verify Safaricom payments in seconds.',
  badge = 'Kenya’s #1 Omnichannel & In-Chat M-Pesa Engine',
  primaryCTA = {
    label: 'Start Free — 50 Trial SMS Included',
    href: 'http://localhost:3000/app/auth/signup',
  },
  secondaryCTA = {
    label: 'Book Live Demo',
    href: '/demo',
  },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Interactive 3D cursor tilt logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-18, 18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32 bg-slate-50 dark:bg-[#0B1120] transition-colors duration-300">
      {/* Ambient Lighting Gradients */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-blue-500/15 via-indigo-500/10 to-transparent blur-3xl rounded-full dark:from-blue-600/20 dark:via-purple-600/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-20 w-[450px] h-[450px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-3xl rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 left-10 w-[350px] h-[350px] bg-amber-500/10 dark:bg-amber-500/10 blur-3xl rounded-full"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* =============================================================== */}
          {/* LEFT COLUMN: High-Converting Marketing Copy & CTAs             */}
          {/* =============================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left z-10">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50/90 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold tracking-wide w-fit mb-6 shadow-xs backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              {title.includes('Instant M-Pesa Sale') ? (
                <>
                  {title.replace('Instant M-Pesa Sale', '')}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 dark:from-blue-400 dark:via-indigo-300 dark:to-emerald-400">
                    Instant M-Pesa Sale
                  </span>
                </>
              ) : (
                title
              )}
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {subtitle}
            </p>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={primaryCTA.href}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-200 group"
              >
                <span>{primaryCTA.label}</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>

              {secondaryCTA && (
                <a
                  href={secondaryCTA.href}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 font-semibold text-base hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs backdrop-blur-xs"
                >
                  <svg
                    className="w-4 h-4 text-slate-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{secondaryCTA.label}</span>
                </a>
              )}
            </div>

            {/* Social Proof / Trust Bullets */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  &lt; 10s
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  STK Prompt Delivery
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">100%</p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Webhook Verified
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  6 Inboxes
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Single Shared Hub
                </p>
              </div>
            </div>
          </div>

          {/* =============================================================== */}
          {/* RIGHT COLUMN: 3D Floating Isometric Ecosystem Composition      */}
          {/* Directly inspired by user reference: claymorphic 3D blocks      */}
          {/* =============================================================== */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[540px] xl:min-h-[600px] select-none"
            style={{ perspective: 1200 }}
          >
            {/* Atmospheric Circular Glow Backing */}
            <div className="absolute w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full bg-gradient-to-tr from-blue-600/20 via-indigo-500/20 to-emerald-400/20 blur-2xl animate-pulse" />

            {/* 3D Motion Stage */}
            <motion.div
              style={{
                rotateX: isClient ? rotateX : 8,
                rotateY: isClient ? rotateY : -12,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-[480px] h-[480px] sm:h-[540px] flex items-center justify-center transition-transform duration-100 ease-out"
            >
              {/* Conduits & Flow Ring (SVG in 3D Space) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-30"
                viewBox="0 0 500 500"
                fill="none"
                style={{ transform: 'translateZ(10px)' }}
              >
                <circle
                  cx="250"
                  cy="250"
                  r="160"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6 8"
                  className="text-blue-400 dark:text-blue-500"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="215"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  className="text-slate-300 dark:text-slate-700"
                />
              </svg>

              {/* ------------------------------------------------------------- */}
              {/* 1. CENTRAL MARKCHAT HUB CUBE (Anchor 3D Node)                */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                animate={{
                  y: [-8, 8, -8],
                  rotateZ: [-1, 1, -1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ transform: 'translateZ(80px)' }}
                className="relative z-30 group cursor-pointer"
              >
                {/* 3D Glossy Cube with Volumetric Bevel */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 p-1 shadow-[0_25px_50px_-12px_rgba(37,99,235,0.5),_inset_0_2px_4px_rgba(255,255,255,0.6),_inset_0_-4px_8px_rgba(0,0,0,0.4)] border-t border-l border-white/60">
                  {/* Top Specular Sheen */}
                  <div className="absolute inset-x-2 top-1 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

                  {/* Inner Content */}
                  <div className="w-full h-full rounded-2xl flex flex-col items-center justify-center text-white relative">
                    {/* MarkChat Logo Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-1 border border-white/30">
                      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.1 21.9a1 1 0 001.2 1.2l4.9-1.238A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold tracking-wider uppercase text-blue-100">
                      MarkChat
                    </span>
                    <span className="text-[10px] text-blue-200/80 font-medium">Unified Core</span>
                  </div>
                </div>

                {/* Floating Micro-Badge */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-900/90 text-white text-[10px] font-semibold border border-white/20 whitespace-nowrap shadow-md backdrop-blur-md flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Hub Active</span>
                </motion.div>
              </motion.div>

              {/* ------------------------------------------------------------- */}
              {/* 2. WHATSAPP CLOUD 3D TILE (Top-Left - matching Image 1)       */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                animate={{
                  y: [-12, 10, -12],
                  rotateZ: [-5, -1, -5],
                }}
                transition={{
                  duration: 4.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ transform: 'translateZ(95px)' }}
                className="absolute top-4 sm:top-8 left-4 sm:left-8 z-20 group"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-green-700 p-0.5 shadow-[0_20px_35px_-8px_rgba(16,185,129,0.45),_inset_0_2px_4px_rgba(255,255,255,0.7),_inset_0_-4px_6px_rgba(0,0,0,0.35)] border-t border-l border-white/70 flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 group-hover:scale-105">
                  <div className="absolute inset-x-1.5 top-1 h-1/2 rounded-t-xl bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
                  {/* WhatsApp SVG Icon */}
                  <svg
                    className="w-10 h-10 text-white drop-shadow-sm"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="text-[10px] font-bold text-white mt-1">WhatsApp</span>
                </div>
                {/* Floating Tag */}
                <div className="absolute -top-2 -right-3 px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-200 text-[9px] font-semibold border border-emerald-400/40 whitespace-nowrap shadow-sm backdrop-blur-xs">
                  Cloud API
                </div>
              </motion.div>

              {/* ------------------------------------------------------------- */}
              {/* 3. M-PESA DARAJA STK CUBE (Top-Right - Kenyan Hero Element)   */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                animate={{
                  y: [8, -12, 8],
                  rotateZ: [3, 7, 3],
                }}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ transform: 'translateZ(105px)' }}
                className="absolute top-2 sm:top-6 right-4 sm:right-8 z-20 group"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-800 p-0.5 shadow-[0_20px_35px_-8px_rgba(5,150,105,0.45),_inset_0_2px_4px_rgba(255,255,255,0.7),_inset_0_-4px_6px_rgba(0,0,0,0.35)] border-t border-l border-white/70 flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 group-hover:scale-105">
                  <div className="absolute inset-x-1.5 top-1 h-1/2 rounded-t-xl bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
                  {/* Smartphone STK Icon */}
                  <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center mb-0.5">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-[11px] font-black tracking-tight text-white">M-PESA</span>
                  <span className="text-[8px] font-semibold text-emerald-200">Daraja STK</span>
                </div>
                {/* Floating STK Tag */}
                <div className="absolute -bottom-2 -left-3 px-2 py-0.5 rounded-md bg-slate-900/90 text-emerald-300 text-[9px] font-bold border border-emerald-500/40 whitespace-nowrap shadow-sm backdrop-blur-xs flex items-center gap-1">
                  <span>/stk Push</span>
                  <span className="text-white">KES</span>
                </div>
              </motion.div>

              {/* ------------------------------------------------------------- */}
              {/* 4. INSTAGRAM DM CUBE (Right-Center - matching Image 2)        */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                animate={{
                  y: [-10, 8, -10],
                  rotateZ: [-4, 2, -4],
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ transform: 'translateZ(90px)' }}
                className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 group"
              >
                <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-0.5 shadow-[0_20px_35px_-8px_rgba(220,39,67,0.45),_inset_0_2px_4px_rgba(255,255,255,0.7),_inset_0_-4px_6px_rgba(0,0,0,0.35)] border-t border-l border-white/70 flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 group-hover:scale-105">
                  <div className="absolute inset-x-1 top-1 h-1/2 rounded-t-xl bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
                  {/* Instagram Camera SVG */}
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span className="text-[9px] font-bold text-white mt-1">Instagram</span>
                </div>
              </motion.div>

              {/* ------------------------------------------------------------- */}
              {/* 5. AFRICA’S TALKING BULK SMS (Bottom-Left)                    */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                animate={{
                  y: [10, -10, 10],
                  rotateZ: [-6, 0, -6],
                }}
                transition={{
                  duration: 4.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ transform: 'translateZ(100px)' }}
                className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 z-20 group"
              >
                <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 p-0.5 shadow-[0_20px_35px_-8px_rgba(245,158,11,0.45),_inset_0_2px_4px_rgba(255,255,255,0.7),_inset_0_-4px_6px_rgba(0,0,0,0.35)] border-t border-l border-white/70 flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 group-hover:scale-105">
                  <div className="absolute inset-x-1 top-1 h-1/2 rounded-t-xl bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <span className="text-[10px] font-bold text-white mt-0.5">Bulk SMS</span>
                  <span className="text-[8px] font-semibold text-amber-100">BYOC Telco</span>
                </div>
              </motion.div>

              {/* ------------------------------------------------------------- */}
              {/* 6. SHOPIFY E-COMMERCE (Bottom-Right)                          */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                animate={{
                  y: [-8, 12, -8],
                  rotateZ: [2, 6, 2],
                }}
                transition={{
                  duration: 5.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ transform: 'translateZ(90px)' }}
                className="absolute bottom-4 sm:bottom-8 right-6 sm:right-12 z-20 group"
              >
                <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 p-0.5 shadow-[0_20px_35px_-8px_rgba(13,148,136,0.45),_inset_0_2px_4px_rgba(255,255,255,0.7),_inset_0_-4px_6px_rgba(0,0,0,0.35)] border-t border-l border-white/70 flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 group-hover:scale-105">
                  <div className="absolute inset-x-1 top-1 h-1/2 rounded-t-xl bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
                  <svg className="w-7 h-7 text-[#95BF47]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.344 6.746l-.508-.242a2.31 2.31 0 00-1.875-.027c-.015.008-.184.094-.184.094s-.91-1.391-2.129-1.926c-2.09-.918-4.148.293-4.598.602-.137.094-.23.238-.281.402l-.574 2.05-1.559.48a1.234 1.234 0 00-.773.747L4.62 15.65c-.059.207-.016.434.117.6.133.168.336.266.55.266h.047l10.875-1.074a1.22 1.22 0 001.074-1.074l1.836-7.07a.64.64 0 00.227-.551zm-7.668-1.09c.875-.383 1.93-.102 2.656.457l-3.32 1.023.664-1.48zm-1.898 3.512l1.625-.5 1.547 4.543-3.172.313zm5.668-1.742l1.32.41-1.055 4.055-1.398.137zm-2.078 7.39l-2.078.204-1.875-5.508 4.281-1.32z" />
                  </svg>
                  <span className="text-[10px] font-bold text-white mt-1">Shopify</span>
                </div>
              </motion.div>

              {/* ------------------------------------------------------------- */}
              {/* 7. 3D FLOATING ACCENTS & CLAY TOKENS (Directly from Image 1)  */}
              {/* ------------------------------------------------------------- */}

              {/* A. 3D Red Notification Bell Disc */}
              <motion.div
                animate={{
                  y: [-6, 6, -6],
                  rotateZ: [-10, 5, -10],
                }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transform: 'translateZ(120px)' }}
                className="absolute top-1/4 -left-2 sm:-left-4 z-30 pointer-events-none"
              >
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-rose-600 via-red-500 to-rose-400 p-0.5 shadow-[0_12px_24px_-4px_rgba(239,68,68,0.5),_inset_0_2px_4px_rgba(255,255,255,0.8),_inset_0_-2px_4px_rgba(0,0,0,0.3)] border-t border-white/80 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
              </motion.div>

              {/* B. 3D Gold Star Badge */}
              <motion.div
                animate={{
                  y: [5, -8, 5],
                  rotateZ: [0, 15, 0],
                }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transform: 'translateZ(110px)' }}
                className="absolute bottom-28 -right-3 sm:-right-4 z-30 pointer-events-none"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 p-0.5 shadow-[0_12px_24px_-4px_rgba(245,158,11,0.5),_inset_0_2px_3px_rgba(255,255,255,0.8)] border-t border-white/80 flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
              </motion.div>

              {/* C. 3D Heart Bubble */}
              <motion.div
                animate={{
                  y: [-7, 7, -7],
                  rotateZ: [8, -4, 8],
                }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transform: 'translateZ(115px)' }}
                className="absolute -top-3 left-1/3 z-30 pointer-events-none"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-pink-400 p-0.5 shadow-[0_10px_20px_-3px_rgba(244,63,94,0.5),_inset_0_2px_3px_rgba(255,255,255,0.8)] border-t border-white/80 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </motion.div>

              {/* D. 3D Cheerful Emoji (Clay Sphere) */}
              <motion.div
                animate={{
                  y: [8, -6, 8],
                  rotateZ: [-6, 6, -6],
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transform: 'translateZ(125px)' }}
                className="absolute top-1/2 left-12 z-30 pointer-events-none"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 shadow-[0_8px_16px_rgba(245,158,11,0.4),_inset_0_2px_3px_rgba(255,255,255,0.8)] border-t border-white/80 flex items-center justify-center text-sm">
                  😊
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportHero3D;
