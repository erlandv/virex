'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  initials: string;
  gradient: string;
  expertise: string[];
}

interface AboutTeamGridProps {
  members: TeamMemberItem[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
};

export const AboutTeamGrid: React.FC<AboutTeamGridProps> = ({ members }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {members.map((member) => (
        <motion.div
          key={member.id}
          variants={cardVariants}
          whileHover={{ y: -6 }}
          className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 flex flex-col justify-between group"
        >
          <div>
            {/* Sleek Premium Avatar Placeholder (Exact Spec) */}
            <div className="w-full aspect-square rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-4xl mb-4 overflow-hidden relative border border-slate-200/80 dark:border-slate-700/60 shadow-inner group-hover:scale-102 transition-transform duration-300">
              {/* Radial Backdrop Glow */}
              <div
                className="absolute inset-0 bg-radial from-blue-500/10 dark:from-blue-600/20 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Glossy Beveled Monogram Badge */}
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br ${member.gradient} shadow-lg shadow-black/20 flex flex-col items-center justify-center text-white font-extrabold tracking-wider border border-white/25 relative overflow-hidden select-none`}
              >
                {/* Specular Highlight Sheen */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent rounded-t-[inherit] pointer-events-none" />

                <span className="relative z-10 text-2xl sm:text-3xl drop-shadow-sm font-sans">
                  {member.initials}
                </span>

                <span className="relative z-10 text-[9px] font-mono tracking-widest uppercase opacity-80 mt-0.5">
                  MARKCHAT
                </span>
              </div>
            </div>

            {/* Location Meta */}
            <div className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>{member.location}</span>
            </div>

            {/* Name (Bold) — Rendered Clearly ONCE */}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
              {member.name}
            </h3>

            {/* Role (Blue text) — Rendered Clearly ONCE */}
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
              {member.role}
            </p>

            {/* Bio Description */}
            <p className="mt-3 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Core Areas of Focus Tags */}
          <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5">
            {member.expertise.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium border border-slate-200/60 dark:border-slate-700/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AboutTeamGrid;
