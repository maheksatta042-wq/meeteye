import React, { useState } from 'react';
import {
  BarChart3,
  LayoutDashboard,
  Play,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  Users,
  Monitor,
  UserCheck,
} from 'lucide-react';
import { motion } from 'motion/react';


import logoImage from "./assets/workeye.jpg";

import workeye_dashboard  from "./assets/workeye_dashboard.png";
import members from "./assets/members.png";
import view_details from "./assets/view_details.png";
import view_analytics from "./assets/view_analytics.png";
import application_usage from "./assets/application_usage.png";


import { TutorialVideo } from './TutorialVideo';
import { Footer} from './Footer';

export const tutorialSections = [
  {
    sectionId: 1,
    sectionTitle: '📊 1: Dashboard Overview',
    sectionDescription:
      'Monitor team productivity, activity status, and performance metrics from a centralized real-time dashboard.',
    steps: [
      {
        number: 1,
        title: 'Admin Dashboard',
        description:
          'Displays comprehensive overview including total employees, active members, average screen time, productivity metrics, peak hours, and automated screenshot counts with advanced filtering options.',
        icon: LayoutDashboard,
        iconColor: 'rgb(99, 102, 241)',
        image: workeye_dashboard, 
      },
    ],
  },

  {
    sectionId: 2,
    sectionTitle: '👤 2: Individual Employee Analytics',
    sectionDescription:
      'Deep dive into individual employee performance with detailed analytics, activity logs, and productivity insights.',
    steps: [
      {
        number: 2,
        title: 'Employee Overview Dashboard',
        description:
          'After clicking on View Details, view individual employee profile with current status, screen time breakdown (7h 30m), active time percentage (91%), idle time (42m), and productivity rating with real-time analytics.',
        icon: UserCheck,
        iconColor: 'rgb(34, 197, 94)',
        image: view_details, 
        
      },
      {
        number: 3,
        title: 'Analytics Dashboard',
        description:
          'On clicking View Analytics, comprehensive activity analysis showing current screen time, active time percentage, productivity metrics, quick analytics summary, and navigation guide for reports including application usage breakdown and historical trends is displayed',
        icon: BarChart3,
        iconColor: 'rgb(79, 70, 229)',
        image: view_analytics, 
        
      },
      {
        number: 4,
        title: 'Application Usage Analysis',
        description:
          'Track time spent on different applications with detailed breakdown for last 30 days showing total time (0.0h), apps used (0), most used applications, and top app time metrics.',
        icon: Monitor,
        iconColor: 'rgb(249, 115, 22)',
        image: application_usage, 
      },
    ],
  },

  {
    sectionId: 3,
    sectionTitle: '🧑‍💼 3: Team & Member Management',
    sectionDescription:
      'Set up and manage your team members, control access, and configure employee accounts for monitoring.',
    steps: [
      {
        number: 5,
        title: 'Members Management',
        description:
          'Add, manage, and organize team members. View total members (0), active (0), and inactive (0) status. Add your first member to get started with employee tracking and monitoring.',
        icon: Users,
        iconColor: 'rgb(59, 130, 246)',
        image: members, 
      },
    ],
  },
]
export default function TutorialPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: 'white', position: 'relative' }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, white, rgb(236, 254, 255), white)', opacity: 0.8 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Hero Section with Left-Right Layout */}
        <section style={{ padding: '3rem 1rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1.2fr 1fr', 
              gap: '6rem', 
              alignItems: 'center' 
            }}>
              {/* LEFT: Text Content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <img src={logoImage} alt="WorkEye Logo" style={{ width: '7.5rem', height: '7.5rem', objectFit: 'contain' }} />
                </div>
                
                <h1 style={{ fontSize: '3.25rem', fontWeight: 800,marginBottom: '1.5rem',lineHeight: '1.1',letterSpacing: '-0.02em' }}>
                  <span style={{ color: 'rgb(6, 182, 212)',fontWeight: 900 }}>Explore Work Eye</span>{' '}
                  <span style={{ color: 'rgb(30, 41, 59)' }}>with Detailed Step-by-Step Tutorials</span>
                </h1>
                
                <p style={{ fontSize: '1.25rem',color: 'rgb(75, 85, 99)',marginBottom: '2rem',lineHeight: '1.7',maxWidth: '42rem' }}>
                  Learn how to streamline operations, boost productivity, and scale faster with comprehensive tutorials covering setup, configuration, and advanced features.
                </p>

                {/* Feature List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    'Quick start guides for instant setup',
                    'Advanced feature walkthroughs',
                    'How it works steps for smooth onboarding',
                  ].map((feature) => (
                    <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <CheckCircle style={{ width: '1.5rem', height: '1.5rem', color: 'rgb(6, 182, 212)', flexShrink: 0 }} />
                      <span style={{ fontSize: '1.1rem', color: 'rgb(55, 65, 81)' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Video Card */}
<motion.div
  style={{
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }}
  animate={{ y: [0, -14, 0] }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
>
  <div
    style={{
      background: 'white',
      borderRadius: '1.75rem',
      boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.25)',
      overflow: 'hidden',
      border: '1px solid rgb(243, 244, 246)',
      width: '100%',
      maxWidth: '640px', // 🔥 INCREASED SIZE
    }}
  >
    {/* VIDEO PREVIEW */}
    <div
      style={{
        position: 'relative',
        height: '300px', // 🔥 TALLER VIDEO AREA
        background:
          'linear-gradient(to bottom right, rgb(219, 234, 254), rgb(207, 250, 254))',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              width: '5.5rem',
              height: '5.5rem',
              background: 'rgb(6, 182, 212)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              border: 'none',
              cursor: 'pointer',
              margin: '0 auto 1.75rem',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = 'rgb(8, 145, 178)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'rgb(6, 182, 212)')
            }
          >
            <Play
              style={{
                width: '2.75rem',
                height: '2.75rem',
                color: 'white',
                marginLeft: '0.25rem',
              }}
              fill="white"
            />
          </button>

          <p
            style={{
              marginTop: '1.25rem',
              color: 'rgb(55, 65, 81)',
              fontWeight: 600,
              fontSize: '1.15rem',
            }}
          >
            Getting Started with Work Eye
          </p>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgb(107, 114, 128)',
              marginTop: '0.25rem',
            }}
          >
            Duration: 5:32
          </p>
        </div>
      </div>
    </div>

    {/* VIDEO INFO */}
    <div style={{ padding: '2.25rem' }}>
      <h3
        style={{
          fontSize: '1.5rem',
          color: 'rgb(30, 41, 59)',
          marginBottom: '0.75rem',
          fontWeight: 700,
        }}
      >
        Welcome to Work Eye Tutorial
      </h3>

      <p
        style={{
          color: 'rgb(75, 85, 99)',
          marginBottom: '1.75rem',
          lineHeight: '1.65',
        }}
      >
        Learn how to set up your account, configure tracking parameters, and
        start monitoring your assets in just a few minutes.
      </p>

      <button
        style={{
          width: '100%',
          padding: '0.85rem 1rem',
          background: 'rgb(30, 41, 59)',
          color: 'white',
          borderRadius: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          boxShadow: '0 12px 18px -6px rgba(0, 0, 0, 0.15)',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 600,
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgb(15, 23, 42)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgb(30, 41, 59)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Watch Full Tutorial Series
        <ExternalLink style={{ width: '1.25rem', height: '1.25rem' }} />
      </button>
    </div>
  </div>
</motion.div>
 </div>
          </div>
        </section>
        {/* Tutorial Section Header */}
<section
  style={{
    padding: '3rem 1rem 2.5rem',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0), #f8fafc)',
  }}
>
  <div
    style={{
      maxWidth: '1100px',
      margin: '0 auto',
      textAlign: 'center',
    }}
  >
    <h2
      style={{
        fontSize: '2.4rem',
        fontWeight: 800,
        color: '#0f172a',
        marginBottom: '0.75rem',
      }}
    >
      Complete Step-by-Step Tutorial
    </h2>

    <p
      style={{
        fontSize: '1rem',
        color: '#475569',
        maxWidth: '720px',
        margin: '0 auto',
        lineHeight: 1.6,
      }}
    >
      Master Work Eye with our comprehensive guide covering every feature
      from sign-up to advanced functionality
    </p>
  </div>
</section>
<section style={{ padding: '3rem 1rem' }}>
  <div style={{ maxWidth: '90rem', margin: '0 auto' }}>
    {tutorialSections.map((section) => (
      <div key={section.sectionId} style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#1e293b' }}>
          {section.sectionTitle}
        </h3>
        <p style={{ color: '#475569', marginBottom: '2.5rem' }}>
          {section.sectionDescription}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(640px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {section.steps.map((step) => {
            const Icon = step.icon;
            const isHovered = hoveredCard === step.number;

            return (
              <div
                key={step.number}
                onMouseEnter={() => setHoveredCard(step.number)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: 'relative',
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  background: 'white',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.12)',
                  transition: 'transform 0.3s',
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                }}
              >
                {/* ✅ IMAGE FIX — FULLY READABLE */}
                <img
  src={step.image}
  alt={step.title}
  style={{
    width: '100%',
    height: '100%',
    minHeight: '520px',        
    maxHeight: '720px',        
    objectFit: 'contain',      
    background: '#ffffff',    
    padding: '2rem',           
    display: 'block',
    imageRendering: 'auto',    
    transition: 'filter 0.25s ease',
  }}
/>


                {/* ✅ HOVER OVERLAY (UNCHANGED STYLE) */}
                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.85)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      padding: '2.5rem',
                    }}
                  >
                    <div
                      style={{
                        width: '3.5rem',
                        height: '3.5rem',
                        background: step.iconColor,
                        borderRadius: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                      }}
                    >
                      <Icon color="white" size={28} />
                    </div>

                    <h4
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'white',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {step.title}
                    </h4>

                    <p
                      style={{
                        fontSize: '1rem',
                        color: 'rgba(255,255,255,0.92)',
                        lineHeight: '1.6',
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
</section>
           
{/* CTA SECTION */}
<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.25rem',
    marginBottom: '2.5rem',
  }}
>
  <button
    onClick={() =>
      (window.location.href =
        'https://frontend-8x7e.onrender.com/')
    }
    style={{
      padding: '1.25rem 3.5rem',   
      background: 'rgb(30, 41, 59)',
      color: 'white',
      borderRadius: '1rem',        
      border: 'none',
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: 1.3,             
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
      transition: 'all 0.3s',
      whiteSpace: 'nowrap',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgb(15, 23, 42)';
      e.currentTarget.style.transform = 'scale(1.04)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgb(30, 41, 59)';
      e.currentTarget.style.transform = 'scale(1)';
    }}
  >
    Go to Dashboard
    <ArrowRight style={{ width: '1.6rem', height: '1.6rem' }} />
  </button>
</div>
<Footer/>
</div>


      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}