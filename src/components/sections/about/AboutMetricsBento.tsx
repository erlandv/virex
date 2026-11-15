'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  description: string;
  tag: string;
  accent: 'blue' | 'emerald' | 'amber' | 'purple';
}

interface AboutMetricsBentoProps {
  metrics: MetricItem[];
}

const accentStyles = {
  blue: {
    badge:
      'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/70',
    stat: 'text-blue-600 dark:text-blue-400',
    indicator: 'bg-blue-500',
  },
  emerald: {
    badge:
      'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/70',
    stat: 'text-emerald-600 dark:text-emerald-400',
    indicator: 'bg-emerald-500',
  },
  amber: {
    badge:
      'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/70',
    stat: 'text-amber-600 dark:text-amber-400',
    indicator: 'bg-amber-500',
  },
  purple: {
    badge:
      'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/70',
    stat: 'text-purple-600 dark:text-purple-400',
    indicator: 'bg-purple-500',
  },
};

export const AboutMetricsBento: React.FC<AboutMetricsBentoProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, idx) => {
        const theme = accentStyles[metric.accent] || accentStyles.blue;

        return (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.1, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-lg dark:hover:shadow-black/50 transition-all duration-300 flex flex-col justify-between group h-full"
          >
            <div>
              {/* Top Tag & Pulsing Status */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${theme.badge}`}
                >
                  {metric.tag}
                </span>
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.indicator}`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${theme.indicator}`}
                  />
                </span>
              </div>

              {/* Stat Value */}
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {metric.value}
              </div>

              {/* Title / Label */}
              <div className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1">
                {metric.label}
              </div>

              {/* Context Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                {metric.description}
              </p>
            </div>

            {/* Bottom Accent Line */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <span>MarkChat Verified</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AboutMetricsBento;
